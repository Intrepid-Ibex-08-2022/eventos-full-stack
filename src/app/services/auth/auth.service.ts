import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  async register(
    username: string,
    email: string,
    pswd: string,
  ): Promise<Observable<boolean | undefined>> {
    let resp: Observable<boolean | undefined>;
    let favorites: string[] = [];

    resp = await this.http
      .post<Users>(this.url, { username, email, pswd, favorites })
      .pipe(
        map((resp) => {
          let { _id } = resp;
          if (_id) {
            localStorage.setItem('token', _id);
            return true;
          }
          return;
        }),
        map((valid) => valid),
        catchError((error) => of(error.error.msg)),
      );

    return resp;
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

  async getUser(
    email: string,
    password: string,
  ): Promise<Observable<boolean | undefined>> {
    let resp: Observable<boolean | undefined>;

    resp = await this.http.get<any[]>(`${this.url}?email=${email}`).pipe(
      map((users) => {
        let user = users.find((res: { email: string }) => res.email == email);

        if (user) {
          let { _id, pswd } = user;
          if (pswd === password) {
            localStorage.setItem('token', _id);
            return true;
          }
          return;
        }

        return;
      }),
    );
    return resp;
  }

  async loginId(id: string): Promise<Observable<string | undefined>> {
    let resp: Observable<string | undefined>;

    resp = await this.http.get<any[]>(`${this.url}?_id=${id}`).pipe(
      map((users) => {
        let user = users.find((res: { _id: string }) => res._id == id);

        if (user) {
          console.log({ user });

          let { _id, username } = user;
          if (_id === id) {
            return username;
          }
          return;
        }

        return;
      }),
    );
    return resp;
  }
  async loginIdAndFavorites(
    id: string,
  ): Promise<Observable<Users | undefined>> {
    let resp: Observable<Users | undefined>;

    resp = await this.http.get<any[]>(`${this.url}?_id=${id}`).pipe(
      map((users) => {
        let user = users.find((res: { _id: string }) => res._id == id);

        if (user) {
          console.log({ user });

          let { _id, username } = user;
          if (_id === id) {
            return user;
          }
          return;
        }

        return;
      }),
    );
    return resp;
  }
}
