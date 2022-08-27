import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { Users } from '../../interface/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AsyncValidator {
  url                  : string = 'http://localhost:3000/usuarios';
  emailPattern         : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(private http: HttpClient) { }

  register(username: string,email:string, password:string){
    const favorites = [{}];
    return this.http.post<Users>(this.url, {username,email,favorites,password})
      .pipe(
        tap(resp => {
          if(resp.ok){
            localStorage.setItem('token', resp.token!)
          }
        }),
        map( valid => valid.ok),
        catchError( error => of(error.error.msg))
      );
  }

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email)
    return this.http.get<any[]>(`${this.url}?q=${email}`)
      .pipe(
        //delay(3000),
        map( resp => {
          return (resp.length === 0)
            ? null
            : {emailTomado: true}
        })
      )
  }
}