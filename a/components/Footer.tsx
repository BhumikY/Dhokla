import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from './Icon';

const Footer: React.FC = () => {
    const { setCurrentView } = useContext(AppContext);
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-2xl font-bold text-white">SkillSetu</span>
                <p className="mt-4 text-gray-400">
                    Connecting talent from semi-rural India with global opportunities.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    A social initiative concept.
                </p>
                 <div className="mt-6 flex justify-center space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Facebook</span><Icon name="logo-facebook" className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Instagram</span><Icon name="logo-instagram" className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span><Icon name="logo-twitter" className="h-6 w-6" /></a>
                </div>
                <p className="mt-8 text-center text-sm text-gray-400">
                    &copy; 2025 SkillSetu. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;