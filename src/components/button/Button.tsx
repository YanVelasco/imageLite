interface ButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    children: React.ReactNode;
    className?: string;
    bgColor: string; // Torna obrigatório
    textColor: string; // Torna obrigatório
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className, bgColor, textColor, type }) => {
    return (
        <button onClick={onClick} type={type} className={`ml-2 p-2 bg-${bgColor}-500 ${textColor} hover:bg-${bgColor}-700 ${className}`}>
            {children}
        </button>
    );
};