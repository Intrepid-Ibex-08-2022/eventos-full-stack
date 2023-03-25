import { Injectable } from '@angular/core';
import axios from 'axios';
import { EventsResult } from '../../interface/event';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UsersResponse } from '../../interface/users';

@Injectable({
  providedIn: 'root',
})
export class GetEventsService {
  url = 'https://api-canary-events.netlify.app/events';
  //url = 'http://localhost:4000/api/events/event';

  constructor(private http: HttpClient) {}

  getEventDetails(id: string): Observable<EventsResult | undefined> {
    let event: Observable<EventsResult | undefined>;
    event = this.http.get<EventsResult>(`${this.url}/event?event=${id}`)
    .pipe(
      map((resp) => {
        return resp;
      }),
    );
    return event;
  }
}
