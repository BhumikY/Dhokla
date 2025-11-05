import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from '../components/Icon';

const MentorDashboardView: React.FC = () => {
    const { currentUser, courses, jobs } = useContext(AppContext);
    
    // Filter for jobs supervised by this mentor
    const mySupervisedJobs = jobs.filter(job => job.assignment?.supervisor.email === currentUser?.email);

    return (
        <div className="space-y-8 animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard ({currentUser?.name})</h1>

            {/* My Supervised Projects */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Supervised Projects</h2>
                {mySupervisedJobs.length > 0 ? (
                    <div className="space-y-4">
                        {mySupervisedJobs.map(job => (
                            <div key={job.id} className="border border-gray-200 p-4 rounded-lg">
                                <h3 className="font-semibold text-lg text-indigo-600">{job.title}</h3>
                                <p className="text-sm text-gray-500">Client: {job.client}</p>
                                <p className="mt-2 font-medium">Team ({job.assignment?.team.length} members):</p>
                                <ul className="list-disc list-inside text-gray-600">
                                    {job.assignment?.team.map(member => <li key={member.email}>{member.name}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You are not currently supervising any projects.</p>
                )}
            </div>

            {/* My Courses */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Authored Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* This would be filtered by mentor in a real app */}
                     {courses.filter(c => c.mentor === currentUser?.name).map(course => (
                        <div key={course.id} className="border border-gray-200 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
                            <p className="text-sm text-gray-500">{course.modules.length} modules</p>
                        </div>
                     ))}
                </div>
            </div>
        </div>
    );
};

export default MentorDashboardView;