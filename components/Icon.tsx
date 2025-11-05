import React from 'react';

// We need to declare the custom element type to TypeScript to make it available in JSX.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            // FIX: Corrected the TypeScript definition for the 'ion-icon' custom element.
            // By extending React.DetailedHTMLProps, we ensure that standard props like `className`
            // are available, and we add the custom `name` prop required by ion-icon. This
            // resolves the JSX error.
            'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { name: string };
        }
    }
}

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    // For web components like <ion-icon>, it is standard practice in React to use the `className` prop,
    // which React correctly renders as a 'class' attribute in the DOM.
    return <ion-icon name={name} className={className}></ion-icon>;
};

export default Icon;
