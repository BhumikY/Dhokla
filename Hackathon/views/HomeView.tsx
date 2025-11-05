
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Role } from '../types';
import Icon from '../components/Icon';
import CourseCard from '../components/CourseCard';

const HomeView: React.FC = () => {
    const { login, courses } = useContext(AppContext);

    return (
        <div className="space-y-16 md:space-y-24">
            {/* Hero Section */}
            <section id="home" className="text-center bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    Learn In-Demand Skills.
                    <span className="block text-indigo-600">Start Earning Today.</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    Welcome to SkillSetu, the bridge to your future. We connect you with India's brightest college students who teach you skills like
                    <span className="font-medium text-gray-800"> Video Editing, Web Development, & Graphic Design</span> — all online.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button onClick={() => login(Role.Learner)} className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150">
                        Start Learning Now
                    </button>
                    <button onClick={() => login(Role.Client)} className="w-full sm:w-auto px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition duration-150">
                        Hire a Freelancer
                    </button>
                </div>
            </section>

            {/* "How It Works" Section */}
            <section id="how-it-works" className="pt-12">
                <h2 className="text-3xl font-bold text-center text-gray-900">How It Works</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto">
                            <Icon name="school-outline" className="h-8 w-8" />
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-gray-900">1. Learn a Skill</h3>
                        <p className="mt-2 text-gray-600">
                            Enroll in courses taught by verified mentors from top college social service groups (like NSS). Learn at your own pace.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto">
                           <Icon name="construct-outline" className="h-8 w-8" />
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-gray-900">2. Build Your Portfolio</h3>
                        <p className="mt-2 text-gray-600">
                            Complete real-world projects and assignments. Your mentor will review your work and help you build a job-ready portfolio.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto">
                           <Icon name="cash-outline" className="h-8 w-8" />
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-gray-900">3. Start Earning</h3>
                        <p className="mt-2 text-gray-600">
                            Once certified, access our exclusive freelance job board. Apply for gigs, earn money, and build your independence.
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Featured Courses Section */}
            <section id="courses" className="pt-12">
                <h2 className="text-3xl font-bold text-center text-gray-900">Popular Courses</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.slice(0, 3).map(course => <CourseCard key={course.id} course={course} />)}
                </div>
            </section>
        </div>
    );
};

export default HomeView;
