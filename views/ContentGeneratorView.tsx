import React, { useState, useContext } from 'react';
// FIX: Imported AI generation functions from the correct service file ('geminiService').
import { generateCourse, generateJob } from '../services/geminiService';
import { AppContext } from '../contexts/AppContext';
import Icon from '../components/Icon';

type GenerationType = 'course' | 'job';

const ContentGeneratorView: React.FC = () => {
    const { addCourse, addJob, setCurrentView } = useContext(AppContext);
    const [prompt, setPrompt] = useState('');
    const [generationType, setGenerationType] = useState<GenerationType>('course');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Prompt cannot be empty.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        
        try {
            if (generationType === 'course') {
                const newCourse = await generateCourse(prompt);
                addCourse(newCourse);
                setSuccessMessage(`Successfully generated course: "${newCourse.title}"`);
            } else {
                const newJob = await generateJob(prompt);
                addJob(newJob);
                 setSuccessMessage(`Successfully generated job: "${newJob.title}"`);
            }
            setPrompt('');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(`AI Generation Failed: ${errorMessage}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-900">AI Content Generator</h1>
            <p className="mt-2 text-gray-600">
                Use Gemini to generate new courses and jobs for the platform. This demonstrates the customizable "backend" functionality.
            </p>
            
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Content Type</label>
                <div className="mt-2 flex rounded-md shadow-sm">
                    <button 
                        type="button"
                        onClick={() => setGenerationType('course')}
                        className={`relative inline-flex items-center px-4 py-2 rounded-l-md border text-sm font-medium ${generationType === 'course' ? 'bg-indigo-600 text-white border-indigo-600 z-10' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    >
                        Course
                    </button>
                    <button 
                        type="button"
                        onClick={() => setGenerationType('job')}
                        className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border text-sm font-medium ${generationType === 'job' ? 'bg-indigo-600 text-white border-indigo-600 z-10' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    >
                        Job
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                    Generation Prompt
                </label>
                <div className="mt-1">
                    <textarea
                        id="prompt"
                        name="prompt"
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder={generationType === 'course' ? 'e.g., A beginner course on mobile photography' : 'e.g., A freelance job to design a poster for a local event'}
                    ></textarea>
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                       <> <Icon name="sparkles-outline" className="mr-2" /> Generate Content</>
                    )}
                </button>
            </div>
             {error && <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
            {successMessage && <p className="mt-4 text-sm text-green-600 bg-green-50 p-3 rounded-md">{successMessage}</p>}
             <button onClick={() => setCurrentView('home')} className="mt-6 w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View Generated Content on Home Page &rarr;
            </button>
        </div>
    );
};

export default ContentGeneratorView;
