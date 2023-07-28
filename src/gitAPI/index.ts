import { IRepo, IUser, IUserInfo, sort } from "../types";

export default function useGit() {
  const getUsers = async (name: string, sort: sort, page?: number) => {
    try {
      const url = `https://api.github.com/search/users?q=${name}&sort=repositories&order=${sort}${page ? "&page=" + page : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && res.status === 200) {
        return {
          totalCount: data.total_count > 1000 ? 998 : data.total_count,
          list: data.items as IUser[],
        }
      } else {
        data.message && window.alert(data.message);
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
      if (data && res.status === 200) {
        return data as IRepo[];
      } else {
        data.message && window.alert(data.message);
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getUserInfo = async (user: IUser) => {
    try {
      const res = await fetch(`https://api.github.com/users/${user.login}`);
      const data = await res.json();
      if (data && res.status === 200) {
        return data as IUserInfo;
      } else {
        data.message && window.alert(data.message);
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return {
    getUsers,
    getUserRepos,
    getUserInfo,
  }
}
