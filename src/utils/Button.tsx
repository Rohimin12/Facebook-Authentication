import React from "react";

interface ButtonInterface {
  text: string;
  bgColor: string;
  textColor: string;
  func?: () => void;
}

export const Button: React.FC<ButtonInterface> = (props) => {
  return (
    <button
      className="px-4 py-3 rounded-md text-base font-sans-serif font-bold hover:brightness-90"
      style={{ backgroundColor: props.bgColor, color: props.textColor }}
      onClick={props.func}>
      {props.text}
    </button>
  );
};

interface FullButtonInterface {
  content: string;
  bgColor: string;
  textColor: string;
  className?: string;
}

export const FullButton: React.FC<FullButtonInterface> = (props) => {
  return (
    <button
      className={`w-full font-sans-serif font-bold rounded-md drop-shadow-md ${props.className}`}
      style={{ backgroundColor: props.bgColor, color: props.textColor }}>
      {props.content}
    </button>
  );
};
