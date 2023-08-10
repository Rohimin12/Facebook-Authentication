import { forwardRef, InputHTMLAttributes, useRef } from "react";

import { Tooltip } from "react-tooltip";
import WarningSign from "./WarningSign";

interface InputElProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  inputType?: "text" | "password";
  error: boolean;
  tooltip: { id: string; content: string; place: "left" | "bottom" };
}

const InputField = forwardRef<HTMLInputElement, InputElProps>(
  ({ placeholder, type, error, tooltip, ...inputProps }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          {...inputProps}
          ref={ref}
          data-tooltip-id={tooltip.id}
          data-tooltip-offset={10}
          className={`peer w-full bg-gray-100 border-gray-300 rounded-md mb-3  ${
            error && "border-red-600"
          }`}
          placeholder={placeholder}
        />
        <WarningSign isActive={error} />
        {error && (
          <Tooltip
            id={tooltip.id}
            openOnClick={true}
            className="!opacity-100 !py-3 !rounded-md !bg-[#be4b49] shadow-default border border-gray-300 !z-20 !max-w-[20rem]"
            place={tooltip.place}
            closeOnResize={true}
            positionStrategy="absolute">
            {tooltip.content}
          </Tooltip>
        )}
      </div>
    );
  }
);

export default InputField;
