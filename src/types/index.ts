export type sort = "desc" | "asc";

export interface IUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  repos_list?: IRepo[];
}

export interface IRepo {
  id: number;
  name: string;
  html_url: string;
}
