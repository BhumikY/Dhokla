/// <reference types="react" />
import React from 'react';

// Due to React's handling of web components, we need a way to pass props.
// We'll use a type that allows any string as a key.
type IonIconProps = {
    name: string;
    class?: string;
    [key: string]: any;
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
    return <ion-icon name={name} class={className}></ion-icon>;
};

export default Icon;
