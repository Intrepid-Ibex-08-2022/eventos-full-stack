import { Component, OnInit } from '@angular/core';
import { EventsResult } from '../../interface/event';
import { UsersResponse, User } from '../../interface/users';
import { FiltersService } from 'src/app/services/events/filters.service';
import { GetEventsService } from '../../services/events/get-events.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  filteredEvents: EventsResult[] = [];
  events: EventsResult[] | undefined;
  event: EventsResult | undefined;
  eventsToRender: EventsResult[] = [];
  place = 'Todos';
  tipoEvento = 'Todos';
  token: string | null= '';
  username: string | undefined;
  user?: User;
  fav: boolean = false;
  email: any;
  pageNum : number = 1;

  constructor(
    private eventServices: GetEventsService,
    private service: FiltersService,
    private route: Router,
    private authServices: AuthService,
  ) {}
  async ngOnInit(): Promise<void> {
    this.get10Events();
    /* this.service.getEvents().then((eventos) => {
      this.events = eventos;
      this.eventsToRender = eventos;
    }); */
    this.token = localStorage.getItem('token');
    if (this.token) {
      (await this.authServices.getUserByToken(this.token)).subscribe(
        async (resp) => {
          if (resp) {
            this.user = resp.user;
          }
          return;
        },
      );
    }
  }

  event_detail(id: string) {
    this.eventServices.getEventDetails(id);
    this.route.navigateByUrl(`/events/${id}`);
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
  async getEvent(id: string) {
    (await this.eventServices.getEventDetails(id)).subscribe((resp) => {
      this.event = resp;
      // this.getEvent(id);
    });
  }

  // seeFavorites() {
  //   if (this.user && this.user.favorites) {
  //     this.eventsToRender = this.events!.filter((ev) =>
  //       (this.user as User).favorites.includes(ev._id),
  //     );
  //   }
  // }

  removeSeeFavorites() {
    this.eventsToRender = this.events as EventsResult[];
    this.fav = false;
    this.tipoEvento = 'Todos';
    this.place = 'Todos';
    this.hideen = false;
  }

  hideen = false;

  async getFavouritesFromAPI() {
    if(this.token)
    (await this.authServices.loginIdAndFavorites(this.token))
      .subscribe( resp => {
        if(resp){
          this.eventsToRender = resp.favorites;
          this.fav = true;
          this.hideen = true;
        }

    })


    // const events = [];
    // for (let i = 0; i < this.user!.fav.length; i++) {
    //   const event = await (
    //     await this.eventServices.getEventDetails(this.user!.fav[i])
    //   ).toPromise();
    //   events.push(event);

    //   this.fav = true;

    // }
    // this.eventsToRender = events as EventsResult[];
  }

  backPage(){
    if(this.pageNum === 1){
      return alert('Esta usted en la primera página');
    } else {
      this.pageNum = this.pageNum - 1;
      this.get10Events();
    }
  }

  nextPage(){
    this.pageNum = this.pageNum + 1;
    this.get10Events();
  }


  get10Events(){
    this.service.getEventsByPageNum(this.pageNum).then(eventos => {
      if(eventos === 'no se encuentran mas eventos'){
        alert('Esta usted en la última página.');
      }else{
        this.events = eventos;
        this.eventsToRender = eventos;
      }
    })
  }

  // const a = [  { _id: "1234" } , { _id : "12" } , { _id : "34"} ]
  // const b = ["1234" , "34"]
  // [ 1 , 2 , 3 , 4 ].filter( i => i > 3 )
  // const c = a.filter( evento => evento._id === "1234")
  // const d = a.filter( evento => b.includes(evento._id) )
}
