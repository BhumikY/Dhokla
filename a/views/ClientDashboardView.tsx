import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from '../components/Icon';

const ClientDashboardView: React.FC = () => {
    const { currentUser, jobs } = useContext(AppContext);

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Client Dashboard ({currentUser?.name})</h1>
                <button className="mt-4 md:mt-0 w-full md:w-auto bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 flex items-center justify-center">
                    <Icon name="add-circle-outline" className="mr-2 text-lg" /> Post a New Job
                </button>
            </div>

            {/* Client Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* My Active Jobs */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Active Jobs</h2>
                    <div className="space-y-6">
                        {jobs.map(job => (
                            <div key={job.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="p-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-indigo-600">{job.title}</h3>
                                        {job.assignment ? (
                                             <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">In Progress</span>
                                        ) : (
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Accepting Proposals</span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mt-2">{job.description}</p>
                                    <p className="text-lg font-bold text-gray-900 mt-3">Budget: {job.budget}</p>
                                </div>
                                <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                                    {job.assignment ? (
                                        <>
                                            <span className="text-sm text-gray-600">
                                                Supervised by: <span className="font-medium text-gray-900">{job.assignment.supervisor.name}</span> ({job.assignment.team.length} members)
                                            </span>
                                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Chat with Supervisor</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Proposals</button>
                                            <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Manage Job</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Find Talent */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Find Talent</h2>
                    <p className="text-gray-600 mb-4">Browse portfolios of certified learners. Teams are formed for each project under the guidance of a certified volunteer.</p>
                    <div className="space-y-4">
                        <input type="text" placeholder="Search by skill (e.g., 'Video Editing')" className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                        {/* Talent Profile Card */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <img className="h-12 w-12 rounded-full" src="https://i.pravatar.cc/150?u=anita" alt="Anita Devi" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Anita Devi</h4>
                                    <p className="text-sm text-gray-500">Tier-3</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">Graphic Design</span>
                            </div>
                            <button className="mt-4 w-full text-sm font-medium text-indigo-600 hover:text-indigo-800">View Portfolio</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboardView;