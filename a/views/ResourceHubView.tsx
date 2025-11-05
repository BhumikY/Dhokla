import React from 'react';
import { skillResources } from '../data/skills';
import SkillCard from '../components/SkillCard';
import Icon from '../components/Icon';

const ResourceHubView: React.FC = () => {
    return (
        <div className="space-y-12 animate-fadeIn">
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Skill <span className="text-indigo-600">Resource Hub</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    A curated list of free, high-quality learning resources to help you master new skills and succeed in your freelance journey.
                </p>
            </div>

            {skillResources.map((category, index) => (
                <section key={index} id={category.category.toLowerCase().replace(/\s/g, '-')}>
                    <div className="flex items-center mb-6">
                         <Icon name="folder-open-outline" className="text-3xl text-indigo-500" />
                        <h2 className="text-3xl font-bold text-gray-900 ml-3">{category.category}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.skills.map((skill, skillIndex) => (
                            <SkillCard key={skillIndex} skill={skill} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ResourceHubView;
