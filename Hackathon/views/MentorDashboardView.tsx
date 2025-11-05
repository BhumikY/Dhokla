
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from '../components/Icon';

const MentorDashboardView: React.FC = () => {
    const { currentUser } = useContext(AppContext);

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                 <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
                 <p className="text-lg text-gray-600">{currentUser?.name} ({currentUser?.tagline})</p>
            </div>

            {/* Dashboard Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-full"><Icon name="people-outline" className="h-6 w-6 text-indigo-600" /></div>
                    <div>
                        <div className="text-sm font-medium text-gray-500">Active Students</div>
                        <div className="text-2xl font-bold text-gray-900">12</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <div className="flex-shrink-0 p-3 bg-green-100 rounded-full"><Icon name="checkmark-done-outline" className="h-6 w-6 text-green-600" /></div>
                    <div>
                        <div className="text-sm font-medium text-gray-500">Submissions to Review</div>
                        <div className="text-2xl font-bold text-gray-900">3</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full"><Icon name="time-outline" className="h-6 w-6 text-blue-600" /></div>
                    <div>
                        <div className="text-sm font-medium text-gray-500">Total Hours Logged</div>
                        <div className="text-2xl font-bold text-gray-900">28 <span className="text-base font-normal text-gray-500">(NSS Credit)</span></div>
                    </div>
                </div>
            </div>

            {/* Mentor Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* My Students */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Students (Basic Web Development)</h2>
                    <div className="space-y-4">
                        {/* Student Item */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Priya K.</h4>
                                    <p className="text-sm text-gray-500">Rampur, Tier-3</p>
                                </div>
                                <div className="text-sm"><span className="font-medium text-gray-700">Progress:</span> 45%</div>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Progress</button>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                <span className="text-sm text-red-600 font-medium">Alert: Stuck on 'flexbox'</span>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Send Message</button>
                            </div>
                        </div>
                        {/* Student Item */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Rohan V.</h4>
                                    <p className="text-sm text-gray-500">Indore, Tier-2</p>
                                </div>
                                <div className="text-sm"><span className="font-medium text-gray-700">Progress:</span> 80%</div>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Progress</button>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                <span className="text-sm text-green-600 font-medium">Submission: Project 2</span>
                                <button className="text-sm font-medium text-green-600 hover:text-green-800">Review Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* My Schedule */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Schedule</h2>
                    <div className="space-y-4">
                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                            <h4 className="font-semibold">Live Q&A Session</h4>
                            <p className="text-sm text-gray-700">Today, 7:00 PM</p>
                            <a href="#" className="text-sm font-medium text-indigo-600">Join Google Meet</a>
                        </div>
                        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-r-lg">
                            <h4 className="font-semibold">Priya K. - 1-on-1 Call</h4>
                            <p className="text-sm text-gray-700">Tomorrow, 11:00 AM</p>
                            <a href="#" className="text-sm font-medium text-indigo-600">Pending Confirmation</a>
                        </div>
                        <button className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                            <Icon name="calendar-outline" className="mr-2" /> Manage Availability
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorDashboardView;
