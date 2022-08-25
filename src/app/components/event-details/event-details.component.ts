import { Component, OnInit } from '@angular/core';
import { GetEventsService } from '../../services/events/get-events.service';
import { EventsResult } from '../../interface/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: EventsResult |undefined;

  constructor(private eventServices: GetEventsService) { }

  ngOnInit(): void {

    this.event = this.eventServices.eventDetails;



  }

}
