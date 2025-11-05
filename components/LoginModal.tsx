import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Role } from '../types';
import Modal from './Modal';

const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { login, register } = useContext(AppContext);
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>(Role.Learner);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                if (!name) {
                    throw new Error("Name is required for registration.");
                }
                await register({ name, email, password, role });
            }
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleModeChange = (newMode: 'login' | 'register') => {
        setMode(newMode);
        setError(null);
        // Reset fields when switching modes
        setName('');
        setEmail('');
        setPassword('');
        setRole(Role.Learner);
    }

    return (
        <Modal onClose={onClose} title={mode === 'login' ? 'Welcome Back' : 'Create Your Account'}>
            <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    {mode === 'register' && (
                        <div>
                             <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a...</label>
                             <select id="role" value={role} onChange={e => setRole(e.target.value as Role)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value={Role.Learner}>Learner</option>
                                <option value={Role.Mentor}>Mentor</option>
                                <option value={Role.Client}>Client</option>
                             </select>
                        </div>
                    )}
                   
                    {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                        {isLoading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Create Account')}
                    </button>
                </form>
                 <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                       {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                       <button onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')} className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                           {mode === 'login' ? 'Sign up' : 'Login'}
                       </button>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Use `admin@skillsetu.io` to log in as an Admin.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;