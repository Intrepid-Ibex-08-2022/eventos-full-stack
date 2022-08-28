import { Injectable } from '@angular/core';
import { Event, EventsResult } from '../interface/event';

@Injectable({
  providedIn: 'root',
})
export class GetEventsService {
  eventDetails?: EventsResult;

  constructor() {}

  setEventDetails(event: EventsResult) {
    this.eventDetails = event;
  }
}
