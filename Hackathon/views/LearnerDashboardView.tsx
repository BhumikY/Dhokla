
import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from '../components/Icon';
import JobCard from '../components/JobCard';

type Tab = 'courses' | 'jobs' | 'portfolio' | 'mentor';

const LearnerDashboardView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('courses');
    const { currentUser, jobs } = useContext(AppContext);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'courses':
                return <MyCourses />;
            case 'jobs':
                return <FreelanceHub />;
            case 'portfolio':
                return <MyPortfolio />;
            case 'mentor':
                return <MyMentor />;
            default:
                return null;
        }
    };
    
    const TabButton: React.FC<{tabId: Tab; children: React.ReactNode}> = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tabId
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="space-y-8 animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
            
            {/* Dashboard Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon="play-circle-outline" label="Courses in Progress" value="2" color="indigo" />
                <StatCard icon="ribbon-outline" label="Skills Certified" value="1" color="green" />
                <StatCard icon="cash-outline" label="Total Earned" value="₹1,500" color="yellow" />
            </div>

            {/* Tab Navigation */}
            <div className="sm:hidden">
                <label htmlFor="learner-tabs" className="sr-only">Select a tab</label>
                <select id="learner-tabs" name="learner-tabs" className="block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" onChange={e => setActiveTab(e.target.value as Tab)} value={activeTab}>
                    <option value="courses">My Courses</option>
                    <option value="jobs">Freelance Hub</option>
                    <option value="portfolio">My Portfolio</option>
                    <option value="mentor">My Mentor</option>
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <TabButton tabId="courses">My Courses</TabButton>
                        <TabButton tabId="jobs">Freelance Hub</TabButton>
                        <TabButton tabId="portfolio">My Portfolio</TabButton>
                        <TabButton tabId="mentor">My Mentor</TabButton>
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="py-4">
                {renderTabContent()}
            </div>
        </div>
    );
};

// Sub-components for each tab
const MyCourses: React.FC = () => (
    <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="https://picsum.photos/seed/webdev2/600/300" alt="Web Development" className="w-full h-40 object-cover" />
                <div className="p-6">
                    <h3 className="text-xl font-semibold">Basic Web Development</h3>
                    <p className="text-sm text-gray-500 mt-1">Mentor: Aarav S. (NSS, IIT Delhi)</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">45% Complete</p>
                    <button className="mt-4 w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700">Continue Learning</button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="https://picsum.photos/seed/video2/600/300" alt="Video Editing" className="w-full h-40 object-cover" />
                <div className="p-6">
                    <h3 className="text-xl font-semibold">Video Editing for YouTube</h3>
                    <p className="text-sm text-gray-500 mt-1">Mentor: Riya G. (SSG, St. Xavier's)</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-sm text-green-600 font-medium mt-2">Completed</p>
                    <button className="mt-4 w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700">View Certificate</button>
                </div>
            </div>
        </div>
    </div>
);

const FreelanceHub: React.FC = () => {
    const { jobs } = useContext(AppContext);
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Freelance Jobs</h2>
            <p className="text-gray-600 mb-6">These jobs are matched to your certified skills. Apply now!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
        </div>
    );
};

const MyPortfolio: React.FC = () => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">My Portfolio</h2>
            <button className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center">
                <Icon name="add-outline" className="mr-2" /> Add Project
            </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">My Certified Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Video Editing</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Web Development (In Progress)</span>
            </div>
            <hr className="my-6" />
            <h3 className="text-lg font-semibold">My Projects</h3>
            <div className="mt-4 space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-indigo-600">"My Village" - Vlog Edit</h4>
                        <p className="text-sm text-gray-500">Video Editing | Final project for course</p>
                    </div>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Project</a>
                </div>
            </div>
        </div>
    </div>
);

const MyMentor: React.FC = () => (
    <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Mentors</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
                <img className="h-16 w-16 rounded-full object-cover" src="https://i.pravatar.cc/150?u=aarav" alt="Aarav S." />
                <div>
                    <h3 className="text-xl font-semibold">Aarav S.</h3>
                    <p className="text-indigo-600">NSS, IIT Delhi</p>
                    <p className="text-sm text-gray-500">Mentor for: Basic Web Development</p>
                </div>
            </div>
            <hr className="my-6" />
            <h4 className="font-semibold mb-4">Chat with Aarav</h4>
            <div className="border border-gray-200 rounded-lg h-64 p-4 overflow-y-auto bg-gray-50 space-y-4">
                <div className="flex"><div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs"><p>Hi! How is module 2 (CSS Basics) going? Let me know if you're stuck.</p></div></div>
                <div className="flex justify-end"><div className="bg-indigo-600 text-white p-3 rounded-lg max-w-xs"><p>Hi Aarav! I'm finding 'flexbox' a bit confusing. Can we schedule a quick call?</p></div></div>
            </div>
            <div className="mt-4 flex space-x-2">
                <input type="text" placeholder="Type your message..." className="flex-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                <button className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 flex-shrink-0"><Icon name="send-outline" /></button>
            </div>
        </div>
    </div>
);

const StatCard: React.FC<{ icon: string, label: string, value: string, color: 'indigo' | 'green' | 'yellow' }> = ({ icon, label, value, color }) => {
    const colors = {
        indigo: 'bg-indigo-100 text-indigo-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <div className={`flex-shrink-0 p-3 rounded-full ${colors[color]}`}>
                <Icon name={icon} className="h-6 w-6" />
            </div>
            <div>
                <div className="text-sm font-medium text-gray-500">{label}</div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
            </div>
        </div>
    );
};


export default LearnerDashboardView;
