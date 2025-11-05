import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import JobCard from '../components/JobCard';
import Icon from '../components/Icon';

const HomeView: React.FC = () => {
    const { courses, jobs, setCurrentView } = useContext(AppContext);

    return (
        <div className="space-y-12 animate-fadeIn">
            {/* Hero Section */}
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Learn In-Demand Skills. <span className="text-indigo-600">Find Freelance Work.</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    SkillSetu connects talent from semi-rural India with college student mentors and real-world freelance projects.
                </p>
                 <div className="mt-8 flex justify-center gap-4">
                    <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700">
                        Explore Courses
                    </button>
                     <button onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-indigo-600 font-medium py-3 px-6 rounded-lg shadow-md border border-indigo-200 hover:bg-indigo-50">
                        Find Work
                    </button>
                </div>
            </div>

            {/* Courses Section */}
            <section id="courses">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.slice(0, 3).map(course => <CourseCard key={course.id} course={course} />)}
                </div>
            </section>

            {/* Jobs Section */}
            <section id="jobs">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Available Freelance Jobs</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.slice(0, 3).map(job => <JobCard key={job.id} job={job} />)}
                </div>
            </section>
        </div>
    );
};

export default HomeView;