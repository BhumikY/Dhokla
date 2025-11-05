import React, { useContext } from 'react';
import { Course } from '../types';
import { AppContext } from '../contexts/AppContext';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const { setCurrentView, setSelectedCourse } = useContext(AppContext);
    
    const isUrl = course.image.startsWith('http');

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            {isUrl ? (
                <img className="h-48 w-full object-cover" src={course.image} alt={course.title} />
            ) : (
                <div className="h-48 w-full flex items-center justify-center bg-gray-100 text-6xl">
                    {course.image}
                </div>
            )}
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 pr-4">{course.title}</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium whitespace-nowrap">{course.language}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    by <span className="font-medium text-indigo-600">{course.mentor}</span> from {course.college}
                </p>
                <p className="text-gray-700 mt-4 text-sm flex-grow">{course.description.substring(0, 120)}...</p>
                <div className="mt-auto pt-6">
                     <button onClick={() => {
                        setSelectedCourse(course);
                        setCurrentView('course-detail');
                     }} className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        View Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;