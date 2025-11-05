import { GoogleGenAI, Type } from "@google/genai";
// FIX: Changed import to use .tsx extension to resolve module loading error.
import { Course, Job } from '../types/index.tsx';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set. AI features will not work.");
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable not set. Authentication will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const courseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A catchy and descriptive title for the course." },
        mentor: { type: Type.STRING, description: "A realistic Indian name for the mentor." },
        college: { type: Type.STRING, description: "A well-known Indian college and a social group (e.g., 'NSS, IIT Delhi')." },
        description: { type: Type.STRING, description: "A brief, one-paragraph description of the course, aimed at beginners." },
        modules: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 5-6 concise module titles for the course."
        },
        language: { type: Type.STRING, description: "The primary language of instruction (e.g., 'English', 'Hindi')." },
    },
    required: ["title", "mentor", "college", "description", "modules", "language"],
};

const jobSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A clear and concise title for the freelance job." },
        client: { type: Type.STRING, description: "A plausible name for a client (can be an individual or a small business)." },
        budget: { type: Type.STRING, description: "The budget for the job, in Indian Rupees (₹), with a payment term (e.g., '₹1,500 / project', '₹5,000 (One-time)')." },
        description: { type: Type.STRING, description: "A short, one-paragraph description of the job requirements." },
        skills: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-4 essential skills required for the job."
        },
    },
    required: ["title", "client", "budget", "description", "skills"],
};

export const generateCourse = async (prompt: string): Promise<Omit<Course, 'id' | 'image'>> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the following request, generate a single course object that fits the platform's model. The platform, SkillSetu, helps people in semi-rural India learn skills from college student mentors. Keep the course topics practical and entry-level. Prompt: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: courseSchema,
        },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
};

export const generateJob = async (prompt: string): Promise<Omit<Job, 'id'>> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the following request, generate a single freelance job object. The jobs on this platform are aimed at newly-skilled freelancers from semi-rural India. Keep the job scope small and the budget realistic for entry-level work. Prompt: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: jobSchema,
        },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
};