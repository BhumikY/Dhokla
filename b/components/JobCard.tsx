import React, { useContext } from 'react';
import { Job } from '../types';
import { AppContext } from '../contexts/AppContext';

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const { setCurrentView, setSelectedJob } = useContext(AppContext);
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-indigo-600 pr-4">{job.title}</h3>
                    <span className="text-xl font-bold text-green-600 whitespace-nowrap">{job.budget}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">by {job.client}</p>
                <p className="text-gray-700 mt-4 text-sm">{job.description.substring(0, 100)}...</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map(skill => <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{skill}</span>)}
                </div>
                <div className="mt-auto pt-6">
                    <button onClick={() => {
                        setSelectedJob(job);
                        setCurrentView('job-detail');
                        }} className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        {job.assignment ? 'View Team Project' : 'View Details & Apply'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;