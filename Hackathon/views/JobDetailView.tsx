
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from '../components/Icon';

const JobDetailView: React.FC = () => {
    const { selectedJob, goBack } = useContext(AppContext);

    if (!selectedJob) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-semibold">Job not found.</h2>
                <button onClick={goBack} className="mt-4 text-indigo-600 hover:text-indigo-800">
                    Go Back
                </button>
            </div>
        );
    }
    
    const { title, client, budget, description, skills } = selectedJob;

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg animate-fadeIn">
            <button onClick={goBack} className="mb-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                <Icon name="arrow-back-outline" className="mr-1" />
                Back to Jobs
            </button>
            <div id="job-detail-content">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Open to Apply</span>
                <h1 className="text-4xl font-bold text-gray-900 mt-4">{title}</h1>
                <p className="text-lg text-gray-500 mt-2">Posted by: <span className="font-medium text-gray-700">{client}</span></p>

                <div className="my-8 p-6 bg-indigo-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900">Budget</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-1">{budget}</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">{description}</p>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-3">
                        {skills.map(skill => <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">{skill}</span>)}
                    </div>
                </div>

                <button className="mt-10 w-full md:w-auto bg-green-600 text-white font-bold py-4 px-10 text-lg rounded-lg shadow-lg hover:bg-green-700">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobDetailView;
