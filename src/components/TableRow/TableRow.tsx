import React from "react";
import { RowData } from "../../utils/interface";
import { substringText } from "../../utils/helpers";
import style from "./TableRow.module.scss";
import Button from "../common/Button/Buttons";
import { Checkbox } from "../common/Form/Form";
import classNames from "classnames";
import { IconEdit, IconDelete, IconMore } from "../common/Icons/Icons";
import ActionsMenu from "../common/ActionsMenu/ActionsMenu";

interface TableRowProps {
  dataRow: RowData;
  checkboxChangeHandler(event: React.ChangeEvent): void;
  handlerActionsToggle(id: string): void;
  handlerDeleteItem(id: string): void;
}

const TableRow: React.FC<TableRowProps> = ({
  dataRow: {
    _id,
    name,
    description,
    rate,
    balance,
    deposit,
    currency,
    status,
    isChecked,
    isAction
  },
  checkboxChangeHandler,
  handlerActionsToggle,
  handlerDeleteItem
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
      <td>
        <div className={style.profit}>
          <div className={style.value}>{rate}</div>
          <div className={style.currency}>{currency}</div>
        </div>
      </td>
      <td>
        <div className={style.profit}>
          <div className={style.value}>{balance}</div>
          <div className={style.currency}>{currency}</div>
        </div>
      </td>
      <td>
        <div className={style.profit}>
          <div className={style.value}>{deposit} </div>
          <div className={style.currency}>{currency}</div>
        </div>
      </td>
      <td>
        <Button
          buttonText={status}
          buttonClass={{
            default: "btn",
            modificator: status.toLowerCase()
          }}
        />
      </td>
      <td className={style.actions}>
        <div className={style.activeWrap}>
          <IconEdit />
          <div onClick={handlerDeleteItem.bind(null, _id)}>
            <IconDelete />
          </div>
          <div onClick={handlerActionsToggle.bind(null, _id)}>
            <IconMore />
          </div>
          <ActionsMenu
            isAction={isAction}
            id={_id}
            handlerActionToggle={handlerActionsToggle}
          />
        </div>
      </td>
    </tr>
  );
};
export default TableRow;
