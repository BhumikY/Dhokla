import React, { useContext } from 'react';
import { AppContext } from './contexts/AppContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Icon from './components/Icon';

import HomeView from './views/HomeView';
import LearnerDashboardView from './views/LearnerDashboardView';
import MentorDashboardView from './views/MentorDashboardView';
import ClientDashboardView from './views/ClientDashboardView';
import CourseDetailView from './views/CourseDetailView';
import JobDetailView from './views/JobDetailView';
import ContentGeneratorView from './views/ContentGeneratorView';

const App: React.FC = () => {
    const { currentView, showLoginModal, isLoading } = useContext(AppContext);

    const renderView = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full flex-grow py-20">
                    <Icon name="cog-outline" className="text-6xl text-indigo-500 animate-spin" />
                    <p className="mt-4 text-lg text-gray-600">Loading Platform...</p>
                </div>
            )
        }
        switch (currentView) {
            case 'home':
                return <HomeView />;
            case 'learner-dashboard':
                return <LearnerDashboardView />;
            case 'mentor-dashboard':
                return <MentorDashboardView />;
            case 'client-dashboard':
                return <ClientDashboardView />;
            case 'course-detail':
                return <CourseDetailView />;
            case 'job-detail':
                return <JobDetailView />;
            case 'content-generator':
                return <ContentGeneratorView />;
            default:
                return <HomeView />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow flex flex-col">
                {renderView()}
            </main>
            <Footer />
            {showLoginModal && <LoginModal />}
        </div>
    );
};

export default App;