import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, of, Observable, ConnectableObservable } from 'rxjs';
import { Rol } from 'src/app/interface/rols';
import { User, UsersResponse } from '../../interface/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AsyncValidator {
  url = 'https://api-canary-events.netlify.app/users';
  urlEvents = 'https://api-canary-events.netlify.app/events';
  urlRols = 'https://api-canary-events.netlify.app/roles';

  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private _token: string | undefined;

  constructor(private http: HttpClient) {}

  get token(): string {
    return this._token!;
  }

  register(username: string, email: string, pswd: string): Observable<UsersResponse | undefined> {
    let resp: Observable<UsersResponse | undefined>;
    let favorites: string[] = [];

    resp = this.http
      .post<UsersResponse>(this.url, { username, email, pswd, favorites })
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
        catchError((error) => of(error.error.msg))
      );
      return resp;
  }

  updateUserFavorites(idEvent: string, _token: string): any {

    let cabecera = new HttpHeaders().append('authorization', `authorization ${_token}`);
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
    return this.http.get<any[]>(`${this.url}?email=${email}`).pipe(
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
        map((response) => {
          this._token = response.token;
          if (this._token) {
            localStorage.setItem('token', this._token);
            return response;
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

  getAllUsers(token: string): Observable<User[] | undefined> {
    let resp: Observable<User[] | undefined>;
    let cabecera = new HttpHeaders().append('Authorization', `Authorization ${token}`);

    resp = this.http
      .get<User[]>(`${this.url}`, { headers: cabecera })
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

  getAllRols(token: string): Observable<Rol[] | undefined> {
    let resp: Observable<Rol[] | undefined>;
    let cabecera = new HttpHeaders().append('Authorization', `Authorization ${token}`);

    resp = this.http
      .get<Rol[]>(`${this.urlRols}`, { headers: cabecera })
      .pipe(
        map((roles) => {
          if (roles) {
            return roles;
          }
          return;
        })
      );
    return resp;
  }

  getOneRol(id: string, token: string): Observable<Rol | undefined> {
    let rol: Observable<Rol | undefined>;
    let cabecera = new HttpHeaders().append('authorization', `Basic ${token}`);

    rol = this.http.get<Rol>(`${this.urlRols}/rol?rol=${id}`, { headers: cabecera })
    .pipe(
      map((resp) => {
        return resp;
      }),
    );
    return rol;
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

  updateUserRol(email: String, rol: String, _token: string): any {
    let resp = new Observable<{} | undefined>();
    let user = {"email": email,"rol": rol }
    let cabecera = new HttpHeaders().append('authorization', `authorization ${_token}`);

    return this.http
      .put(`${this.url}/putUser`, user, {headers: cabecera})
      .pipe(
        map((resp) => {
          if (resp) {
            return resp;
          }
          return;
        })
      );
  }




}
