import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  type,
  placeholder,
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
