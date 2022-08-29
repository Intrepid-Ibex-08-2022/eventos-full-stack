import { Injectable } from '@angular/core';
import axios from 'axios';
import {EventsResult } from '../../interface/event';

@Injectable({
  providedIn: 'root'
})
export class GetEventsService {
  url = 'https://happy-hats-rush-92-172-244-82.loca.lt/eventosCanarios';
  constructor() { }


   async getEventDetails(id: string): Promise<EventsResult | undefined>{

    const event = await axios.get(`${this.url}/${id}`).then( resp => {
      return resp.data
    })

    return event

  }



}
