
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { Course, Job, User, Role, View } from '../types';

// --- MOCK DATA ---
const mockCourses: Course[] = [
    {
        id: 1,
        title: "Video Editing for YouTube",
        mentor: "Riya G.",
        college: "SSG, St. Xavier's",
        image: "https://picsum.photos/seed/video/600/300",
        description: "Learn to edit engaging vlogs and videos for YouTube using mobile and desktop tools. This course is perfect for beginners.",
        modules: ["Introduction to Editing", "Cutting & Splicing Clips", "Adding Text & Music", "Color Correction Basics", "Exporting for YouTube"],
        language: "English"
    },
    {
        id: 2,
        title: "Basic Web Development",
        mentor: "Aarav S.",
        college: "NSS, IIT Delhi",
        image: "https://picsum.photos/seed/webdev/600/300",
        description: "Build your first website from scratch. This course covers the fundamentals of HTML, CSS, and basic JavaScript.",
        modules: ["What is HTML?", "CSS Basics: Styling Your Page", "Understanding Flexbox & Grid", "Introduction to JavaScript", "Final Project: Your Portfolio Page"],
        language: "English"
    },
    {
        id: 3,
        title: "Graphic Design (Hindi)",
        mentor: "Suraj P.",
        college: "SSG, BHU Varanasi",
        image: "https://picsum.photos/seed/design/600/300",
        description: "सोशल मीडिया के लिए सुंदर पोस्टर और बैनर बनाना सीखें। यह कोर्स Canva और अन्य टूल को हिंदी में सिखाता है।",
        modules: ["Design Principles (in Hindi)", "Using Canva", "Color Theory (in Hindi)", "Creating Social Media Posts", "Project: Local Shop Poster"],
        language: "Hindi"
    }
];

const mockJobs: Job[] = [
    {
        id: 1,
        title: "Edit Weekly YouTube Vlog",
        client: "TechVlogger",
        budget: "₹1,500 / vlog",
        description: "Need a skilled video editor to cut, add B-roll, and color grade my 15-min weekly vlogs. This is an ongoing project. Must be familiar with YouTube trends.",
        skills: ["Video Editing", "Color Grading", "Adobe Premiere Pro (or similar)"]
    },
    {
        id: 2,
        title: "Logo Design for Local Shop (Hindi)",
        client: "Sharma Sweets",
        budget: "₹800 (One-time)",
        description: "हमें अपनी मिठाई की दुकान के लिए एक नए, सुंदर लोगो की आवश्यकता है। (We need a new, beautiful logo for our sweet shop.)",
        skills: ["Graphic Design", "Logo Design", "Canva"]
    },
];

const users: Record<Role, User> = {
    [Role.Learner]: { name: 'Priya K.', role: Role.Learner, avatarText: 'PK' },
    [Role.Mentor]: { name: 'Aarav S.', role: Role.Mentor, avatarText: 'AS', tagline: 'NSS - IIT Delhi' },
    [Role.Client]: { name: 'TechVlogger', role: Role.Client, avatarText: 'TV' },
    [Role.Admin]: { name: 'Admin', role: Role.Admin, avatarText: 'AD' }
};

interface AppContextType {
    currentView: View;
    previousView: View;
    currentUser: User | null;
    courses: Course[];
    jobs: Job[];
    selectedCourse: Course | null;
    selectedJob: Job | null;
    showLoginModal: boolean;
    setCurrentView: (view: View, data?: any) => void;
    goBack: () => void;
    login: (role: Role) => void;
    logout: () => void;
    setShowLoginModal: (show: boolean) => void;
    addCourse: (course: Omit<Course, 'id' | 'image'>) => void;
    addJob: (job: Omit<Job, 'id'>) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentView, _setCurrentView] = useState<View>('home');
    const [previousView, setPreviousView] = useState<View>('home');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [courses, setCourses] = useState<Course[]>(mockCourses);
    const [jobs, setJobs] = useState<Job[]>(mockJobs);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const setCurrentView = useCallback((view: View, data?: any) => {
        setPreviousView(currentView);
        if (view === 'course-detail' && data) {
            setSelectedCourse(data);
        }
        if (view === 'job-detail' && data) {
            setSelectedJob(data);
        }
        _setCurrentView(view);
        window.scrollTo(0, 0);
    }, [currentView]);

    const goBack = useCallback(() => {
        _setCurrentView(previousView);
        window.scrollTo(0, 0);
    }, [previousView]);

    const login = useCallback((role: Role) => {
        const user = users[role];
        setCurrentUser(user);
        setShowLoginModal(false);
        switch (role) {
            case Role.Learner:
                setCurrentView('learner-dashboard');
                break;
            case Role.Mentor:
                setCurrentView('mentor-dashboard');
                break;
            case Role.Client:
                setCurrentView('client-dashboard');
                break;
            case Role.Admin:
                setCurrentView('content-generator');
                break;
        }
    }, [setCurrentView]);

    const logout = useCallback(() => {
        setCurrentUser(null);
        setCurrentView('home');
    }, [setCurrentView]);
    
    const addCourse = (courseData: Omit<Course, 'id' | 'image'>) => {
        const newCourse: Course = {
            ...courseData,
            id: Date.now(),
            image: `https://picsum.photos/seed/${Date.now()}/600/300`
        };
        setCourses(prev => [newCourse, ...prev]);
    };
    
    const addJob = (jobData: Omit<Job, 'id'>) => {
        const newJob: Job = {
            ...jobData,
            id: Date.now()
        };
        setJobs(prev => [newJob, ...prev]);
    };

    return (
        <AppContext.Provider value={{
            currentView,
            previousView,
            currentUser,
            courses,
            jobs,
            selectedCourse,
            selectedJob,
            showLoginModal,
            setCurrentView,
            goBack,
            login,
            logout,
            setShowLoginModal,
            addCourse,
            addJob,
        }}>
            {children}
        </AppContext.Provider>
    );
};
