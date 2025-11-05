import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Role } from '../types';
import Modal from './Modal';
import Icon from './Icon';

const LoginModal: React.FC = () => {
    const { login, register, setShowLoginModal } = useContext(AppContext);
    const [isRegistering, setIsRegistering] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>(Role.Learner);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            if (isRegistering) {
                if (!name || !email || !password) {
                    throw new Error("All fields are required for registration.");
                }
                await register({ name, email, password, role });
            } else {
                 if (!email || !password) {
                    throw new Error("Email and password are required.");
                }
                await login(email, password);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setError(null);
        setName('');
        setEmail('');
        setPassword('');
        setRole(Role.Learner);
    };

    return (
        <Modal title={isRegistering ? "Create Account" : "Welcome Back"} onClose={() => setShowLoginModal(false)}>
            <p className="text-gray-600 mt-2">
                {isRegistering ? "Join SkillSetu to start your journey." : "Login to access your dashboard."}
            </p>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {isRegistering && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete={isRegistering ? "new-password" : "current-password"} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                {isRegistering && (
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a...</label>
                        <select id="role" name="role" value={role} onChange={e => setRole(e.target.value as Role)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value={Role.Learner}>Learner (I want to learn skills)</option>
                            <option value={Role.Mentor}>Mentor (I want to teach)</option>
                            <option value={Role.Client}>Client (I want to hire talent)</option>
                        </select>
                    </div>
                )}
                {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
                <div>
                     <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                        {isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <button onClick={toggleMode} className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                        {isRegistering ? 'Log in' : 'Sign up'}
                    </button>
                </p>
                <p className="mt-4 text-xs text-gray-500">
                   For content generation, log in as <span className="font-mono">admin@skillsetu.io</span>
                </p>
            </div>
        </Modal>
    );
};

export default LoginModal;