import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, of, Observable, ConnectableObservable } from 'rxjs';
import { UsersResponse } from '../../interface/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AsyncValidator {
  url = 'https://api-canary-events.netlify.app/users';
  urlEvents = 'https://api-canary-events.netlify.app/events';

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
      .post<UsersResponse>(this.url, { username, email, pswd, favorites })
      .pipe(
        map((resp) => {
          let { token} = resp.user;
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
      });
  }

  deleteUserFavorites(idEvent: string, _token: string): any {
    let cabecera = new HttpHeaders().append('authorization', `Basic ${_token}`);
    return this.http
      .delete(`${this.urlEvents}/event/${idEvent}/preferred`, {
        headers: cabecera,
      });
  }

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

  login(email: string, pswd: string): Observable<UsersResponse | undefined> {
    let resp: Observable<UsersResponse | undefined>;
    let body = { email, pswd }

    resp = this.http
      .post<UsersResponse>(`${this.url}/login`, body)
      .pipe(
        map((resp) => {
          console.log(resp)
          this._token = resp.token;
          console.log(resp)
          if (this._token) {
            localStorage.setItem('token', this._token);
            return resp;
          }
          return;
        }),
      );
    return resp;
  }

  getUserByToken(token: string): Observable<UsersResponse | undefined> {
    let resp: Observable<UsersResponse | undefined>;
    let cabecera = new HttpHeaders().append('authorization', `Basic ${token}`);

    resp = this.http
      .post<UsersResponse>(`${this.url}/auth`, null, { headers: cabecera })
      .pipe(
        map((users) => {
          if (users) {
            return users;
          }
          return;
        })
      );
    return resp;
  }

  loginIdAndFavorites(token: string): Observable<any | undefined> {

    let resp: Observable<any| undefined>;

    let cabecera = new HttpHeaders().append('authorization', `Basic ${token}`);
    resp = this.http.get<any>(`${this.urlEvents}/view/preferred`, {headers: cabecera}).pipe(
      map((user) => {
        if (user) {
          return user;;
        }
        return;
      }),
    );
    return resp;
  }
}
