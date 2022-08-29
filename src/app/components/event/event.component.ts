import { Component, OnInit } from '@angular/core';
import { EventsResult } from '../../interface/event';
import { FiltersService } from 'src/app/services/events/filters.service';
import { GetEventsService } from '../../services/events/get-events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  eventosCanarios: EventsResult[] = [];
  events: any;
  eventsToRender: any;
  place = 'Todos';
  tipoEvento = 'Todos';

  constructor(
    private eventServices: GetEventsService,
    private service: FiltersService,
    private route: Router,
  ) {}
  ngOnInit() {
    this.service.getEvents().then((eventos) => {
      this.events = eventos;
      this.eventsToRender = eventos;
    });
  }

  event_detail(id: string) {
    this.eventServices.getEventDetails(id);
    this.route.navigateByUrl(`/event/${id}`);
  }
  getFilteredEvents = ({
    tipoEvento = this.tipoEvento,
    place = this.place,
  }) => {
    return this.service.getFilteredEvents(place, tipoEvento);
  };

  async change1(event: Event) {
    const {
      // @ts-ignore
      target: { value },
    } = event;

    this.place = value;

    const filteredEvents = await this.getFilteredEvents({
      place: value,
    });

    this.eventsToRender = filteredEvents;
  }
  async change2(event: Event) {
    const {
      // @ts-ignore
      target: { value },
    } = event;

    this.tipoEvento = value;

    const filteredEvents = await this.getFilteredEvents({
      tipoEvento: value,
    });

    this.eventsToRender = filteredEvents;
  }
}
