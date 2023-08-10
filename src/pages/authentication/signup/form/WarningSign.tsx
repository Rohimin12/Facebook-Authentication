import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const WarningSign: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <FontAwesomeIcon
      icon={faCircleExclamation}
      size="1x"
      className="text-red-700 absolute top-3 right-3 focus-within:hidden peer-focus:hidden"
    />
  );
};

export default WarningSign;
