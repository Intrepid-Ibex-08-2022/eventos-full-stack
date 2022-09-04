import { EventsResult } from '../../interface/event';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  eventosCanarios: EventsResult[] = [];
  urlEventos = 'https://intrepit-ibex.herokuapp.com/api/event';
  // urlEventos =
  //   'mongodb+srv://intrepidibex:Stos5BsCqdS7MzIb@cluster0.lxr4zbx.mongodb.net/?retryWrites=true&w=majority' +
  //   '/eventosCanarios';
  // urlEventos =
  // 'https://happy-hats-rush-92-172-244-82.loca.lt' + '/eventosCanarios'; // Este portal es el mismo que mi local http://localhost:3000/eventosCanarios pero declarado público con el local tunnel. Los demas usuarios de la app ascederán a mi localhost3000 con la dirreccion que les ponga aquí.

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
      response = await axios.get(`${this.urlEventos}?place=${place}`);
    }
    if (place !== 'Todos' && tipoEvent !== 'Todos') {
      response = await axios.get(
        `${this.urlEventos}?place=${place}&tipo_event=${tipoEvent}`,
      );
    }
    if (place === 'Todos' && tipoEvent !== 'Todos') {
      response = await axios.get(`${this.urlEventos}?tipo_event=${tipoEvent}`);
    }
    if (place === 'Todos' && tipoEvent === 'Todos') {
      response = await axios.get(`${this.urlEventos}`);
    }

    return response?.data;
  }
}
