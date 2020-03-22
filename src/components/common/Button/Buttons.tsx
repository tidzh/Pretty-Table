import React from "react";
import style from "./Button.module.scss";
import classNames from "classnames";
import { ButtonProps } from "../../../utils/interface";

const Button: React.FC<ButtonProps> = ({ buttonText, buttonClass }) => {
  return (
    <button
      className={classNames(
        style[buttonClass.default],
        style[buttonClass.modificator]
      )}
    >
      {buttonText}
    </button>
  );
};
export default Button;
