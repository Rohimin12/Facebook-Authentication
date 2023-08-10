import {
  faCircleExclamation,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopupTooltip from "components/PopupTooltip";
import { Controller, Control, FieldErrors } from "react-hook-form";
import React from "react";
import RadioButton from "./RadioButton";
import { FormValuesType } from "../Form";

interface GenderInterface {
  control: Control<FormValuesType>;
  errors?: FieldErrors<FormValuesType>;
}

const Gender: React.FC<GenderInterface> = ({ control, errors }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label className="text-sm text-gray-600 ml-1 mb-1 relative">
          Gender
          <button className="ml-1" type="button">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              data-tooltip-id="gender"
              data-tooltip-offset={50}
            />
            <PopupTooltip id="gender">
              <p>
                You can change who sees your gender on your profile later.
                Select Custom to choose another gender, or if you'd rather not
                say.
              </p>
            </PopupTooltip>
          </button>
        </label>
        {errors?.gender && (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            size="1x"
            className="text-red-700 focus-within:hidden peer-focus:hidden mr-3"
          />
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-2">
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <>
              <RadioButton
                field={field}
                value="female"
                isError={errors?.gender ? true : false}
              />
              <RadioButton
                field={field}
                value="male"
                isError={errors?.gender ? true : false}
              />
              <RadioButton
                field={field}
                value="other"
                isError={errors?.gender ? true : false}
              />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default Gender;
