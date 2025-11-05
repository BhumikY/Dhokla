
import React, { useContext } from 'react';
import { Course } from '../types';
import { AppContext } from '../contexts/AppContext';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const { setCurrentView } = useContext(AppContext);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium self-start">{course.language}</span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{course.title}</h3>
                <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-800">{course.mentor}</span> ({course.college})
                </p>
                <div className="mt-auto pt-5">
                    <button onClick={() => setCurrentView('course-detail', course)} className="w-full bg-white text-indigo-600 font-medium py-2 px-4 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
