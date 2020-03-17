import React from "react";
import style from "./Button.module.scss";
import classNames from "classnames/bind";

interface Button {
  buttonText: string;
  buttonClass: {
    default: string;
    modificator: string;
  };
}

const Button: React.FC<Button> = ({ buttonText, buttonClass }) => {
  console.log(buttonClass.default);
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
