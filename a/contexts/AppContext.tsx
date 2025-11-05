import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, Role, View, Course, Job, RegistrationData } from '../types';
import * as api from '../services/api';

interface AppContextType {
    currentUser: User | null;
    currentView: View;
    showLoginModal: boolean;
    isLoading: boolean;
    selectedCourse: Course | null;
    selectedJob: Job | null;
    courses: Course[];
    jobs: Job[];
    setCurrentUser: (user: User | null) => void;
    setCurrentView: (view: View) => void;
    setShowLoginModal: (show: boolean) => void;
    setSelectedCourse: (course: Course | null) => void;
    setSelectedJob: (job: Job | null) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegistrationData) => Promise<void>;
    logout: () => Promise<void>;
    goBack: () => void;
    addCourse: (course: Omit<Course, 'id' | 'image'>) => Promise<void>;
    addJob: (job: Omit<Job, 'id'>) => Promise<void>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentView, _setCurrentView] = useState<View>('home');
    const [previousView, setPreviousView] = useState<View>('home');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const initializeApp = async () => {
            setIsLoading(true);
            try {
                const sessionUser = await api.checkSession();
                if (sessionUser) {
                    setCurrentUser(sessionUser);
                    _setCurrentView(getDashboardViewForRole(sessionUser.role));
                }
                const [loadedCourses, loadedJobs] = await Promise.all([
                    api.getCourses(),
                    api.getJobs(),
                ]);
                setCourses(loadedCourses);
                setJobs(loadedJobs);
            } catch (error) {
                console.error("Failed to initialize app:", error);
            } finally {
                setIsLoading(false);
            }
        };
        initializeApp();
    }, []);

    const setCurrentView = (view: View) => {
        setPreviousView(currentView);
        _setCurrentView(view);
        window.scrollTo(0, 0);
    };

    const goBack = () => {
        _setCurrentView(previousView);
        window.scrollTo(0, 0);
    };

    const getDashboardViewForRole = (role: Role): View => {
        switch (role) {
            case Role.Learner: return 'learner-dashboard';
            case Role.Mentor: return 'mentor-dashboard';
            case Role.Client: return 'client-dashboard';
            case Role.Admin: return 'content-generator';
            default: return 'home';
        }
    }

    const login = async (email: string, password: string) => {
        const user = await api.login(email, password);
        setCurrentUser(user);
        setShowLoginModal(false);
        setCurrentView(getDashboardViewForRole(user.role));
    };

    const register = async (data: RegistrationData) => {
        const user = await api.register(data);
        setCurrentUser(user);
        setShowLoginModal(false);
        setCurrentView(getDashboardViewForRole(user.role));
    }

    const logout = async () => {
        await api.logout();
        setCurrentUser(null);
        setCurrentView('home');
        setSelectedCourse(null);
        setSelectedJob(null);
    };

    const addCourse = async (courseData: Omit<Course, 'id' | 'image'>) => {
        const newCourse = await api.addCourse(courseData);
        setCourses(prevCourses => [newCourse, ...prevCourses]);
    };

    const addJob = async (jobData: Omit<Job, 'id'>) => {
        const newJob = await api.addJob(jobData);
        setJobs(prevJobs => [newJob, ...prevJobs]);
    };

    return (
        <AppContext.Provider
            value={{
                currentUser,
                currentView,
                showLoginModal,
                isLoading,
                selectedCourse,
                selectedJob,
                courses,
                jobs,
                setCurrentUser,
                setCurrentView,
                setShowLoginModal,
                setSelectedCourse,
                setSelectedJob,
                login,
                register,
                logout,
                goBack,
                addCourse,
                addJob,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};