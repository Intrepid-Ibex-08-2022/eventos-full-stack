export interface UsersResponse {
  ok?: boolean;
  token?: string;
  user: User;

}

export interface User {
  fav?: string[];
  ok?: boolean;
  _id?: string;
  username: string;
  pswd?: string;
  token?: string;
  email: string;
  errors?: Errors;
  favorites: string[];
  rol: String;

  iat: number;
}
export interface Errors {
  errors: Error[];
}
