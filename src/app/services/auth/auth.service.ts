import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import axios from 'axios';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { Users } from '../../interface/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AsyncValidator {
  url                  : string = 'https://happy-hats-rush-92-172-244-82.loca.lt/users';
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

  getUser(){
      return this.http.get("http://localhost:3000/users");
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

  async getUser(email: string, password: string): Promise<boolean | undefined>{
    let resp: boolean | undefined;

    resp = await axios.get(`${this.url}?email=${email}`).then( user => {
      if(user.data[0] && user.data[0].password === password){
        localStorage.setItem("login", "true");
        return true;
      }else{
        return false
      }
    });
    return resp;
  }


}
