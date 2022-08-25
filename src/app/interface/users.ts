
export interface Users {
  ok: boolean;
  uid?: string;
  name?: string;
  token?: string;
  email?: string;
  errors?: Errors;
}

export interface Errors {
  errors: Error[];
}
