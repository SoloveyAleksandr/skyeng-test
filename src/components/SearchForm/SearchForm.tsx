import React, { FC } from 'react';

import styles from './SearchForm.module.scss';

interface ISearchForm {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  placeholder?: string;
  icon?: React.ReactNode;
};

const SearchForm: FC<ISearchForm> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Текст",
  icon,
}) => {

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className={styles.container} onSubmit={(e) => submit(e)}>
      <input type="text" placeholder={placeholder} className={styles.input} onChange={onChange} value={value} />
      <button type="button" className={styles.btn} onClick={onSubmit}>
        {icon ?? icon}
      </button>
    </form>
  );
}

export default SearchForm;
