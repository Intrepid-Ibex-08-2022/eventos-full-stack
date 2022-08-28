import { Component, Input, OnInit } from '@angular/core';
import { GetEventsService } from '../../services/events/get-events.service';
import { EventsResult } from '../../interface/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: EventsResult | undefined;

  constructor(
    private eventServices: GetEventsService,
    private activateRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id') as string
    this.getEvent(id);
  }

  async getEvent(id: string){
    await this.eventServices.getEventDetails(id).then( resp => {
      this.event = resp
    });
  }





}
