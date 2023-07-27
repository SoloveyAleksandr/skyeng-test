import { IRepo, IUser, sort } from "../types";

export default function useGit() {
  const getUsers = async (name: string, sort: sort, page?: number) => {
    try {
      const url = `https://api.github.com/search/users?q=${name}&sort=repositories&order=${sort}${page ? "&page=" + page : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && !data.message) {
        return {
          totalCount: data.total_count > 1000 ? 998 : data.total_count,
          list: data.items as IUser[],
        }
      } else {
        data.message && window.confirm(data.message);
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserRepos = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && !data.message) {
        return data as IRepo[];
      } else {
        data.message && window.confirm(data.message);
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return {
    getUsers,
    getUserRepos,
  }
}
