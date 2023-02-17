import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SetEventsService {
  url = 'https://api-canary-events.netlify.app/events';
  //url = 'http://localhost:4000/api/events';
  //urlPrueba = 'http://localhost:4000/api/events';
  constructor(private http: HttpClient) {}

  eventAddForUser(event: any, token: string) {
    let cabecera = new HttpHeaders().append('authorization', `Basic ${token}`);

    return this.http.post(`${this.url}`, event);
  }
}
