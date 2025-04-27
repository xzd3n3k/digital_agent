import React, { ReactNode } from 'react';
import './Dialog.scss';

interface DialogProps {
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
    children: ReactNode;
    size?: 'small' | 'medium' | 'large';
    showSeparator?: boolean;
    customHeader?: ReactNode;
    className?: string;
    customCloseBtn?: ReactNode;
}

export default function Dialog({
                                   isOpen,
                                   onClose,
                                   title,
                                   children,
                                   size = 'medium',
                                   showSeparator = true,
                                   customHeader,
                                   className = '',
                                   customCloseBtn,
                               }: DialogProps) {
    if (!isOpen) return null;

    const sizeClasses = {
        small: 'dialog-small',
        medium: 'dialog-medium',
        large: 'dialog-large'
    };

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div
                className={`dialog-container ${sizeClasses[size]} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {!customHeader && (
                    <div className={`dialog-header ${showSeparator ? 'dialog-header--show-separator' : ''}`}>
                        {title && <h2 className="dialog-title">{title}</h2>}
                        {!customCloseBtn && (
                            <button className="dialog-close-button" onClick={onClose}>
                                &times;
                            </button>
                        )}
                        {customCloseBtn && (
                            <div onClick={onClose}>
                                {customCloseBtn}
                            </div>
                        )}
                    </div>
                )}
                {customHeader && (
                    customHeader
                )}
                <div className="dialog-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
