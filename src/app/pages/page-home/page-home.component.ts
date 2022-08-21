import { Component, OnInit } from '@angular/core';

import { GetEventsService } from 'src/app/services/get-events.service';
import { Event, EventsResult } from '../../interface/event';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

}
