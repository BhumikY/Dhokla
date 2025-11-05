import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Player, LobbyGameState } from '../types';
import Icon from '../components/Icon';
import CountdownTimer from '../components/CountdownTimer';
import PlayerList from '../components/PlayerList';

const PLAYER_COLORS = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFA1', '#FFC300', '#C70039', '#900C3F', '#581845'];

const TaskLobbyView: React.FC = () => {
    const { selectedJob, goBack, currentUser } = useContext(AppContext);
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerName, setPlayerName] = useState(currentUser?.name || '');
    const [expiryTimestamp, setExpiryTimestamp] = useState<number>(0);
    const [gameState, setGameState] = useState<LobbyGameState>('waiting');
    
    const lobbyStorageKey = `skillsetu_lobby_${selectedJob?.id}`;

    const hasJoined = players.some(p => p.name === currentUser?.name);

    const checkGameState = useCallback((currentPlayers: Player[]) => {
        if (Date.now() > expiryTimestamp) {
            if (currentPlayers.length < 2) {
                setGameState('aborted');
            } else {
                setGameState('started');
            }
            return true; // Game has ended
        }
        return false; // Game is ongoing
    }, [expiryTimestamp]);

    useEffect(() => {
        if (!selectedJob) return;

        // Load state from localStorage
        const savedState = localStorage.getItem(lobbyStorageKey);
        if (savedState) {
            const { players: savedPlayers, expiry, gameState: savedGameState } = JSON.parse(savedState);
            setPlayers(savedPlayers);
            setExpiryTimestamp(expiry);
            setGameState(savedGameState);
            checkGameState(savedPlayers);
        } else {
            // Initialize for the first time
            const twoDays = 2 * 24 * 60 * 60 * 1000;
            const newExpiry = Date.now() + twoDays;
            setExpiryTimestamp(newExpiry);
            const initialState = { players: [], expiry: newExpiry, gameState: 'waiting' };
            localStorage.setItem(lobbyStorageKey, JSON.stringify(initialState));
        }
    }, [selectedJob, lobbyStorageKey, checkGameState]);
    
     useEffect(() => {
        // Persist state whenever it changes
        if(selectedJob) {
            const stateToSave = { players, expiry: expiryTimestamp, gameState };
            localStorage.setItem(lobbyStorageKey, JSON.stringify(stateToSave));
        }
    }, [players, expiryTimestamp, gameState, lobbyStorageKey, selectedJob]);


    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim() && !players.some(p => p.name === playerName.trim())) {
            const newPlayer: Player = {
                name: playerName.trim(),
                avatarColor: PLAYER_COLORS[players.length % PLAYER_COLORS.length],
            };
            setPlayers([...players, newPlayer]);
        }
    };

    if (!selectedJob) {
        return <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">No task selected.</h2>
            <button onClick={() => goBack()} className="mt-4 text-indigo-600 hover:text-indigo-800">Go Back</button>
        </div>;
    }

    const renderGameState = () => {
        switch (gameState) {
            case 'started':
                return (
                     <div className="text-center p-12 bg-green-50 rounded-lg shadow-inner">
                        <Icon name="rocket-outline" className="text-6xl text-green-500 mx-auto" />
                        <h3 className="mt-4 text-3xl font-bold text-green-800">Task Collaboration Started!</h3>
                        <p className="mt-2 text-gray-600">You can now proceed with your team.</p>
                    </div>
                );
            case 'aborted':
                 return (
                     <div className="text-center p-12 bg-red-50 rounded-lg shadow-inner">
                        <Icon name="close-circle-outline" className="text-6xl text-red-500 mx-auto" />
                        <h3 className="mt-4 text-3xl font-bold text-red-800">Task Aborted</h3>
                        <p className="mt-2 text-gray-600">Not enough participants joined before the deadline.</p>
                    </div>
                 );
            case 'waiting':
                return (
                     <>
                        <CountdownTimer expiryTimestamp={expiryTimestamp} onComplete={() => checkGameState(players)} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            <div className="md:col-span-2">
                                <PlayerList players={players} />
                            </div>
                            <div>
                                 <form onSubmit={handleJoin} className="bg-gray-50 p-6 rounded-lg shadow-inner">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Join the Task</h3>
                                    <input
                                        type="text"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                        disabled={hasJoined}
                                    />
                                    <button
                                        type="submit"
                                        className="mt-4 w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                                        disabled={hasJoined || !playerName.trim()}
                                    >
                                        {hasJoined ? 'You Have Joined' : 'Join Task'}
                                    </button>
                                </form>
                            </div>
                        </div>
                     </>
                );
        }
    };


    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg animate-fadeIn">
            <button onClick={goBack} className="mb-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                <Icon name="arrow-back-outline" className="mr-1" />
                Back to Job Details
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{selectedJob.title}</h1>
            <p className="text-md text-gray-500">Lobby hosted by: {selectedJob.client}</p>
            <div className="mt-6">
                {renderGameState()}
            </div>
        </div>
    );
};

export default TaskLobbyView;
