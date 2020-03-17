import React from "react";
import { ITableRow } from "../../utils/interface";
import { substringText } from "../../utils/helpers";
import style from "./TableRow.module.scss";
import Button from "../common/Button/Buttons";
import { Checkbox } from "../common/Form/Form";

interface TableRowProps {
  dataRow: ITableRow;
}

const TableRow: React.FC<TableRowProps> = ({
  dataRow: { _id, name, description, rate, balance, deposit, isActive }
}) => {
  return (
    <tr>
      <td className={style.checkbox}>
        <Checkbox checkboxID={_id} />
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
