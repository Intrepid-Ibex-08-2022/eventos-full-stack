import { Injectable } from '@angular/core';
import axios from 'axios';
import {EventsResult } from '../../interface/event';

@Injectable({
  providedIn: 'root'
})
export class GetEventsService {

  constructor() { }


   async getEventDetails(id: string): Promise<EventsResult | undefined>{
    let index = parseInt(id)
    index--;

    const event = await axios.get('http://localhost:3000/events').then( event => {
      return event.data[index]
    })

    return event

  }



}
