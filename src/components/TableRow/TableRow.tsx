import React from "react";
import { ITableRow } from "../../utils/interface";
import { substringText } from "../../utils/helpers";
import style from "./TableRow.module.scss";
import Button from "../common/Button/Buttons";
import { Checkbox } from "../common/Form/Form";
import classNames from "classnames";
import { IconEdit, IconDelete, IconMore } from "../common/Icons/Icons";
import ActionsMenu from "../common/ActionsMenu/ActionsMenu";

interface TableRowProps {
  dataRow: ITableRow;
  checkboxChangeHandler(event: React.ChangeEvent): void;
  handlerActionsToggle(id: string): void;
}

const TableRow: React.FC<TableRowProps> = ({
  dataRow: {
    _id,
    name,
    description,
    rate,
    balance,
    deposit,
    isActive,
    isChecked,
    isAction,
  },
  checkboxChangeHandler,
  handlerActionsToggle
}) => {
  return (
    <tr className={classNames({ [`${style.active}`]: isChecked })}>
      <td className={style.checkbox}>
        <Checkbox
          checkboxID={_id}
          isChecked={isChecked}
          checkboxChangeHandler={checkboxChangeHandler}
        />
      </td>
      <td>
        <div className={style.name}>{name}</div>
        <div className={style.id}>{_id}</div>
      </td>
      <td className={style.description}>{substringText(description)}</td>
      <td>{rate}</td>
      <td>{balance}</td>
      <td>{deposit}</td>
      <td>
        <Button
          buttonText={isActive ? "Active" : "inactive"}
          buttonClass={{
            default: "action",
            modificator: isActive ? "actionActive" : "actionInactive"
          }}
        />
      </td>
      <td className={style.actions}>
        <div className={style.activeWrap}>
          <IconEdit />
          <IconDelete />
          <div onClick={handlerActionsToggle.bind(null, _id)}>
            <IconMore />
          </div>
          <ActionsMenu isAction={isAction} id={_id} handlerActionToggle={handlerActionsToggle} />
        </div>
      </td>
    </tr>
  );
};
export default TableRow;
