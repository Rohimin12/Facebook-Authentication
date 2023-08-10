import React from "react";
import { Tooltip } from "react-tooltip";

const PopupTooltip: React.FC<{
  children: React.ReactNode;
  id: string;
}> = ({ children, id }) => {
  return (
    <Tooltip
      id={id}
      openOnClick={true}
      className="popupTooltip"
      place="left"
      positionStrategy="absolute"
      noArrow={true}
      clickable>
      {children}
    </Tooltip>
  );
};

export default PopupTooltip;
