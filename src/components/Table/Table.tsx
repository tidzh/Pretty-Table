import React, { useEffect, useState } from "react";
import style from "./Table.module.scss";
import TableRow from "../TableRow/TableRow";
import { Checkbox } from "../common/Form/Form";

const axios = require("axios");

interface ITableRow {
  _id: string;
  isActive: boolean;
  isChecked: boolean;
  name: string;
  rate: number;
  balance: string;
  deposit: string;
  description: string;
}

const Table: React.FC = () => {
  const [dataTable, setItems] = useState<ITableRow[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://next.json-generator.com/api/json/get/N1qL6Kdru"
      );
      const newData = result.data.map((item: ITableRow) => {
        return { ...item, isChecked: checkAll };
      });
      setItems(newData);
    };
    fetchData();
  }, [checkAll]);

  const checkboxChangeHandler = (event: React.ChangeEvent) => {
    if (event.target.id === "allCheckbox") {
      setCheckAll(!checkAll);
      const newData = dataTable.map((item: any) => {
        return { ...item, isChecked: !checkAll };
      });
      setItems(newData);
    } else {
      const newData = dataTable.map(item => {
        if (item._id === event.target.id) {
          return { ...item, isChecked: !item.isChecked };
        } else {
          return item;
        }
      });
      setItems(newData);
    }
  };

  return (
    <div className={style.root}>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th scope="col" className={style.checkbox}>
              <Checkbox
                checkboxID="allCheckbox"
                isChecked={checkAll}
                checkboxChangeHandler={checkboxChangeHandler}
              />
            </th>
            <th scope="col" className={style.name}>
              name
            </th>
            <th scope="col" className={style.description}>
              description
            </th>
            <th scope="col">Rate</th>
            <th scope="col">balance</th>
            <th scope="col">Deposit</th>
            <th scope="col">Status</th>
            <th scope="col" className={style.action}>
              ...
            </th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {dataTable.map(item => (
            <TableRow
              key={item._id}
              dataRow={item}
              checkboxChangeHandler={checkboxChangeHandler}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
