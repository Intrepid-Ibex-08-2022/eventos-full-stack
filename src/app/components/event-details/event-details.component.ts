import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetEventsService } from '../../services/events/get-events.service';
import { EventsResult } from '../../interface/event';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: EventsResult | undefined;
  sizeWidth: string = '930';
  position = {
    lat: 28.12462338053807,
    lng: -15.437557770012095
  }
  label ={
    color: 'blue',
    text: 'Ubicación',
    opacity: 0.8
  }
  zoom=12


  constructor(
    private eventServices: GetEventsService,
    private activateRoute: ActivatedRoute,
    private responsive: BreakpointObserver
  ) { }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id') as string;
    this.getEvent(id);

    this.sizeMap()
  }

  sizeMap(): void {
    this.responsive.observe([
      Breakpoints.Medium,
      Breakpoints.Small,
      Breakpoints.XSmall
    ])
    .subscribe(result => {

      let breakpoints = result.breakpoints

      if (breakpoints[Breakpoints.Large] || breakpoints[Breakpoints.Medium] ) {
        this.sizeWidth = '930'
      }else if (breakpoints[Breakpoints.Small] || breakpoints[Breakpoints.Small]){
        this.sizeWidth = '430'
      }
    });
  }

  eventPostion(){
    let urlMap = this.event?.map_link;

    if(urlMap){
      let position = urlMap?.substr(urlMap.search('@')+1, 22);

      let lat = position?.substr(0, position.search(','));
      let lng = position?.substr(position.search(',')+1, position.length);

      if(lat && lng){
        this.position = {lat: parseFloat(lat), lng:parseFloat(lng)}
      }else{
        position = urlMap?.substr(urlMap.search('=')+1, 22);

        lat = position?.substr(0, position.search(','));
        lng = position?.substr(position.search(',')+1, position.length);

        this.position = {lat: parseFloat(lat), lng:parseFloat(lng)}
      }

    }
  };

  async getEvent(id: string) {
    (await this.eventServices.getEventDetails(id)).subscribe((resp) => {
      this.event = resp;
      this.eventPostion()
    });
  }
}
