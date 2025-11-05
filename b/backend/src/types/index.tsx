
// FIX: To resolve compilation errors from duplicate .ts/.tsx files, the build process
// will now only include .tsx files. This file is now the single source of truth for backend types,
// so the necessary 'express' import and global type augmentation for `Express.Request`
// have been added back.
import 'express';

export enum Role {
    Learner = 'learner',
    Mentor = 'mentor',
    Client = 'client',
    Admin = 'admin'
}

export interface User {
    id: number;
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
    description:string;
    modules: string[];
    language: string;
}

export interface JobAssignment {
    supervisor: User;
    team: User[];
}

export interface Job {
    id: number;
    title: string;
    client: string;
    budget: string;
    description: string;
    skills: string[];
    assignment?: JobAssignment;
}

export interface DbUser {
    id: number;
    name: string;
    email: string;
    role: Role;
    passwordHash: string;
}


// For Express middleware
// This uses module augmentation to add the 'user' property to the global Express.Request interface.
// This is the idiomatic way to handle this in Express with TypeScript.
declare global {
    namespace Express {
        export interface Request {
            user?: {
                id: number;
                email: string;
                role: Role;
            }
        }
    }
}