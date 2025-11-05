
import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from './Icon';

const NavLink: React.FC<{ href: string; view?: string; children: React.ReactNode; currentView: string; onClick: (view: string) => void }> = ({ href, view, children, currentView, onClick }) => {
    const isActive = currentView === view;
    return (
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                onClick(view || 'home');
            }}
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
        >
            {children}
        </a>
    );
};

const MobileNavLink: React.FC<{ href: string; view?: string; children: React.ReactNode; currentView: string; onClick: (view: string) => void }> = ({ href, view, children, currentView, onClick }) => {
    const isActive = currentView === view;
    return (
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                onClick(view || 'home');
            }}
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
        >
            {children}
        </a>
    );
};

const Navbar: React.FC = () => {
    const { currentView, setCurrentView, currentUser, logout, setShowLoginModal } = useContext(AppContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (view: string) => {
        if (view.startsWith('#')) {
            setCurrentView('home');
            setTimeout(() => {
                document.getElementById(view.substring(1))?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        } else {
            setCurrentView(view as any);
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
                        <span className="text-2xl font-bold text-indigo-600">SkillSetu</span>
                        <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">BETA</span>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <NavLink href="#home" view="home" currentView={currentView} onClick={() => handleNavClick('home')}>Home</NavLink>
                        <NavLink href="#courses" currentView={currentView} onClick={() => handleNavClick('#courses')}>Courses</NavLink>
                        <NavLink href="#how-it-works" currentView={currentView} onClick={() => handleNavClick('#how-it-works')}>How It Works</NavLink>
                    </div>

                    <div className="flex items-center">
                        {currentUser ? (
                            <div className="relative ml-4">
                               <div className="flex items-center space-x-2">
                                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                                        {currentUser.avatarText}
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="font-semibold text-gray-800">{currentUser.name}</div>
                                        <div className="text-xs text-gray-500">{currentUser.role}</div>
                                    </div>
                                    <button onClick={logout} className="ml-2 inline-flex items-center px-3 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <Icon name="log-out-outline" className="text-lg" />
                                    </button>
                               </div>
                            </div>
                        ) : (
                            <button onClick={() => setShowLoginModal(true)} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Icon name="log-in-outline" className="mr-2" />
                                Login / Sign Up
                            </button>
                        )}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden ml-3 p-2 rounded-lg inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            <Icon name={mobileMenuOpen ? 'close-outline' : 'menu-outline'} className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="pt-2 pb-3 space-y-1">
                        <MobileNavLink href="#home" view="home" currentView={currentView} onClick={() => handleNavClick('home')}>Home</MobileNavLink>
                        <MobileNavLink href="#courses" currentView={currentView} onClick={() => handleNavClick('#courses')}>Courses</MobileNavLink>
                        <MobileNavLink href="#how-it-works" currentView={currentView} onClick={() => handleNavClick('#how-it-works')}>How It Works</MobileNavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
