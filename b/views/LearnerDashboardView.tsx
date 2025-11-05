import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import JobCard from '../components/JobCard';

const LearnerDashboardView: React.FC = () => {
    const { currentUser, courses, jobs } = useContext(AppContext);

    return (
        <div className="space-y-8 animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>

            {/* My Courses Section */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Enrolled Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* In a real app, this would be filtered to the user's courses */}
                    {courses.slice(0, 1).map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
                        <span>You have no other enrolled courses.</span>
                    </div>
                </div>
            </div>

            {/* Available Jobs Section */}
             <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended Jobs For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearnerDashboardView;