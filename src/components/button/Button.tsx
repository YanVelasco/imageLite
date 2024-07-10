interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    bgColor: string; // Torna obrigatório
    textColor: string; // Torna obrigatório
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className, bgColor, textColor }) => {
    return (
        <button onClick={onClick} className={`ml-2 p-2 bg-${bgColor}-500 ${textColor} hover:bg-${bgColor}-700 ${className}`}>
            {children}
        </button>
    );
};