import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, of, Observable } from 'rxjs';
import { Users } from '../../interface/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AsyncValidator {
  url = 'https://intrepit-ibex.herokuapp.com/api/users';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private _token: string | undefined;

  constructor(private http: HttpClient) {}

  get token():string{
    return this._token!;
  }

  register(username: string, email: string, pswd: string):Observable<boolean | undefined> {
    let resp: Observable< boolean | undefined>;
    let favorites: string[] = []

    resp = this.http
      .post<Users>(this.url, { username, email, pswd, favorites })
      .pipe(
        map((resp) => {

          let { token } = resp;
          if (token) {
            localStorage.setItem('token', token);
            this._token = token
            return true;
          }
          return;


        }),
        map((valid) => valid),
        catchError((error) => of(error.error.msg))
      );

    return resp;
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.http.get<any[]>(`${this.url}?q=${email}`).pipe(
      //delay(3000),
      map((resp) => {
        let respDB = resp.find( correo => correo.email == email)
        return respDB !== undefined ? { emailTomado: true } : null ;
      }),
    );
  }

  getUser(email: string, password: string): Observable<boolean | undefined> {
    let resp: Observable< boolean | undefined>;

    resp = this.http.get<any[]>(`${this.url}?email=${email}`)
      .pipe(
        map((users) => {
          let user = users.find((res: { email: string; }) => res.email == email);

          if (user) {
            let { _id, pswd } = user;
            if (pswd === password) {
              localStorage.setItem('token', _id);
              this._token = _id;
              return true;
            }
            return;
          }

          return;
        })
      );
    return resp

  }

  getUserById(_token: string): Observable<Users | undefined> {
    let resp: Observable< Users | undefined>;

    resp = this.http.get<any[]>(`${this.url}?_id=${_token}`)
      .pipe(
        map((users) => {
          let user = users.find((res: { token: string; }) => res.token == _token);

          if (user) {
            let { token } = user;
            if (token === _token) {
              this._token = token;
              return user;
            }
            return;
          }

          return;
        })
      );
    return resp

  }

  validateLogued(_token: string): Observable<boolean> {
    let resp: Observable< boolean>;

    resp = this.http.get<any[]>(`${this.url}?_id=${_token}`)
      .pipe(
        map((users) => {
          let user = users.find((res: { token: string; }) => res.token == _token);

          if (user) {
            let { token } = user;
            if (token === _token) {
              this._token = token;
              return true;
            }
            return false;
          }

          return false;
        })
      );
    return resp
  }
}
