import React from "react";
import style from "./Form.module.scss";

interface CheckboxProps {
  checkboxID: string;
  isChecked?: boolean;
  checkboxChangeHandler: (event: React.ChangeEvent) => void;
}

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
