import { EventsResult } from '../../interface/event';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  eventosCanarios: EventsResult[] = [];
  urlEventos = 'https://intrepit-ibex.herokuapp.com/api/events';

  constructor() {}

  async getEvents(): Promise<EventsResult[]> {
    const response = await axios.get(this.urlEventos);
    return response.data;
  }

  async getFilteredEvents(
    place: string,
    tipoEvent: string,
  ): Promise<EventsResult[]> {
    let response;
    if (place !== 'Todos' && tipoEvent === 'Todos') {
      response = await axios.get(`${this.urlEventos}/filter?place=${place}`);
    }
    if (place !== 'Todos' && tipoEvent !== 'Todos') {
      response = await axios.get(
        `${this.urlEventos}/filter?place=${place}&tipo_event=${tipoEvent}`,
      );
    }
    if (place === 'Todos' && tipoEvent !== 'Todos') {
      response = await axios.get(
        `${this.urlEventos}/filter?tipo_event=${tipoEvent}`,
      );
    }
    if (place === 'Todos' && tipoEvent === 'Todos') {
      response = await axios.get(`${this.urlEventos}`);
    }

    return response?.data;
  }
}
