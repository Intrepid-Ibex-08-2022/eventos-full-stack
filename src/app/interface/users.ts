export interface UsersResponse {
  ok?: boolean;
  token?: string;
  user: User;

}

export interface User {
  ok?: boolean;
  _id?: string;
  usr: string;
  pswd?: string;
  token?: string;
  email?: string;
  errors?: Errors;
  favorites: string[];
  iat: number;
}
export interface Errors {
  errors: Error[];
}
