import React from 'react';
import { Skill } from '../types';
import Icon from './Icon';

interface SkillCardProps {
    skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900">{skill.name}</h3>
                <p className="text-gray-600 mt-2 text-sm flex-grow">{skill.description}</p>
                <div className="mt-auto pt-6">
                    <a 
                        href={skill.youtubeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Icon name="logo-youtube" />
                        Watch on YouTube
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SkillCard;
