import React, { createContext, useState, ReactNode } from 'react';
import { User, Role, View, Course, Job } from '../types';

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
    login: (email: string, password: string) => void;
    logout: () => void;
    goBack: () => void;
    // FIX: Added `addCourse` and `addJob` to the context type. This makes them available
    // to components like ContentGeneratorView, resolving the "property does not exist" error.
    addCourse: (course: Omit<Course, 'id' | 'image'>) => void;
    addJob: (job: Omit<Job, 'id'>) => void;
}

// Enhanced courses with free YouTube materials and descriptions
const initialCourses: Course[] = [
    {
        id: 1,
        title: 'Full Stack Web Development',
        mentor: 'Prof. Rajesh Kumar',
        college: 'IIT Delhi',
        image: '💻',
        description: 'Master modern web development with React, Node.js, and databases. Build complete web applications from scratch.',
        modules: [
            'HTML/CSS Fundamentals',
            'JavaScript ES6+',
            'React.js',
            'Node.js & Express',
            'MongoDB',
            'RESTful APIs'
        ],
        language: 'English/Hindi',
        freeResources: [
            {
                title: 'Full Stack Development Tutorial',
                url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
                type: 'YouTube Course',
                duration: '8 hours'
            },
            {
                title: 'React Complete Course',
                url: 'https://www.youtube.com/watch?v=b9eMGE7QtTk',
                type: 'YouTube Tutorial',
                duration: '11 hours'
            },
            {
                title: 'Node.js Crash Course',
                url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
                type: 'YouTube Tutorial',
                duration: '1.5 hours'
            }
        ]
    },
    {
        id: 2,
        title: 'Graphic Design Masterclass',
        mentor: 'Dr. Priya Sharma',
        college: 'NID Ahmedabad',
        image: '🎨',
        description: 'Learn professional graphic design using industry-standard tools. Create stunning visuals for print and digital media.',
        modules: [
            'Design Fundamentals',
            'Color Theory',
            'Typography',
            'Adobe Photoshop',
            'Adobe Illustrator',
            'Brand Identity Design'
        ],
        language: 'English',
        freeResources: [
            {
                title: 'Graphic Design Full Course',
                url: 'https://www.youtube.com/watch?v=WONZVnlam6U',
                type: 'YouTube Course',
                duration: '5 hours'
            },
            {
                title: 'Photoshop for Beginners',
                url: 'https://www.youtube.com/watch?v=IyR_uYsRdPs',
                type: 'YouTube Tutorial',
                duration: '4 hours'
            },
            {
                title: 'Adobe Illustrator Complete Guide',
                url: 'https://www.youtube.com/watch?v=Ib8UBwu3yGA',
                type: 'YouTube Tutorial',
                duration: '2 hours'
            }
        ]
    },
    {
        id: 3,
        title: 'Digital Marketing Complete Course',
        mentor: 'Amit Verma',
        college: 'IIM Bangalore',
        image: '📱',
        description: 'Master digital marketing strategies including SEO, social media marketing, content marketing, and analytics.',
        modules: [
            'SEO Fundamentals',
            'Social Media Marketing',
            'Content Marketing',
            'Google Ads',
            'Email Marketing',
            'Analytics & Reporting'
        ],
        language: 'English/Hindi',
        freeResources: [
            {
                title: 'Digital Marketing Full Course',
                url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
                type: 'YouTube Course',
                duration: '12 hours'
            },
            {
                title: 'SEO Tutorial for Beginners',
                url: 'https://www.youtube.com/watch?v=SnxeXZpZkI0',
                type: 'YouTube Tutorial',
                duration: '2.5 hours'
            },
            {
                title: 'Social Media Marketing',
                url: 'https://www.youtube.com/watch?v=MJQTRbVtGHM',
                type: 'YouTube Tutorial',
                duration: '3 hours'
            }
        ]
    },
    {
        id: 4,
        title: 'Content Writing & Translation',
        mentor: 'Sneha Reddy',
        college: 'JNU Delhi',
        image: '✍️',
        description: 'Develop professional writing skills for blogs, copywriting, technical writing, and translation services.',
        modules: [
            'Writing Fundamentals',
            'SEO Content Writing',
            'Copywriting',
            'Technical Writing',
            'Translation Techniques',
            'Proofreading & Editing'
        ],
        language: 'English',
        freeResources: [
            {
                title: 'Content Writing Course',
                url: 'https://www.youtube.com/watch?v=uFxdLtQJUoc',
                type: 'YouTube Course',
                duration: '4 hours'
            },
            {
                title: 'Copywriting Masterclass',
                url: 'https://www.youtube.com/watch?v=JV-XALzVuGw',
                type: 'YouTube Tutorial',
                duration: '2 hours'
            },
            {
                title: 'SEO Writing Tutorial',
                url: 'https://www.youtube.com/watch?v=hSPmj7mK6ng',
                type: 'YouTube Tutorial',
                duration: '1 hour'
            }
        ]
    },
    {
        id: 5,
        title: 'Video Editing with Premiere Pro',
        mentor: 'Karan Singh',
        college: 'FTII Pune',
        image: '🎬',
        description: 'Master professional video editing techniques, color grading, motion graphics, and storytelling through editing.',
        modules: [
            'Video Editing Basics',
            'Adobe Premiere Pro',
            'Color Correction',
            'Audio Editing',
            'Motion Graphics',
            'Export & Optimization'
        ],
        language: 'English/Hindi',
        freeResources: [
            {
                title: 'Premiere Pro Complete Course',
                url: 'https://www.youtube.com/watch?v=Hls3Tp7JS8E',
                type: 'YouTube Course',
                duration: '6 hours'
            },
            {
                title: 'Video Editing Tutorial',
                url: 'https://www.youtube.com/watch?v=O6ERELse_QY',
                type: 'YouTube Tutorial',
                duration: '3 hours'
            },
            {
                title: 'Color Grading Tutorial',
                url: 'https://www.youtube.com/watch?v=RKmYYQLzVTg',
                type: 'YouTube Tutorial',
                duration: '1.5 hours'
            }
        ]
    },
    {
        id: 6,
        title: 'Python Programming & Software Development',
        mentor: 'Dr. Arun Patel',
        college: 'IISc Bangalore',
        image: '🐍',
        description: 'Learn Python programming from basics to advanced concepts. Build real-world applications and automation scripts.',
        modules: [
            'Python Basics',
            'Data Structures',
            'OOP Concepts',
            'Web Scraping',
            'API Development',
            'Testing & Debugging'
        ],
        language: 'English',
        freeResources: [
            {
                title: 'Python Full Course',
                url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
                type: 'YouTube Course',
                duration: '6 hours'
            },
            {
                title: 'Python for Beginners',
                url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
                type: 'YouTube Tutorial',
                duration: '4.5 hours'
            },
            {
                title: 'Python Projects',
                url: 'https://www.youtube.com/watch?v=8ext9G7xspg',
                type: 'YouTube Tutorial',
                duration: '12 hours'
            }
        ]
    },
    {
        id: 7,
        title: 'Architecture & Interior Design',
        mentor: 'Ar. Meera Joshi',
        college: 'CEPT University',
        image: '🏛️',
        description: 'Learn architectural design principles, space planning, 3D modeling with SketchUp and AutoCAD.',
        modules: [
            'Design Fundamentals',
            'Space Planning',
            'AutoCAD',
            'SketchUp',
            '3D Rendering',
            'Material Selection'
        ],
        language: 'English/Hindi',
        freeResources: [
            {
                title: 'Interior Design Complete Course',
                url: 'https://www.youtube.com/watch?v=bCQpHAolHKs',
                type: 'YouTube Course',
                duration: '8 hours'
            },
            {
                title: 'AutoCAD Tutorial',
                url: 'https://www.youtube.com/watch?v=9P4Z9QTtKvE',
                type: 'YouTube Tutorial',
                duration: '5 hours'
            },
            {
                title: 'SketchUp Basics',
                url: 'https://www.youtube.com/watch?v=4yJqXH6_x1g',
                type: 'YouTube Tutorial',
                duration: '3 hours'
            }
        ]
    },
    {
        id: 8,
        title: 'Music Production & Audio Engineering',
        mentor: 'Rahul Desai',
        college: 'SAE Institute',
        image: '🎵',
        description: 'Master music production, mixing, mastering, and audio engineering using professional DAWs.',
        modules: [
            'Music Theory Basics',
            'FL Studio / Ableton',
            'Mixing Techniques',
            'Mastering',
            'Sound Design',
            'Recording Techniques'
        ],
        language: 'English',
        freeResources: [
            {
                title: 'Music Production Course',
                url: 'https://www.youtube.com/watch?v=6T8aVlHqj-s',
                type: 'YouTube Course',
                duration: '10 hours'
            },
            {
                title: 'FL Studio Tutorial',
                url: 'https://www.youtube.com/watch?v=pDIsEZsalAo',
                type: 'YouTube Tutorial',
                duration: '6 hours'
            },
            {
                title: 'Mixing & Mastering Guide',
                url: 'https://www.youtube.com/watch?v=TEjOdqZFvhY',
                type: 'YouTube Tutorial',
                duration: '2 hours'
            }
        ]
    },
    {
        id: 9,
        title: 'Photography Masterclass',
        mentor: 'Vikram Malhotra',
        college: 'LPU Punjab',
        image: '📷',
        description: 'Learn professional photography techniques, lighting, composition, and photo editing with Lightroom.',
        modules: [
            'Camera Basics',
            'Composition Rules',
            'Lighting Techniques',
            'Portrait Photography',
            'Landscape Photography',
            'Photo Editing'
        ],
        language: 'English/Hindi',
        freeResources: [
            {
                title: 'Photography Complete Course',
                url: 'https://www.youtube.com/watch?v=LxO-6rlihSg',
                type: 'YouTube Course',
                duration: '7 hours'
            },
            {
                title: 'Photography for Beginners',
                url: 'https://www.youtube.com/watch?v=V7z7BAZdt2M',
                type: 'YouTube Tutorial',
                duration: '4 hours'
            },
            {
                title: 'Lightroom Tutorial',
                url: 'https://www.youtube.com/watch?v=9EHxqbh8Yao',
                type: 'YouTube Tutorial',
                duration: '2 hours'
            }
        ]
    },
    {
        id: 10,
        title: 'Video Animation & Motion Graphics',
        mentor: 'Ananya Kapoor',
        college: 'NID Bangalore',
        image: '🎞️',
        description: 'Create stunning animations and motion graphics using After Effects, Cinema 4D, and other industry tools.',
        modules: [
            'Animation Principles',
            'After Effects',
            'Cinema 4D Basics',
            '2D Animation',
            '3D Animation',
            'Motion Graphics'
        ],
        language: 'English',
        freeResources: [
            {
                title: 'After Effects Complete Course',
                url: 'https://www.youtube.com/watch?v=SgX0B-qYQMk',
                type: 'YouTube Course',
                duration: '8 hours'
            },
            {
                title: 'Motion Graphics Tutorial',
                url: 'https://www.youtube.com/watch?v=P2TwBEOxQzM',
                type: 'YouTube Tutorial',
                duration: '5 hours'
            },
            {
                title: 'Animation Basics',
                url: 'https://www.youtube.com/watch?v=uDqjIdI4bF4',
                type: 'YouTube Tutorial',
                duration: '3 hours'
            }
        ]
    },
    {
        id: 11,
        title: 'Book Design & Publishing',
        mentor: 'Sanjay Mehta',
        college: 'JNU Delhi',
        image: '📚',
        description: 'Learn professional book layout design, typography, cover design, and e-book formatting for publishing.',
        modules: [
            'Book Layout Design',
            'Typography for Print',
            'Cover Design',
            'InDesign Mastery',
            'E-book Formatting',
            'Self-Publishing'
        ],
        language: 'English',
        freeResources: [
            {
                title: 'InDesign for Book Design',
                url: 'https://www.youtube.com/watch?v=vv20_ZDcGnQ',
                type: 'YouTube Course',
                duration: '4 hours'
            },
            {
                title: 'Book Cover Design',
                url: 'https://www.youtube.com/watch?v=OC6LzK3k8MA',
                type: 'YouTube Tutorial',
                duration: '2 hours'
            },
            {
                title: 'Self-Publishing Guide',
                url: 'https://www.youtube.com/watch?v=zlnZjHQyVLU',
                type: 'YouTube Tutorial',
                duration: '1.5 hours'
            }
        ]
    },
    {
        id: 12,
        title: 'Content Creation for Social Media',
        mentor: 'Riya Gupta',
        college: 'Mumbai University',
        image: '📹',
        description: 'Master content creation for YouTube, Instagram, TikTok. Learn scripting, filming, editing, and audience growth.',
        modules: [
            'Content Strategy',
            'Scripting & Storyboarding',
            'Mobile Filming',
            'Quick Editing',
            'Thumbnail Design',
            'Platform Optimization'
        ],
        language: 'English/Hindi',
        freeResources: [
            {
                title: 'YouTube Content Creation',
                url: 'https://www.youtube.com/watch?v=yj33Ed-hXAs',
                type: 'YouTube Course',
                duration: '3 hours'
            },
            {
                title: 'Social Media Strategy',
                url: 'https://www.youtube.com/watch?v=qB5qC9QfHpA',
                type: 'YouTube Tutorial',
                duration: '2 hours'
            },
            {
                title: 'Content Creator Guide',
                url: 'https://www.youtube.com/watch?v=2CbDNjA3lDg',
                type: 'YouTube Tutorial',
                duration: '1.5 hours'
            }
        ]
    }
];

const initialJobs: Job[] = [
    {
        id: 1,
        title: 'E-commerce Website Development',
        client: 'ShopEasy Pvt Ltd',
        budget: '₹50,000',
        description: 'Build a complete e-commerce platform with payment integration.',
        skills: ['React', 'Node.js', 'MongoDB', 'Payment Gateway']
    },
    {
        id: 2,
        title: 'Brand Identity Design',
        client: 'StartupX',
        budget: '₹25,000',
        description: 'Create complete brand identity including logo, colors, and guidelines.',
        skills: ['Graphic Design', 'Illustrator', 'Brand Strategy']
    },
    {
        id: 3,
        title: 'Social Media Marketing Campaign',
        client: 'FitLife Gym',
        budget: '₹30,000/month',
        description: 'Manage social media accounts and run ad campaigns.',
        skills: ['Social Media', 'Content Creation', 'Facebook Ads']
    }
];

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentView, _setCurrentView] = useState<View>('home');
    const [previousView, setPreviousView] = useState<View>('home');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    // FIX: Converted `courses` and `jobs` to state variables using `useState`.
    // This is necessary so that new content generated by the AI can be added to the
    // arrays and trigger a re-render of the UI.
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [jobs, setJobs] = useState<Job[]>(initialJobs);

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

    const login = (email: string, password: string) => {
        // Mock login
        const mockUser: User = {
            name: email.split('@')[0],
            email: email,
            role: Role.Learner,
            avatarText: email.charAt(0).toUpperCase(),
            tagline: 'Learning new skills'
        };

        if (email.toLowerCase() === 'admin@skillsetu.io') {
            mockUser.role = Role.Admin;
            mockUser.name = "Admin"
            mockUser.avatarText = "AD";
        }
        
        setCurrentUser(mockUser);
        setShowLoginModal(false);
        setCurrentView(getDashboardViewForRole(mockUser.role));
    };

    const logout = () => {
        setCurrentUser(null);
        setCurrentView('home');
        setSelectedCourse(null);
        setSelectedJob(null);
    };

    // FIX: Implemented the `addCourse` function. It takes the data for a new course,
    // assigns a unique ID and a default image, and adds it to the `courses` state.
    const addCourse = (courseData: Omit<Course, 'id' | 'image'>) => {
        const newCourse: Course = {
            ...courseData,
            id: Date.now(),
            image: '🎓', // A default image/icon for generated courses
        };
        setCourses(prevCourses => [newCourse, ...prevCourses]);
    };

    // FIX: Implemented the `addJob` function. It takes the data for a new job,
    // assigns a unique ID, and adds it to the `jobs` state.
    const addJob = (jobData: Omit<Job, 'id'>) => {
        const newJob: Job = {
            ...jobData,
            id: Date.now(),
        };
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
                logout,
                goBack,
                // FIX: Provided the new `addCourse` and `addJob` functions through the context value.
                addCourse,
                addJob,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};