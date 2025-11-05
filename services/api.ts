import { Course, Job, User, Role, RegistrationData, JobAssignment } from '../types';
import { generateCourse as generateCourseWithAI, generateJob as generateJobWithAI } from './geminiService';

// --- LOCALSTORAGE PERSISTENCE ---
const COURSE_STORAGE_KEY = 'skillsetu_courses';
const JOB_STORAGE_KEY = 'skillsetu_jobs';
const USER_STORAGE_KEY = 'skillsetu_user';
const REGISTERED_USERS_STORAGE_KEY = 'skillsetu_registered_users';

const initialCourses: Course[] = [
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

// Seed users for group assignment feature
const seedMentor: (RegistrationData & { id: number }) = {
    id: 101, name: "Suraj P.", email: "suraj.p@skillsetu.io", password: "password", role: Role.Mentor
};

const seedLearners: (RegistrationData & { id: number })[] = [
    { id: 201, name: "Anita Devi", email: "anita.d@skillsetu.io", password: "password", role: Role.Learner },
    { id: 202, name: "Manoj Kumar", email: "manoj.k@skillsetu.io", password: "password", role: Role.Learner },
    { id: 203, name: "Sunita Singh", email: "sunita.s@skillsetu.io", password: "password", role: Role.Learner },
    { id: 204, name: "Ravi Sharma", email: "ravi.s@skillsetu.io", password: "password", role: Role.Learner },
];

const allSeedUsers = [seedMentor, ...seedLearners];

const supervisorUser: User = {
    name: seedMentor.name, email: seedMentor.email, role: seedMentor.role, avatarText: 'SP', tagline: 'SSG, BHU Varanasi'
};

const teamUsers: User[] = seedLearners.map(l => ({
    name: l.name, email: l.email, role: l.role, avatarText: l.name.substring(0, 2).toUpperCase()
}));


const initialJobs: Job[] = [
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
        skills: ["Graphic Design", "Logo Design", "Canva"],
        assignment: {
            supervisor: supervisorUser,
            team: teamUsers,
        }
    },
];

const safelyParseJSON = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        if (item === null) {
            return defaultValue;
        }
        return JSON.parse(item) as T;
    } catch (error) {
        console.warn(`Error parsing JSON from localStorage key "${key}", falling back to default.`, error);
        return defaultValue;
    }
};


// --- SIMULATED DATABASE (with persistence) ---
let courses: Course[] = safelyParseJSON(COURSE_STORAGE_KEY, initialCourses);
let jobs: Job[] = safelyParseJSON(JOB_STORAGE_KEY, initialJobs);
let registeredUsers: (RegistrationData & { id: number })[] = safelyParseJSON(REGISTERED_USERS_STORAGE_KEY, allSeedUsers);


const persistCourses = () => localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(courses));
const persistJobs = () => localStorage.setItem(JOB_STORAGE_KEY, JSON.stringify(jobs));
const persistRegisteredUsers = () => localStorage.setItem(REGISTERED_USERS_STORAGE_KEY, JSON.stringify(registeredUsers));

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));


// --- API FUNCTIONS ---

export const getCourses = async (): Promise<Course[]> => {
    await simulateDelay(500);
    return [...courses];
};

export const getJobs = async (): Promise<Job[]> => {
    await simulateDelay(500);
    return [...jobs];
};

export const register = async (data: RegistrationData): Promise<User> => {
    await simulateDelay(500);
    const existingUser = registeredUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }

    const newUser = { ...data, id: Date.now() };
    registeredUsers.push(newUser);
    persistRegisteredUsers();

    const userToReturn: User = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarText: newUser.name.substring(0, 2).toUpperCase(),
        tagline: newUser.role === Role.Mentor ? 'New Mentor' : undefined,
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userToReturn));
    return userToReturn;
}

export const login = async (email: string, password: string): Promise<User> => {
    await simulateDelay(500);

    // Special case for admin user
    if (email.toLowerCase() === 'admin@skillsetu.io') {
        const adminUser: User = { name: 'Admin', email: 'admin@skillsetu.io', role: Role.Admin, avatarText: 'AD' };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(adminUser));
        return adminUser;
    }
    
    const user = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
        throw new Error('Invalid email or password.');
    }

    const userToReturn: User = {
        name: user.name,
        email: user.email,
        role: user.role,
        avatarText: user.name.substring(0, 2).toUpperCase(),
        tagline: user.role === Role.Mentor ? 'Mentor' : undefined,
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userToReturn));
    return userToReturn;
};

export const logout = async (): Promise<void> => {
    await simulateDelay(100);
    localStorage.removeItem(USER_STORAGE_KEY);
};

export const checkSession = async (): Promise<User | null> => {
    await simulateDelay(100);
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
};

export const generateCourse = async (prompt: string): Promise<Course> => {
    const courseData = await generateCourseWithAI(prompt);
    const newCourse: Course = {
        ...courseData,
        id: Date.now(),
        image: `https://picsum.photos/seed/${Date.now()}/600/300`
    };
    courses = [newCourse, ...courses];
    persistCourses();
    return newCourse;
};

export const generateJob = async (prompt: string): Promise<Job> => {
    const jobData = await generateJobWithAI(prompt);
    const newJob: Job = {
        ...jobData,
        id: Date.now()
    };
    jobs = [newJob, ...jobs];
    persistJobs();
    return newJob;
};