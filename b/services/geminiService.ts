import { Course, Job } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';
const AUTH_TOKEN_KEY = 'skillsetu_auth_token';

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'An API error occurred.');
    }
    return response.json();
};


export const generateCourse = async (prompt: string): Promise<Omit<Course, 'id' | 'image'>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/ai/generate/course`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ prompt }),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Error generating course:", error);
        throw new Error("Failed to generate course from AI.");
    }
};

export const generateJob = async (prompt: string): Promise<Omit<Job, 'id'>> => {
     try {
        const response = await fetch(`${API_BASE_URL}/ai/generate/job`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ prompt }),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Error generating job:", error);
        throw new Error("Failed to generate job from AI.");
    }
};