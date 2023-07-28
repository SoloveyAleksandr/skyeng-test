export type sort = "desc" | "asc";

export interface IUser extends IUserInfo {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  repos_list?: IRepo[];
}

export interface IUserInfo {
  public_repos?: number;
  created_at?: string;
}

export interface IRepo {
  id: number;
  name: string;
  html_url: string;
}
