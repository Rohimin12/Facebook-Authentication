import React, { ReactNode } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormValuesType } from "./Form";
import { Tooltip } from "react-tooltip";
import PopupTooltip from "components/PopupTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export const DAYS_IN_A_MONTH = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export const MONTHS_IN_A_YEAR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const START_YEAR = new Date().getFullYear();
const END_YEAR = 1905;

export const YEARS_ARRAY = Array.from(
  { length: START_YEAR - END_YEAR + 1 },
  (_, index) => START_YEAR - index
);

interface SelectFieldProps {
  control: Control<FormValuesType>;
  errors: FieldErrors<FormValuesType>;
}

const DateOfBirth: React.FC<SelectFieldProps> = ({ control, errors }) => {
  const CURRENT_DATE = new Date().getDate();
  const CURRENT_MONTH = `0${new Date().getMonth() + 1}`;
  const CURRENT_YEAR = new Date().getFullYear();

  const SelectController: React.FC<{
    name: "day" | "month" | "year";
    children: ReactNode;
    defaultValue: number | string;
  }> = ({ name, children, defaultValue }) => {
    return (
      <Controller
        name={`dateOfBirth.${name}`}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <select
            {...field}
            data-tooltip-id="dateOfBirth"
            data-tooltip-offset={10}
            title={name.toUpperCase()}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full px-2.5 ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}>
            {children}
          </select>
        )}
      />
    );
  };

  return (
    <div className="mb-2 relative">
      <div className="flex justify-between items-center">
        <label className="text-sm text-gray-600 ml-1 mb-1 inline-block">
          Date of birth
          <button className="ml-1" type="button">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              data-tooltip-id="date-of-birth"
              data-tooltip-offset={50}
            />
            <PopupTooltip id="date-of-birth">
              <div>
                <b>Providing your birthday</b> helps make sure that you get the
                right Facebook experience for your age. If you want to change
                who sees this, go to the About section of your profile. For more
                details, please visit our{" "}
                <a
                  href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0"
                  target="_blank"
                  className="text-blue-500 hover:underline cursor-pointer">
                  Privacy Policy
                </a>
                .
              </div>
            </PopupTooltip>
          </button>
        </label>
        {errors?.dateOfBirth && (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            size="1x"
            className="text-red-700 mr-3"
          />
        )}
      </div>

      <div className="flex gap-2">
        <SelectController name="day" defaultValue={CURRENT_DATE}>
          {DAYS_IN_A_MONTH.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </SelectController>
        <SelectController name="month" defaultValue={CURRENT_MONTH}>
          {MONTHS_IN_A_YEAR.map((month, idx) => (
            <option key={month} value={idx + 1 > 9 ? idx + 1 : `0${idx + 1}`}>
              {month}
            </option>
          ))}
        </SelectController>
        <SelectController name="year" defaultValue={CURRENT_YEAR}>
          {YEARS_ARRAY.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </SelectController>
      </div>
    </div>
  );
};

export default DateOfBirth;
