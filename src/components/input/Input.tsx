import React, {useEffect, useRef} from "react";

interface InputProps {
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    className?: string,
    textColor?: string,
    type?: string,
    borderColor?: string,
    onEnterPress?: () => void,
    id?: string,
    name?: string
}

export const Input: React.FC<InputProps> = ({
                                                value,
                                                onChange,
                                                placeholder,
                                                className,
                                                textColor,
                                                type,
                                                borderColor,
                                                onEnterPress,
                                                id,
                                                name
                                            }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnterPress) {
            onEnterPress();
        }
    };

    return (
        <input
            ref={inputRef}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className={`p-2 border border-${borderColor}-300 rounded-lg text-${textColor}-900 ${className}`}
            onKeyDown={handleKeyDown}
        />
    );
};