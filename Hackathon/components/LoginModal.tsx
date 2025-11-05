
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Role } from '../types';
import Modal from './Modal';
import Icon from './Icon';

const LoginModal: React.FC = () => {
    const { login, setShowLoginModal } = useContext(AppContext);

    const handleLogin = (role: Role) => {
        login(role);
    };

    return (
        <Modal title="Simulate Login" onClose={() => setShowLoginModal(false)}>
            <p className="text-gray-600 mt-2">Choose a role to explore the dashboard.</p>
            <div className="mt-6 space-y-4">
                <button onClick={() => handleLogin(Role.Learner)} className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    <Icon name="school-outline" className="mr-3" />
                    Login as Learner
                </button>
                <button onClick={() => handleLogin(Role.Mentor)} className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Icon name="book-outline" className="mr-3" />
                    Login as Mentor
                </button>
                <button onClick={() => handleLogin(Role.Client)} className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Icon name="briefcase-outline" className="mr-3" />
                    Login as Client
                </button>
                 <button onClick={() => handleLogin(Role.Admin)} className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Icon name="cog-outline" className="mr-3" />
                    Login as Admin (Content Gen)
                </button>
            </div>
        </Modal>
    );
};

export default LoginModal;
