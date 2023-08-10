import React from "react";
import FacebookLogo from "../../../../assets/facebook.svg";

// max-w-[34.25rem]

// -mb-2 mx-auto md:-ml-8

//  lg:text-[1.9rem]  lg:leading-9 text-center md:text-start

const Greeting: React.FC = () => {
  return (
    <div className="mb-10 md:mt-10">
      <img
        src={FacebookLogo}
        alt="facebook logo"
        className="w-72 lg:w-80 mx-auto -mb-3 md:-ml-8"
      />
      <h2 className="max-w-[25rem] lg:max-w-none text-[1.5rem] lg:text-[1.8rem] text-primary leading-8 text-center md:text-start">
        Facebook helps you connect and share with the people in your life.
      </h2>
    </div>
  );
};

export default Greeting;
