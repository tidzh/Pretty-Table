import React from "react";
import style from "../ActionsMenu/ActionsMenu.module.scss";
import { IconClose } from "../Icons/Icons";
import classNames from "classnames";

interface ActionsMenu {
  isAction: boolean;
  id: string;
  handlerActionToggle(id: string): void;
}

const ActionsMenu: React.FC<ActionsMenu> = ({
  isAction,
  id,
  handlerActionToggle
}) => {
  return (
    <div
      className={classNames(style.root, { [`${style.rootActive}`]: isAction })}
    >
      <button
        className={style.close}
        onClick={handlerActionToggle.bind(null, id)}
      >
        <IconClose />
      </button>
      <ul className={style.list}>
        <li className={style.listItem}>View</li>
        <li className={style.listItem}>Status</li>
        <li className={style.listItem}>Print</li>
      </ul>
    </div>
  );
};
export default ActionsMenu;
