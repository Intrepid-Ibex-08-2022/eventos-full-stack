import { Component, Input } from '@angular/core';
import { EventsResult } from '../../interface/event';
import { GetEventsService } from '../../services/get-events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent  {

  @Input() event: EventsResult = {};

  constructor(
    private eventServices: GetEventsService,
    private route: Router
  ) { }

  event_detail(event: EventsResult ){
    this.eventServices.setEventDetails(event);
    this.route.navigateByUrl('/event')


  }


}
