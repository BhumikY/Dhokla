
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from '../components/Icon';

const ClientDashboardView: React.FC = () => {
    const { currentUser } = useContext(AppContext);

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
                        {/* Job Item */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-indigo-600">Edit Weekly YouTube Vlog</h3>
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">3 Applicants</span>
                                </div>
                                <p className="text-gray-600 mt-2">Need a skilled video editor to cut, add B-roll, and color grade my 15-min weekly vlogs. Quick turnaround needed.</p>
                                <p className="text-lg font-bold text-gray-900 mt-3">Budget: ₹1,500 / vlog</p>
                            </div>
                            <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Applicants</button>
                                <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Manage Job</button>
                            </div>
                        </div>
                        {/* Job Item */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-indigo-600">Logo for New Podcast</h3>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">In Progress</span>
                                </div>
                                <p className="text-gray-600 mt-2">Looking for a simple, modern logo for my new tech podcast "Binary Bytes".</p>
                                <p className="text-lg font-bold text-gray-900 mt-3">Budget: ₹800 (One-time)</p>
                            </div>
                            <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                                <span className="text-sm text-gray-600">Assigned to: <span className="font-medium text-gray-900">Suraj P.</span></span>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Chat with Freelancer</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Find Talent */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Find Talent</h2>
                    <p className="text-gray-600 mb-4">Browse portfolios of certified learners.</p>
                    <div className="space-y-4">
                        <input type="text" placeholder="Search by skill (e.g., 'Video Editing')" className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                        {/* Talent Profile Card */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <img className="h-12 w-12 rounded-full" src="https://i.pravatar.cc/150?u=priya" alt="Priya K." />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Priya K.</h4>
                                    <p className="text-sm text-gray-500">Rampur, Tier-3</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">Video Editing</span>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Adobe Premiere</span>
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
