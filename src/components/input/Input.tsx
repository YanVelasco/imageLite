import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  type: string;
  borderColor: string;
  textColor: string;
  onEnterPress?: () => void; // Added onEnterPress prop
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
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-2 border border-${borderColor}-300 rounded-lg text-${textColor}-900 ${className}`}
      onKeyDown={handleKeyDown} // Correctly apply the onKeyDown event handler
    />
  );
};