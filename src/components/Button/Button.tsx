import './Button.scss';
import {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'success';
type ButtonSize = 'small' | 'normal' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function Button(
    {
        variant = 'primary',
        size,
        disabled = false,
        children,
        onClick,
        className = '',
        ...props
    }: ButtonProps) {

    const variantClass = `button--${variant}`;
    const sizeClass = size ? `button--${size}` : '';

    return (
        <button
            className={`button ${variantClass} ${sizeClass} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}