import { Course, Job, User, RegistrationData } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';
const AUTH_TOKEN_KEY = 'skillsetu_auth_token';

// --- HELPER FUNCTIONS ---

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        if (response.status === 401) {
            // Auto-logout on auth error
            logout();
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'An API error occurred.');
    }
    return response.json();
};

// --- API FUNCTIONS ---

export const getCourses = async (): Promise<Course[]> => {
    const response = await fetch(`${API_BASE_URL}/courses`);
    return handleResponse(response);
};

export const getJobs = async (): Promise<Job[]> => {
    const response = await fetch(`${API_BASE_URL}/jobs`, { headers: getAuthHeaders() });
    return handleResponse(response);
};

export const register = async (data: RegistrationData): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const { user, token } = await handleResponse(response);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return user;
};

export const login = async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const { user, token } = await handleResponse(response);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return user;
};

export const logout = async (): Promise<void> => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    // No need to call a backend endpoint for this simple token removal
    return Promise.resolve();
};

export const checkSession = async (): Promise<User | null> => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/session`, {
            headers: getAuthHeaders(),
        });
        const { user } = await handleResponse(response);
        return user;
    } catch (error) {
        console.error("Session check failed:", error);
        // This will likely trigger a logout due to the 401 in handleResponse
        return null;
    }
};

export const addCourse = async (courseData: Omit<Course, 'id' | 'image'>): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(courseData),
    });
    return handleResponse(response);
};

export const addJob = async (jobData: Omit<Job, 'id'>): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(jobData),
    });
    return handleResponse(response);
};