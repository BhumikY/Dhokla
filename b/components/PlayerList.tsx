import React from 'react';
import { Player } from '../types';
import Icon from './Icon';

interface PlayerListProps {
    players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner h-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Participants ({players.length})</h3>
            {players.length > 0 ? (
                <ul className="space-y-3">
                    {players.map((player, index) => (
                        <li key={index} className="flex items-center bg-white p-3 rounded-md shadow-sm animate-fadeIn">
                            <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg mr-4"
                                style={{ backgroundColor: player.avatarColor }}
                            >
                                {player.name.substring(0, 1).toUpperCase()}
                            </div>
                            <span className="text-gray-700 font-medium">{player.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-gray-500 pt-8">
                    <Icon name="people-outline" className="text-5xl mx-auto" />
                    <p className="mt-2">Waiting for participants to join...</p>
                </div>
            )}
        </div>
    );
};

export default PlayerList;