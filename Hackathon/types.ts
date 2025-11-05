export enum Role {
    Learner = 'learner',
    Mentor = 'mentor',
    Client = 'client',
    Admin = 'admin'
}

export type View = 'home' | 'learner-dashboard' | 'mentor-dashboard' | 'client-dashboard' | 'course-detail' | 'job-detail' | 'content-generator';

export interface User {
    name: string;
    email: string;
    role: Role;
    avatarText: string;
    tagline?: string;
}

export interface RegistrationData {
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface Course {
    id: number;
    title: string;
    mentor: string;
    college: string;
    image: string;
    description: string;
    modules: string[];
    language: string;
}

export interface Job {
    id: number;
    title: string;
    client: string;
    budget: string;
    description: string;
    skills: string[];
}