import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Modal from './Modal';

const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { login } = useContext(AppContext);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            // The new context only has a mock login function
            await login(email, password);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal onClose={onClose} title={'Welcome Back'}>
            <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                   
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                        {isLoading ? 'Processing...' : 'Login'}
                    </button>
                </form>
                 <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        This is a demo. Use any email/password to log in.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;