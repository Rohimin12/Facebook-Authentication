import React from "react";

interface LineInterface {
  color: string;
}

const Line: React.FC<LineInterface> = (props) => {
  return (
    <hr
      className="w-full h-[1px] border-none my-5"
      style={{ backgroundColor: props.color }}></hr>
  );
};

export default Line;
