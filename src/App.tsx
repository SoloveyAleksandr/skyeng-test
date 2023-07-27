import styles from "./App.module.scss";

import React, { useEffect, useState } from 'react';
import InputBtn from "./components/InputBtn/InputBtn";
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import useGit from "./git";
import { IUser, sort } from "./types";
import UserInfo from "./components/UserInfo/UserInfo";
import Pagination from "./components/Pagination/Pagination";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const { getUsers, getUserRepos } = useGit();

  const [loadind, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<sort>("desc");
  const [userName, setUserName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IUser[]>([]);

  useEffect(() => {
    return () => {
      search();
    }
    // eslint-disable-next-line
  }, [page, sort]);

  async function search() {
    try {
      setLoading(true);
      if (userName.trim() !== "") {
        const data = await getUsers(userName, sort, page);
        if (data) {
          setSearchResult(data.list);
          setTotalPages(Math.ceil(data.totalCount / 30));
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function getReposList(user: IUser) {
    try {
      const list = await getUserRepos(user.repos_url);
      if (list) {
        user.repos_list = list;
        const newResult = searchResult.map(el => {
          if (el.id === user.id) {
            return user;
          } else {
            return el;
          }
        });
        setSearchResult(newResult);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function sortHandler() {
    if (sort === "desc") {
      setSort("asc");
    } else {
      setSort("desc");
    }
  }

  return (
    <div className="App">
      {
        loadind && <Spinner />
      }

      <div className={styles.container}>
        <InputBtn
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Имя пользователя"
          icon={<AiOutlineSearch />}
          onSubmit={search}
        />

        {
          searchResult.length > 0 &&
          <>
            <div className={styles.result}>
              <button type="button"
                className={styles.sortBtn}
                onClick={sortHandler}>
                {
                  sort === "desc" ?
                    <AiOutlineSortAscending />
                    :
                    <AiOutlineSortDescending />
                }
              </button>
              {
                searchResult.map(user => (
                  <UserInfo key={user.id}
                    user={user}
                    handleClick={getReposList} />
                ))
              }
            </div>
            <div className={styles.pagination}>
              {
                totalPages > 1 &&
                <Pagination
                  current={page}
                  total={totalPages}
                  changePage={setPage} />
              }
            </div>
          </>
        }

      </div>
    </div>
  );
}

export default App;
