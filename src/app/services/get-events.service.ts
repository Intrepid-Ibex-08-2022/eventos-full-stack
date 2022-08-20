import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event, EventsResult } from '../interface/event';


@Injectable({
  providedIn: 'root'
})
export class GetEventsService {

  allEvents: Event[] = [];
  eventDetails: EventsResult = {};

  constructor(public httpclient : HttpClient) { }

  getAllEvents() {
    return this.httpclient.get<Event[]>("/assets/json/events_es.json")
  }

  setEventDetails(event: EventsResult){
    this.eventDetails = event
  }

}
