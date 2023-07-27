import React, { FC, useEffect, useState } from 'react';

import styles from './Pagination.module.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface IPagination {
  current: number;
  total: number;
  changePage: (page: number) => void;
};

const Pagination: FC<IPagination> = ({
  current,
  total,
  changePage,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(updatePagination, [current, total]);

  function updatePagination() {
    const newPages: number[] = [];
    for (let i = 0; i < 5; i++) {
      if (current > 2 && current + 2 < total) {
        newPages.push(current - 2 + i);
      } else if (current + 2 >= total) {
        newPages.push(total - 4 + i);
      } else {
        newPages.push(i + 1);
      }
    }
    setPages(newPages);
  }

  return (
    <div className={styles.container}>
      <button type="button" className={[styles.btn, current === 1 ? styles._disable : ""].join(" ")}
        onClick={() => changePage(current - 1)}>
        <AiOutlineArrowLeft />
      </button>
      {
        current > 5 &&
        (
          <>
            <button type="button"
              className={styles.page}
              onClick={() => changePage(1)}>{1}</button>
            <span className={styles.page}>...</span>
          </>
        )
      }
      {
        pages.map(i => (
          <button key={i} type="button"
            className={[styles.page, i === current ? styles._active : ""].join(" ")}
            onClick={() => changePage(i)}>{i}</button>
        ))
      }
      {
        total > 5 && current + 2 < total &&
        (
          <>
            <span className={styles.page}>...</span>
            <button type="button"
              className={styles.page}
              onClick={() => changePage(total)}>{total}</button>
          </>
        )
      }
      <button type="button" className={[styles.btn, current === total ? styles._disable : ""].join(" ")}
        onClick={() => changePage(current + 1)}>
        <AiOutlineArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
