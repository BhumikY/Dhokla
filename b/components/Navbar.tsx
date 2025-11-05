import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Role, View } from '../types';
import Icon from './Icon';

const Navbar: React.FC = () => {
    const { currentUser, currentView, setCurrentView, setShowLoginModal, logout } = useContext(AppContext);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleNavigation = (view: View) => {
        setCurrentView(view);
        setShowUserMenu(false);
    };

    const handleLogout = async () => {
        setShowUserMenu(false);
        await logout();
    };

    const getDashboardView = (): View => {
        if (!currentUser) return 'home';
        switch (currentUser.role) {
            case Role.Learner: return 'learner-dashboard';
            case Role.Mentor: return 'mentor-dashboard';
            case Role.Client: return 'client-dashboard';
            case Role.Admin: return 'content-generator';
            default: return 'home';
        }
    };
    
    const dashboardView = getDashboardView();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Replaced h-16 with py-3 to fix dropdown clipping issue */}
                <div className="flex justify-between items-center py-3">
                    {/* Logo */}
                    <div 
                        className="flex-shrink-0 flex items-center cursor-pointer"
                        onClick={() => handleNavigation('home')}
                    >
                        <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            SkillSetu
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => handleNavigation('home')}
                            className={`font-medium transition ${
                                currentView === 'home' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                            }`}
                        >
                            Home
                        </button>
                         {currentUser && (
                            <button
                                onClick={() => handleNavigation(dashboardView)}
                                className={`font-medium transition flex items-center gap-1 ${
                                    currentView === dashboardView ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                                }`}
                            >
                                <Icon name="grid-outline" />
                                My Dashboard
                            </button>
                        )}
                    </div>

                    {/* User Section */}
                    <div className="flex items-center">
                        {currentUser ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 pr-3 transition"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {currentUser.avatarText}
                                    </div>
                                    <span className="hidden sm:inline font-medium text-gray-800">
                                        {currentUser.name}
                                    </span>
                                    <Icon 
                                        name={showUserMenu ? "chevron-up-outline" : "chevron-down-outline"} 
                                        className="text-gray-500"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                                            <p className="text-xs text-gray-500 mt-1 truncate">{currentUser.email}</p>
                                            <p className="text-xs text-indigo-600 font-semibold mt-1 capitalize">{currentUser.role}</p>
                                        </div>
                                        
                                        <button
                                            onClick={() => handleNavigation(dashboardView)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                                        >
                                            <Icon name={"grid-outline"} className="text-lg text-gray-500" />
                                            <span>My Dashboard</span>
                                        </button>

                                        <div className="border-t border-gray-100 my-1"></div>
                                        
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                                        >
                                            <Icon name="log-out-outline" className="text-lg" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                             <button onClick={() => setShowLoginModal(true)} className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                                Login / Register
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;