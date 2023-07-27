import React, { FC } from 'react';

import styles from './InputBtn.module.scss';

interface IInputBtn {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  placeholder?: string;
  icon?: React.ReactNode;
};

const InputBtn: FC<IInputBtn> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
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
        {icon}
      </button>
    </form>
  );
}

export default InputBtn;
