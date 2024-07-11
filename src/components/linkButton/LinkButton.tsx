import React from 'react';
import Link from 'next/link';

interface LinkButtonProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
    href,
    className = '',
    children,
}) => {
    return (
        <Link href={href} passHref>
            <button className={`${className}`}>
                {children}
            </button>
        </Link>
    );
};