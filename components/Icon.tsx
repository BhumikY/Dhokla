import React from 'react';

// We need to declare the custom element type to TypeScript to make it available in JSX.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            // Fix: Use a simpler and more standard type definition for the 'ion-icon' custom element.
            'ion-icon': React.HTMLAttributes<HTMLElement> & {
                name: string;
                class?: string;
            };
        }
    }
}

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    // For web components like <ion-icon>, it's sometimes necessary to use 'class' directly
    // instead of React's 'className' prop for styling.
    return <ion-icon name={name} class={className}></ion-icon>;
};

export default Icon;