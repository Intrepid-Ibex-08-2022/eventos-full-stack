import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetEventsService {

  constructor(public httpclient : HttpClient) { }

allEvents = [];

getAllEvents() {
  return this.httpclient.get("/assets/json/events_es.json")
}

async getAllEvetsFetch(){
  await fetch("/assets/json/events_es.json")
  .then( res => res.json())
  .then( events =>  this.allEvents = events)
  .catch(() => "ERROR")

  console.log(this.allEvents);
  
}

}
