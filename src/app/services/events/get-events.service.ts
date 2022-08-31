import { Injectable } from '@angular/core';
import axios from 'axios';
import { EventsResult } from '../../interface/event';

@Injectable({
  providedIn: 'root',
})
export class GetEventsService {
  url = 'http://localhost:3000' + '/eventosCanarios';
  //  'mongodb+srv://intrepidibex:Stos5BsCqdS7MzIb@cluster0.lxr4zbx.mongodb.net/?retryWrites=true&w=majority' +
  //  '/eventosCanarios';
  //url =
  //  'mongodb+srv://intrepidibex:Stos5BsCqdS7MzIb@cluster0.lxr4zbx.mongodb.net/?retryWrites=true&w=majority' +
  //  '/eventosCanarios';
  // url = 'https://happy-hats-rush-92-172-244-82.loca.lt' + '/eventosCanarios'; // Este portal es el mismo que mi local http://localhost:3000/eventosCanarios pero declarado público con el local tunnel. Los demas usuarios de la app ascederán a mi localhost3000 con la dirreccion que les ponga aquí.
  constructor() {}

  async getEventDetails(id: string): Promise<EventsResult | undefined> {
    const event = await axios.get(`${this.url}/${id}`).then((resp) => {
      return resp.data;
    });

    return event;
  }
}
