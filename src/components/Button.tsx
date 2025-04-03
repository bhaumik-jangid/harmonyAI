import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
