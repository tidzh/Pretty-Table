import React, { useEffect, useState } from "react";
import style from "./Table.module.scss";
import TableRow from "../TableRow/TableRow";
import { Checkbox } from "../common/Form/Form";
import { IconAdd, IconMore, IconSort } from "../common/Icons/Icons";
import Search from "../common/Search/Search";
import { RowData } from "../../utils/interface";
import orderBy from "lodash/orderBy";

const axios = require("axios");

interface ITableData {
  data: RowData[];
  dataCloneForSearch: RowData[];
  checkAll: boolean;
  isFetching: boolean;
  sortDirection: boolean;
}

const Table: React.FC = () => {
  const [dataTable, setDataTable] = useState<ITableData>({
    data: [],
    dataCloneForSearch: [],
    checkAll: false,
    isFetching: false,
    sortDirection: true
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://next.json-generator.com/api/json/get/N1qL6Kdru"
      );
      const newData = result.data.map((item: ITableData) => {
        return {
          ...item,
          isChecked: dataTable.checkAll,
          isAction: false
        };
      });
      setDataTable({
        ...dataTable,
        data: [...newData],
        dataCloneForSearch: [...newData],
        isFetching: true
      });
    };
    fetchData();
  }, [dataTable.checkAll]);

  const handlerCheckboxChange = (event: React.ChangeEvent) => {
    if (event.target.id === "allCheckbox") {
      setDataTable({ ...dataTable, checkAll: !dataTable.checkAll });
      const newData = dataTable.data.map((item: RowData) => {
        return {
          ...item,
          isChecked: !dataTable.checkAll
        };
      });
      setDataTable({
        ...dataTable,
        data: [...newData],
        checkAll: !dataTable.checkAll
      });
    } else {
      const newData = dataTable.data.map(item => {
        if (item._id === event.target.id) {
          return {
            ...item,
            isChecked: !item.isChecked
          };
        } else {
          return item;
        }
      });
      setDataTable({ ...dataTable, data: [...newData] });
    }
  };
  const handlerActionsToggle = (id: string) => {
    const newData = dataTable.data.map(item => {
      if (item._id === id) {
        return {
          ...item,
          isAction: !item.isAction
        };
      } else {
        return item;
      }
    });
    setDataTable({ ...dataTable, data: [...newData] });
  };
  const handlerDeleteItem = (id: string) => {
    const newData = dataTable.data.filter(item => item._id !== id);
    setDataTable({ ...dataTable, data: [...newData] });
  };
  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setDataTable({ ...dataTable, dataCloneForSearch: [...dataTable.data] });
    if (search.length >= 2) {
      const newData = dataTable.dataCloneForSearch.filter(
        item => item.name.toLowerCase().search(search.toLowerCase()) !== -1
      );
      setDataTable({ ...dataTable, data: [...newData] });
    } else {
      setDataTable({ ...dataTable, data: [...dataTable.dataCloneForSearch] });
    }
  };
  const handlerSort = (event: React.MouseEvent<HTMLElement>) => {
    const sortID = event.currentTarget.id;
    const sortDirection = dataTable.sortDirection ? "asc" : "desc";
    const sortResult = orderBy(dataTable.data, sortID, [sortDirection]);
    setDataTable({
      ...dataTable,
      data: [...sortResult],
      sortDirection: !dataTable.sortDirection
    });
  };

  if (!dataTable.isFetching) return null;
  return (
    <div className={style.root}>
      <div className={style.header}>
        <Search handlerSearch={handlerSearch} searchValue={search} />
        <button className={style.add}>
          <IconAdd />
          Add Customer
        </button>
      </div>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th scope="col" className={style.checkbox}>
              <Checkbox
                checkboxID="allCheckbox"
                isChecked={dataTable.checkAll}
                checkboxChangeHandler={handlerCheckboxChange}
              />
            </th>
            <th scope="col" className={style.name}>
              Name
              <span id="name" className={style.sort} onClick={handlerSort}>
                <IconSort />
              </span>
            </th>
            <th scope="col" className={style.description}>
              description
            </th>
            <th scope="col" className={style.rate}>
              Rate
            </th>
            <th scope="col" className={style.balance}>
              Balance
            </th>
            <th scope="col">Deposit</th>
            <th scope="col">
              Status
              <span className={style.sort}>
                <IconSort />
              </span>
            </th>
            <th scope="col" className={style.actions}>
              <IconMore />
            </th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {dataTable.data.length === 0 && (
            <tr>
              <td colSpan={8}>
                <div className={style.notFound}>Пользователи не найдены</div>
              </td>
            </tr>
          )}
          {dataTable.data.map(item => (
            <TableRow
              key={item._id}
              dataRow={item}
              handlerActionsToggle={handlerActionsToggle}
              checkboxChangeHandler={handlerCheckboxChange}
              handlerDeleteItem={handlerDeleteItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
