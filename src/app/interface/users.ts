export interface Users {
  find(): unknown;
  forEach(arg0: (element: any) => void): unknown;
  ok: boolean;
  _id?: string;
  username?: string;
  pswd?: string;
  token?: string;
  email?: string;
  errors?: Errors;
  favorites: string[];
}

export interface Errors {
  errors: Error[];
}
