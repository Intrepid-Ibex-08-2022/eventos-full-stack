import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { GetEventsService } from 'src/app/services/get-events.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  allEvents : any = []; 
  evetsLP : any = [];

  constructor(private getEventComponent : GetEventsService) {
    //this.allEvents = getEventComponent.getAllEvetsFetch()

    getEventComponent.getAllEvents().subscribe(async events => {
      this.allEvents = events;
      await this.evetsLP ;
      this.evetsLP = this.allEvents[0].events_results;
    }
      )
  }

  ngOnInit(): void {
  }

  async getAllEventsWithFetch(){
    await console.log(this.allEvents.__zone_symbol__value);
  }

  getAllEvents(){
    console.log(this.evetsLP);
    
    
    
    
  }



}
