// FIX: Changed import to use .tsx extension to resolve module loading error.
import { Course, Job, User, Role, RegistrationData, DbUser } from '../types/index.tsx';
import bcrypt from 'bcryptjs';

// --- INITIAL SEED DATA ---
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
    id: seedMentor.id, name: seedMentor.name, email: seedMentor.email, role: seedMentor.role, avatarText: 'SP', tagline: 'SSG, BHU Varanasi'
};
const teamUsers: User[] = seedLearners.map(l => ({
    id: l.id, name: l.name, email: l.email, role: l.role, avatarText: l.name.substring(0, 2).toUpperCase()
}));

const initialCourses: Course[] = [
    { id: 1, title: "Video Editing for YouTube", mentor: "Riya G.", college: "SSG, St. Xavier's", image: "https://picsum.photos/seed/video/600/300", description: "Learn to edit engaging vlogs and videos for YouTube using mobile and desktop tools.", modules: ["Intro", "Cutting", "Text & Music", "Color", "Exporting"], language: "English" },
    { id: 2, title: "Basic Web Development", mentor: "Aarav S.", college: "NSS, IIT Delhi", image: "https://picsum.photos/seed/webdev/600/300", description: "Build your first website from scratch.", modules: ["HTML", "CSS", "Flexbox", "JavaScript", "Portfolio"], language: "English" },
    { id: 3, title: "Graphic Design (Hindi)", mentor: "Suraj P.", college: "SSG, BHU Varanasi", image: "https://picsum.photos/seed/design/600/300", description: "सोशल मीडिया के लिए सुंदर पोस्टर और बैनर बनाना सीखें।", modules: ["Principles", "Canva", "Color", "Social Media", "Poster"], language: "Hindi" }
];

const initialJobs: Job[] = [
    { id: 1, title: "Edit Weekly YouTube Vlog", client: "TechVlogger", budget: "₹1,500 / vlog", description: "Need a skilled video editor for my 15-min weekly vlogs.", skills: ["Video Editing", "Color Grading", "Premiere Pro"] },
    { id: 2, title: "Logo Design for Local Shop (Hindi)", client: "Sharma Sweets", budget: "₹800 (One-time)", description: "हमें अपनी मिठाई की दुकान के लिए एक नए, सुंदर लोगो की आवश्यकता है।", skills: ["Graphic Design", "Logo Design", "Canva"], assignment: { supervisor: supervisorUser, team: teamUsers } },
];

// --- IN-MEMORY DATABASE ---
export let courses: Course[] = [...initialCourses];
export let jobs: Job[] = [...initialJobs];
export let users: DbUser[] = [];

// Seed users with hashed passwords
export const seedInitialData = async () => {
    if(users.length === 0) { // Only seed if empty
        for (const user of allSeedUsers) {
            const passwordHash = await bcrypt.hash(user.password, 10);
            users.push({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                passwordHash,
            });
        }
        console.log("Seeded initial users.");
    }
};

// Seeding is now called from server.ts to prevent race conditions