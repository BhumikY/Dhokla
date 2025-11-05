
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from '../components/Icon';

const CourseDetailView: React.FC = () => {
    const { selectedCourse, goBack } = useContext(AppContext);

    if (!selectedCourse) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-semibold">Course not found.</h2>
                <button onClick={goBack} className="mt-4 text-indigo-600 hover:text-indigo-800">
                    Go Back
                </button>
            </div>
        );
    }
    
    const { title, image, language, description, mentor, college, modules } = selectedCourse;

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg animate-fadeIn">
            <button onClick={goBack} className="mb-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                <Icon name="arrow-back-outline" className="mr-1" />
                Back to Courses
            </button>
            <div id="course-detail-content">
                <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg mb-6" />
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">{language}</span>
                <h1 className="text-4xl font-bold text-gray-900 mt-4">{title}</h1>
                <p className="text-lg text-gray-600 mt-2">{description}</p>
                
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your Mentor</h3>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-2xl font-bold">
                            {mentor.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold">{mentor}</h4>
                            <p className="text-indigo-600">{college}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Course Modules</h3>
                    <ul className="space-y-3">
                        {modules.map((module, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                                <Icon name="checkmark-circle-outline" className="h-6 w-6 text-green-500 mr-3" />
                                <span>{module}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="mt-10 w-full md:w-auto bg-indigo-600 text-white font-bold py-4 px-10 text-lg rounded-lg shadow-lg hover:bg-indigo-700">
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

export default CourseDetailView;
