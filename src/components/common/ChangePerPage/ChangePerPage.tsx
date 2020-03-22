import React from "react";
import style from "../ChangePerPage/ChangePerPage.module.scss";

interface ChangePerPageProps {
  handlerChangePerPage(event: React.FormEvent<HTMLSelectElement>): void;
}

const ChangePerPage: React.FC<ChangePerPageProps> = ({
  handlerChangePerPage
}) => {
  return (
    <select onChange={handlerChangePerPage} className={style.selectPerPage}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
    </select>
  );
};
export default ChangePerPage;
