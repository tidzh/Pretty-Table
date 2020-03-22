import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Table.module.scss";
import TableRow from "../TableRow/TableRow";
import { Checkbox } from "../common/Form/Form";
import {
  IconAdd,
  IconMore,
  IconPrev,
  IconSort,
  IconNext
} from "../common/Icons/Icons";
import Search from "../common/Search/Search";
import { RowData } from "../../utils/interface";
import orderBy from "lodash/orderBy";
import { quantityPage, countActiveCustomers } from "../../utils/helpers";
import { perPage } from "../../constants";
import ChangePerPage from "../common/ChangePerPage/ChangePerPage";

interface ITableData {
  data: RowData[];
  dataCloneForSearch: RowData[];
  checkAll: boolean;
  isFetching: boolean;
  sortDirection: boolean;
  perPage: number;
  currentPage: number;
  prevPage: number;
}

const Table: React.FC = () => {
  const [dataTable, setDataTable] = useState<ITableData>({
    data: [],
    dataCloneForSearch: [],
    checkAll: false,
    isFetching: false,
    sortDirection: true,
    currentPage: 1,
    prevPage: 0,
    perPage: perPage
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios(
        "https://next.json-generator.com/api/json/get/N1qL6Kdru"
      );
      const newData = response.data.map((item: ITableData) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    let sortResult;
    if (sortID === "name") {
      sortResult = orderBy(dataTable.data, "name", [sortDirection]);
    } else {
      sortResult = orderBy(dataTable.data, result => result.status, "asc");
    }
    setDataTable({
      ...dataTable,
      data: [...sortResult],
      sortDirection: !dataTable.sortDirection
    });
  };
  const handlerPagination = (event: React.MouseEvent<HTMLElement>) => {
    const pagDirection = event.currentTarget.id;
    if (dataTable.currentPage !== 1 && pagDirection === "prev-page") {
      setDataTable({
        ...dataTable,
        currentPage: dataTable.currentPage - 1,
        prevPage: dataTable.prevPage - 1
      });
    }
    if (
      dataTable.currentPage * dataTable.perPage <= dataTable.data.length &&
      pagDirection === "next-page"
    ) {
      setDataTable({
        ...dataTable,
        currentPage: dataTable.currentPage + 1,
        prevPage: dataTable.prevPage + 1
      });
    }
  };
  const handlerChangePerPage = (event: React.FormEvent<HTMLSelectElement>) => {
    const perPage = event.currentTarget.value;
    setDataTable({
      ...dataTable,
      perPage: Number(perPage)
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
              <span id="status" className={style.sort} onClick={handlerSort}>
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
          {dataTable.data
            .slice(
              dataTable.prevPage * dataTable.perPage,
              dataTable.currentPage * dataTable.perPage
            )
            .map(item => (
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
      <div className={style.footer}>
        <div>
          <span className="uppercase">active customers: </span>
          <b>{countActiveCustomers(dataTable.data)}</b>/{dataTable.data.length}
        </div>
        <div className={style.navigation}>
          <div className={style.perPage}>
            <span>Rows per page:</span>
            <ChangePerPage handlerChangePerPage={handlerChangePerPage} />
          </div>
          <div className={style.quantity}>
            {quantityPage(
              dataTable.currentPage,
              dataTable.data.length,
              dataTable.perPage
            )}
          </div>
          <div className={style.pagination}>
            <div
              id="prev-page"
              onClick={handlerPagination}
              className={style.prevPage}
            >
              <IconPrev />
            </div>
            <div id="next-page" onClick={handlerPagination}>
              <IconNext />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
