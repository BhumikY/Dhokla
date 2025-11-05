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
    
    const { title, client, budget, description, skills, assignment } = selectedJob;

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg animate-fadeIn">
            <button onClick={goBack} className="mb-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                <Icon name="arrow-back-outline" className="mr-1" />
                Back to Jobs
            </button>
            <div id="job-detail-content">
                 {assignment ? (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Project In Progress</span>
                ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Open to Apply</span>
                )}
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

                {assignment ? (
                    <div className="mt-10">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Assigned Team</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Supervisor (NGO/College Volunteer)</h4>
                                <div className="mt-2 bg-gray-50 p-4 rounded-lg flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xl font-bold">
                                        {assignment.supervisor.avatarText}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{assignment.supervisor.name}</p>
                                        <p className="text-sm text-indigo-600">{assignment.supervisor.tagline}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Team Members ({assignment.team.length} people)</h4>
                                <ul className="mt-2 space-y-2 list-disc list-inside text-gray-700">
                                    {assignment.team.map(member => <li key={member.email}>{member.name}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button className="mt-10 w-full md:w-auto bg-green-600 text-white font-bold py-4 px-10 text-lg rounded-lg shadow-lg hover:bg-green-700">
                        Submit Team Proposal
                    </button>
                )}
            </div>
        </div>
    );
};

export default JobDetailView;