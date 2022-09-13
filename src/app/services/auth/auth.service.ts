import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, of, Observable, ConnectableObservable } from 'rxjs';
import { Users } from '../../interface/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AsyncValidator {
  url = 'https://intrepit-ibex.herokuapp.com/api/users';
  urlEvents = 'https://intrepit-ibex.herokuapp.com/api/events';
  // url = 'http://localhost:4000/api/users';
  // urlEvents = 'http://localhost:4000/api/events';
  // urlPrueba = 'http://localhost:4000/api/users';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private _token: string | undefined;

  constructor(private http: HttpClient) {}

  get token(): string {
    return this._token!;
  }

  register(
    username: string,
    email: string,
    pswd: string,
  ): Observable<boolean | undefined> {
    let resp: Observable<boolean | undefined>;
    let favorites: string[] = [];

    resp = this.http
      .post<Users>(this.url, { username, email, pswd, favorites })
      .pipe(
        map((resp) => {
          let { token } = resp;
          if (token) {
            localStorage.setItem('token', token);
            this._token = token;
            return true;
          }
          return;
        }),
        map((valid) => valid),
        catchError((error) => of(error.error.msg)),
      );

    return resp;
  }

  updateUserFavorites(idEvent: string, _token: string): any {
    let cabecera = new HttpHeaders().append('authorization', `Basic ${_token}`);
    return this.http
      .post(`${this.urlEvents}/event/${idEvent}/preferred`, null, {
        headers: cabecera,
      })
      .toPromise() as Promise<Users>;
  }
  deleteUserFavorites(idEvent: string, _token: string): any {
    let cabecera = new HttpHeaders().append('authorization', `Basic ${_token}`);
    return this.http
      .delete(`${this.urlEvents}/event/${idEvent}/preferred`, {
        headers: cabecera,
      })
      .toPromise() as Promise<Users>;
  }

  // updateUser(user: Users): Observable<boolean | undefined> {
  //   let resp: Observable<boolean | undefined>;
  //   resp = this.http.put<Users>(this.url, { username, email, pswd, favorites });
  //   return resp;
  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.http.get<any[]>(`${this.url}?q=${email}`).pipe(
      //delay(3000),
      map((resp) => {
        let respDB = resp.find((correo) => correo.email == email);
        return respDB !== undefined ? { emailTomado: true } : null;
      }),
    );
  }

  login(email: string, password: string): Observable<boolean | undefined> {
    let resp: Observable<boolean | undefined>;

    resp = this.http
      .post<any>(`${this.url}/login?email=${email}&pswd=${password}`, {})
      .pipe(
        map((user) => {
          this._token = user.token;
          if (this._token) {
            localStorage.setItem('token', this._token);
            return true;
          }

          return;
        }),
      );
    return resp;
  }

  getUserByToken(_token: string): Observable<string | boolean> {
    let resp: Observable<string | boolean>;
    let cabecera = new HttpHeaders().append('authorization', `Basic ${_token}`);

    resp = this.http
      .post<any>(`${this.url}/auth`, null, { headers: cabecera })
      .pipe(
        map((resp) => {
          if (resp) {
            let { user } = resp;
            return user;
          }
          return false;
        }),
      );
    return resp;
  }

  getUserByEmail(email: string): Observable<string | undefined> {
    let resp: Observable<string | undefined>;

    resp = this.http.get<any>(`${this.url}/${email}`).pipe(
      map((user) => {
        if (user) {
          let { username } = user;
          return username;
        }

        return;
      }),
    );
    return resp;
  }

  async loginIdAndFavorites(
    email: string,
  ): Promise<Observable<Users | undefined>> {
    let resp: Observable<Users | undefined>;

    resp = await this.http.get<any>(`${this.url}/${email}`).pipe(
      map((user) => {
        if (user) {
          return user;
        }

        return;
      }),
    );
    return resp;
  }
}
