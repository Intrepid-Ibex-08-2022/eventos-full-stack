import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import axios from 'axios';
import { catchError, map, of, Observable } from 'rxjs';
import { Users } from '../../interface/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AsyncValidator {
  url = 'https://intrepit-ibex.herokuapp.com/api/users';

  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private http: HttpClient) {}

  register(username: string, email: string, pswd: string) {

    return this.http
      .post<Users>(this.url, { username, email, pswd})
      .pipe(
        map((resp) => {

          let {_id} = resp

          if(_id){
            localStorage.setItem('token', _id);
          }


        }),
        map((valid) => valid),
        catchError((error) => of(error.error.msg)),
      );
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

  async getUser(email: string, password: string): Promise<Observable<boolean | undefined>> {
    let resp: Observable< boolean | undefined>;

    resp = await this.http.get<any[]>(`${this.url}?email=${email}`)
      .pipe(
        map((users) => {
          let user = users.find( (res: { email: string; }) => res.email == email);

          if(user){
            let {_id, pswd} = user
            if(pswd === password){
              localStorage.setItem('token', _id);
              return true
            }
            return;
          }

          return;
        })
      );
    return resp

  }
}
