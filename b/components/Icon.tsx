import React from 'react';

// FIX: Replaced the complex type definition for 'ion-icon' with a simpler one
// to ensure it's correctly recognized by TypeScript's JSX parser.
// The type definition was updated to be more robust and correctly typed, and React was imported at the top of the file.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                name: string;
            };
        }
    }
}

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    // For web components like <ion-icon>, it is standard practice in React to use the `className` prop,
    // which React correctly renders as a 'class' attribute in the DOM.
    return <ion-icon name={name} className={className}></ion-icon>;
};

export default Icon;