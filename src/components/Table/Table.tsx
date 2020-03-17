import React, { useEffect, useState } from "react";
import style from "./Table.module.scss";
import TableRow from "../TableRow/TableRow";
import { ITableRow } from "../../utils/interface";
import {Checkbox} from "../common/Form/Form";
const axios = require("axios");

const Table: React.FC = () => {
  const [items, setItems] = useState<ITableRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://next.json-generator.com/api/json/get/N1qL6Kdru"
      );
      setItems([...result.data]);
    };
    fetchData();
  }, []);

  return (
    <div className={style.root}>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th scope="col" className={style.checkbox}><Checkbox checkboxID={'all'}/></th>
            <th scope="col" className={style.name}>name</th>
            <th scope="col" className={style.description}>description</th>
            <th scope="col">Rate</th>
            <th scope="col">balance</th>
            <th scope="col">Deposit</th>
            <th scope="col">Status</th>
            <th scope="col" className={style.action}>...</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {items.map(item => (
              <TableRow key={item._id} dataRow={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
