import React from "react";
import { Link } from "react-router-dom";

interface LinkTextInterface {
  text: string;
  location: string;
  className?: string;
}

const LinkText: React.FC<LinkTextInterface> = (props) => {
  return (
    <Link
      className={`font-sans-serif text-blue-500 text-sm m-2 block hover:underline ${
        props.className || ""
      }`}
      to={props.location}>
      {props.text}
    </Link>
  );
};

export default LinkText;
