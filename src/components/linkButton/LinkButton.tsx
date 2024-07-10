import React from 'react';
import Link from 'next/link';

interface LinkButtonProps {
    href: string;
    className?: string;
    children: React.ReactNode;
    bgColor?: string; // Prop opcional para cor de fundo
    textColor?: string; // Prop opcional para cor do texto
}

export const LinkButton: React.FC<LinkButtonProps> = ({
    href,
    className = '',
    children,
    bgColor, // Valor padrão para cor de fundo
    textColor // Valor padrão para cor do texto
}) => {
    return (
        <Link href={href} passHref>
            <button className={`ml-2 p-2 bg-${bgColor}-500 ${textColor} hover:bg-${bgColor}-700 ${className}`}>
                {children}
            </button>
        </Link>
    );
};