
import React, { useEffect, useRef } from 'react';
import Icon from './Icon';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity">
            <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div className="flex justify-between items-center">
                    <h2 id="modal-title" className="text-2xl font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close modal">
                        <Icon name="close-outline" className="h-7 w-7" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
