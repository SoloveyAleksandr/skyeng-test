import styles from './UserInfo.module.scss';

import React, { FC, useState } from 'react';
import { AiOutlineArrowDown } from "react-icons/ai";
import { IUser } from "../../types";

interface IUserInfo {
  user: IUser,
  handleClick: (user: IUser) => void;
};

const UserInfo: FC<IUserInfo> = ({
  user,
  handleClick,
}) => {

  const [open, setOpen] = useState<boolean>(false);

  function clickHandler() {
    if (!user.repos_list) {
      handleClick(user);
    }
    setOpen(!open);
  }

  return (
    <div className={[styles.container, open ? styles._open : ""].join(" ")}>
      <div className={styles.head}>
        <div className={styles.inner}>
          <div className={styles.img}>
            <img src={user.avatar_url} alt="user" />
          </div>
          <a href={user.html_url} target="_blank" rel="noreferrer" className={styles.login}>{user.login}</a>
        </div>
        <button type="button" className={styles.btn} onClick={clickHandler}>
          <AiOutlineArrowDown />
        </button>
      </div>
      <div className={styles.drop}>
        <div className={styles.info}>
          {
            user.repos_list ?
              <>
                <h4 className={styles.infoTile}>Репозитории пользователя: {user.repos_list ? user.repos_list.length : 0}</h4>
                {
                  user.repos_list.map(repo => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                  ))
                }
              </>
              :
              <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
