import { MouseEvent } from "react";
// import styles from "./Paginator.module.css";
import { clsx } from "clsx";

interface IPaginatorProps {
  currentPage: number;
  handlePageClick: (e: MouseEvent<HTMLButtonElement>) => void;
  pageCount: number;
}

const styles = {
  button:
    "w-8 h-8 inline-block bg-gray-100 hover:bg-gray-300 hover:border-gray-400 hover:cursor-pointer  border border-gray-300 ",
  selected: "bg-gray-200",
};

export default function Paginator({
  currentPage,
  handlePageClick,
  pageCount,
}: IPaginatorProps) {
  const buttonList = [...Array(pageCount).keys()].map((i) => {
    const isSelected = currentPage === i;
    return (
      <button
        key={i}
        id={i.toString()}
        className={clsx(styles.button, isSelected ? styles.selected : "")}
        onClick={handlePageClick}
      >
        {i + 1}
      </button>
    );
  });

  return (
    <div>
      <button
        className={styles.button}
        onClick={handlePageClick}
        key={"<"}
        id="prev"
      >
        {"<"}
      </button>
      {buttonList}
      <button
        className={styles.button}
        onClick={handlePageClick}
        key={">"}
        id="next"
      >
        {">"}
      </button>
    </div>
  );
}
