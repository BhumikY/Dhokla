import React from 'react';

// We need to declare the custom element type to TypeScript to make it available in JSX.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            // FIX: Corrected the TypeScript definition for the 'ion-icon' custom element.
            // Using `React.DetailedHTMLProps` is the recommended approach for typing custom elements
            // (web components) in React. It ensures standard HTML attributes like `className` are
            // correctly typed, resolving the JSX error.
            'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string }, HTMLElement>;
        }
    }
}

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    // For web components like <ion-icon>, it is standard practice in React to use the `className` prop,
    // which React correctly renders as a 'class' attribute in the DOM.
    return <ion-icon name={name} className={className}></ion-icon>;
};

export default Icon;
