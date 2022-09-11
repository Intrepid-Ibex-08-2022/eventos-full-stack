import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetEventsService {
  url = 'https://intrepit-ibex.herokuapp.com/api/event/add';
  constructor(private http: HttpClient) { }

  eventAddForUser( event: any, id: string): Observable<any> {
    return this.http.post(`http://localhost:4000/api/events/add/${id}`, event);
  }
}
