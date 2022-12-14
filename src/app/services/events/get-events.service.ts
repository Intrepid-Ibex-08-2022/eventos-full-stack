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
  url = 'https://intrepit-ibex.herokuapp.com/api/events/event';
  //url = 'http://localhost:4000/api/events/event';

  constructor(private http: HttpClient) {}

  async getEventDetails(
    id: string,
  ): Promise<Observable<EventsResult | undefined>> {
    let event: Observable<EventsResult | undefined>;
    event = await this.http.get<EventsResult>(`${this.url}/${id}`).pipe(
      map((resp) => {
        return resp;
      }),
    );
    return event;
  }
}
