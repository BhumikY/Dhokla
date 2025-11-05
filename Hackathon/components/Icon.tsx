import React from 'react';

// Fix: Correctly type the <ion-icon> custom element. For web components in React, the 'class' attribute must be used for styles instead of 'className'. 
// The type is updated to allow 'class' and inherit other standard HTML attributes.
type IonIconProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    name: string;
    class?: string;
};

// We need to declare the custom element type to TypeScript
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': IonIconProps;
        }
    }
}

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    // Fix: Use the 'class' attribute for the web component. React does not translate the 'className' prop to a 'class' attribute for custom elements.
    // The component's 'className' prop is passed to the 'class' attribute.
    return <ion-icon name={name} class={className}></ion-icon>;
};

export default Icon;