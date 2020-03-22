import React from "react";

export interface RowData {
  _id: string;
  status: string;
  isAction: boolean;
  isChecked: boolean;
  name: string;
  rate: number;
  balance: string;
  deposit: string;
  currency: string;
  description: string;
}
export interface TableRowProps {
  dataRow: RowData;
  checkboxChangeHandler(event: React.ChangeEvent): void;
  handlerActionsToggle(id: string): void;
  handlerDeleteItem(id: string): void;
}
export interface ITableDataProps {
  data: RowData[];
  dataCloneForSearch: RowData[];
  checkAll: boolean;
  isFetching: boolean;
  sortDirection: boolean;
  perPage: number;
  currentPage: number;
  prevPage: number;
}
export interface ActionsMenuProps {
  isAction: boolean;
  id: string;
  handlerActionToggle(id: string): void;
}
export interface ButtonProps {
  buttonText: string;
  buttonClass: {
    default: string;
    modificator: string;
  };
}
export interface ChangePerPageProps {
  handlerChangePerPage(event: React.FormEvent<HTMLSelectElement>): void;
}
export interface CheckboxProps {
  checkboxID: string;
  isChecked?: boolean;
  checkboxChangeHandler: (event: React.ChangeEvent) => void;
}
export interface SearchProps {
  searchValue: string;
  handlerSearch(event: React.ChangeEvent): void;
}
