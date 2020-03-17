import React from "react";
import style from "./Form.module.scss";

interface CheckboxProps {
  checkboxID: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checkboxID }) => {
  return (
    <div className={style.checkbox}>
      <input type="checkbox" id={checkboxID} />
      <label htmlFor={checkboxID} />
    </div>
  );
};
