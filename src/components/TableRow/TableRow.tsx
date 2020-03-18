import React from "react";
import { ITableRow } from "../../utils/interface";
import { substringText } from "../../utils/helpers";
import style from "./TableRow.module.scss";
import Button from "../common/Button/Buttons";
import { Checkbox } from "../common/Form/Form";

interface TableRowProps {
  dataRow: ITableRow;
  checkboxChangeHandler(event: React.ChangeEvent): void;
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
    isChecked
  },
  checkboxChangeHandler
}) => {
  return (
    <tr className={isChecked ? style.active : ''}>
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
      <td>...</td>
    </tr>
  );
};
export default TableRow;
