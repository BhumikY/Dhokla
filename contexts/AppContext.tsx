import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Course, Job, User, Role, View, RegistrationData } from '../types';
import * as api from '../services/api';

interface AppContextType {
    currentView: View;
    previousView: View;
    currentUser: User | null;
    courses: Course[];
    jobs: Job[];
    selectedCourse: Course | null;
    selectedJob: Job | null;
    showLoginModal: boolean;
    isLoading: boolean;
    error: string | null;
    setCurrentView: (view: View, data?: any) => void;
    goBack: () => void;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegistrationData) => Promise<void>;
    logout: () => void;
    setShowLoginModal: (show: boolean) => void;
    addCourse: (course: Course) => void;
    addJob: (job: Job) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const getDashboardViewForRole = (role: Role): View => {
    switch (role) {
        case Role.Learner: return 'learner-dashboard';
        case Role.Mentor: return 'mentor-dashboard';
        case Role.Client: return 'client-dashboard';
        case Role.Admin: return 'content-generator';
        default: return 'home';
    }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentView, _setCurrentView] = useState<View>('home');
    const [previousView, setPreviousView] = useState<View>('home');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const loadApplicationData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [fetchedCourses, fetchedJobs, persistedUser] = await Promise.all([
                    api.getCourses(),
                    api.getJobs(),
                    api.checkSession(),
                ]);
                setCourses(fetchedCourses);
                setJobs(fetchedJobs);

                if (persistedUser) {
                    setCurrentUser(persistedUser);
                    _setCurrentView(getDashboardViewForRole(persistedUser.role));
                }

            } catch (err) {
                setError("Failed to load platform data.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadApplicationData();
    }, []);


    const setCurrentView = useCallback((view: View, data?: any) => {
        setPreviousView(currentView);
        if (view === 'course-detail' && data) {
            setSelectedCourse(data);
        } else {
            setSelectedCourse(null);
        }

        if (view === 'job-detail' && data) {
            setSelectedJob(data);
        } else {
            setSelectedJob(null);
        }
        _setCurrentView(view);
        window.scrollTo(0, 0);
    }, [currentView]);

    const goBack = useCallback(() => {
        _setCurrentView(previousView);
        window.scrollTo(0, 0);
    }, [previousView]);

    const login = useCallback(async (email: string, password: string) => {
        const user = await api.login(email, password);
        setCurrentUser(user);
        setShowLoginModal(false);
        _setCurrentView(getDashboardViewForRole(user.role));
    }, []);

    const register = useCallback(async (data: RegistrationData) => {
        const user = await api.register(data);
        setCurrentUser(user);
        setShowLoginModal(false);
        _setCurrentView(getDashboardViewForRole(user.role));
    }, []);

    const logout = useCallback(async () => {
        await api.logout();
        setCurrentUser(null);
        _setCurrentView('home');
    }, []);
    
    const addCourse = (course: Course) => {
        setCourses(prev => [course, ...prev]);
    };
    
    const addJob = (job: Job) => {
        setJobs(prev => [job, ...prev]);
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
            isLoading,
            error,
            setCurrentView,
            goBack,
            login,
            register,
            logout,
            setShowLoginModal,
            addCourse,
            addJob,
        }}>
            {children}
        </AppContext.Provider>
    );
};