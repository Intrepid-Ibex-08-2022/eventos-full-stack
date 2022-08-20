import { Component, OnInit } from '@angular/core';

import { GetEventsService } from 'src/app/services/get-events.service';
import { Event, EventsResult } from '../../interface/event';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  allEvents : Event[] = [];
  evetsLP : EventsResult[] = [];

  constructor(private getEventComponent : GetEventsService) {

    getEventComponent.getAllEvents().subscribe( events => {
      this.allEvents = events;
      if(this.allEvents[0].events_results)
      this.evetsLP = this.allEvents[0].events_results;
    }
      )
  }

  ngOnInit(): void {
  }

}
