import React from "react";
import style from "./Form.module.scss";
import { CheckboxProps } from "../../../utils/interface";

export const Checkbox: React.FC<CheckboxProps> = ({
  checkboxID,
  isChecked,
  checkboxChangeHandler
}) => {
  return (
    <div className={style.checkbox}>
      <input
        type="checkbox"
        id={checkboxID}
        checked={isChecked}
        onChange={checkboxChangeHandler}
      />
      <label htmlFor={checkboxID} />
    </div>
  );
};
