import { Component, OnInit } from '@angular/core';
import { GetEventsService } from 'src/app/services/get-events.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  allEvents :any = []; 

  constructor(private getEventComponent : GetEventsService) {
    getEventComponent.getAllEvetsFetch()
  }

  ngOnInit(): void {
  }

  

}
