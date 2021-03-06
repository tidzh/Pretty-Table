import { descriptionText } from "../constants";
import { RowData } from "./interface";

export const substringText = (text: string) => {
  if (text.length > descriptionText) {
    return `${text.substring(0, descriptionText)}...`;
  }
};
export const quantityPage = (
  currentPage: number,
  total: number,
  perPage: number
) => {
  return `${currentPage === 1 ? 1 : (currentPage - 1) * perPage + 1}-${
    currentPage * perPage > total ? total : currentPage * perPage
  } of ${total}`;
};
export const countActiveCustomers = (objectData: RowData[]) => {
  return objectData.filter((item: RowData) => item.status === "Active").length;
};
