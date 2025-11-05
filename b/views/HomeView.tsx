
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import Icon from '../components/Icon';

const HomeView: React.FC = () => {
    const { courses, setShowLoginModal } = useContext(AppContext);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="space-y-16 animate-fadeIn">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 rounded-lg shadow-md">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                            <Icon name="sparkles-outline" />
                            AI-Powered Learning Platform
                        </div>
                        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-gray-900">
                            Welcome to{" "}
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                SkillSetu
                            </span>
                        </h1>
                        <p className="mb-8 text-xl text-gray-600">
                            Connect learners with mentors and opportunities. Build skills, share knowledge, and grow together.
                        </p>
                        <button onClick={() => scrollTo('about')} className="text-lg px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                            Get Started Today
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-10">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-6 text-center text-4xl font-bold text-gray-900">Our Initiative</h2>
                        <p className="mb-12 text-center text-lg text-gray-600">
                            We bridge the gap between skilled youth seeking opportunities and organizations needing affordable digital talent. Through our platform, we train, vet, and connect talented individuals to real projects, breaking the "no experience, no income" cycle and empowering anyone to earn based on proven skills, not just degrees.
                        </p>
                        
                        <div className="grid gap-6 md:grid-cols-3 mb-12">
                            <div className="text-center bg-white p-6 rounded-lg shadow-md">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                    <Icon name="locate-outline" className="text-2xl text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
                                <p className="mt-2 text-gray-600">
                                    Empower individuals with industry-relevant skills through personalized, AI-driven learning paths that adapt to each learner's pace and goals.
                                </p>
                            </div>

                            <div className="text-center bg-white p-6 rounded-lg shadow-md">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                    <Icon name="bulb-outline" className="text-2xl text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                                <p className="mt-2 text-gray-600">
                                    Create a global ecosystem where knowledge flows seamlessly between learners, mentors, and industry, fostering continuous growth and innovation.
                                </p>
                            </div>

                            <div className="text-center bg-white p-6 rounded-lg shadow-md">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                    <Icon name="heart-outline" className="text-2xl text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
                                <p className="mt-2 text-gray-600">
                                    We believe in accessible education, collaborative learning, and real-world impact. Every connection made here changes lives.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <button onClick={() => scrollTo('choose-path')} className="text-lg px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                                Join Our Community
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="py-10">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Exciting Courses</h2>
                        <p className="text-lg text-gray-600">
                            Industry-aligned programs designed by experts, powered by AI personalization.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
                        {courses.slice(0, 3).map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    <div className="text-center">
                        <button onClick={() => setShowLoginModal(true)} className="font-medium text-indigo-600 hover:text-indigo-500">
                            View All Courses &rarr;
                        </button>
                    </div>
                </div>
            </section>

            {/* Choose Path Section */}
            <section id="choose-path" className="py-10">
                <div className="container mx-auto px-4">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Choose Your Path</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="group rounded-lg border border-gray-200 bg-white p-8 text-center transition-all hover:shadow-lg hover:border-indigo-300">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition-transform group-hover:scale-110">
                                <Icon name="school-outline" className="text-4xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">For Learners</h3>
                            <p className="mb-4 text-gray-600">
                                Access courses, connect with mentors, and accelerate your learning journey.
                            </p>
                            <button onClick={() => setShowLoginModal(true)} className="font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md transition-colors">
                                Start Learning
                            </button>
                        </div>

                        <div className="group rounded-lg border border-gray-200 bg-white p-8 text-center transition-all hover:shadow-lg hover:border-indigo-300">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition-transform group-hover:scale-110">
                                <Icon name="people-outline" className="text-4xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">For Mentors</h3>
                            <p className="mb-4 text-gray-600">
                                Share your expertise, guide learners, and make an impact in their careers.
                            </p>
                            <button onClick={() => setShowLoginModal(true)} className="font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md transition-colors">
                                Become a Mentor
                            </button>
                        </div>

                        <div className="group rounded-lg border border-gray-200 bg-white p-8 text-center transition-all hover:shadow-lg hover:border-indigo-300">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition-transform group-hover:scale-110">
                                <Icon name="business-outline" className="text-4xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">For Clients</h3>
                            <p className="mb-4 text-gray-600">
                                Find skilled talent, post opportunities, and build your dream team.
                            </p>
                            <button onClick={() => setShowLoginModal(true)} className="font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md transition-colors">
                                Hire Talent
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeView;
