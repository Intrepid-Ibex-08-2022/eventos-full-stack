import { Component, OnInit } from '@angular/core';
import { EventsResult } from '../../interface/event';
import { Users } from '../../interface/users';
import { FiltersService } from 'src/app/services/events/filters.service';
import { GetEventsService } from '../../services/events/get-events.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { JsonPipe } from '@angular/common';

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
  id: string | null = '';
  username: string | undefined;
  user?: Users;
  fav: boolean = false;
  email: any;

  constructor(
    private eventServices: GetEventsService,
    private service: FiltersService,
    private route: Router,
    private authServices: AuthService,
  ) {}
  async ngOnInit(): Promise<void> {
    this.service.getEvents().then((eventos) => {
      this.events = eventos;
      this.eventsToRender = eventos;
    });
    this.id = localStorage.getItem('token');
    if (this.id) {
      (await this.authServices.getUserByToken(this.id)).subscribe(
        async (email) => {
          if (email !== undefined) {
            this.email = email;
            (await this.authServices.loginIdAndFavorites(this.email)).subscribe( user =>{
              this.user = user;
              console.log(this.user);
              console.log(this.fav);
            });

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

  seeFavorites() {
    if (this.user && this.user.favorites) {
      this.eventsToRender = this.events!.filter((ev) =>
        (this.user as Users).favorites.includes(ev._id),
      );
    }
  }
  removeSeeFavorites() {
    this.eventsToRender = this.events as EventsResult[];
    this.fav = false;
    this.tipoEvento = 'Todos';
    this.place = 'Todos';
  }

  async getFavouritesFromAPI() {
    const events = [];
    for (let i = 0; i < this.user!.favorites.length; i++) {
      const event = await (
        await this.eventServices.getEventDetails(this.user!.favorites[i])
      ).toPromise();
      events.push(event);
      this.fav = true;
      console.log({ eventsToRender: this.eventsToRender });
    }
    this.eventsToRender = events as EventsResult[];
  }

  // const a = [  { _id: "1234" } , { _id : "12" } , { _id : "34"} ]
  // const b = ["1234" , "34"]
  // [ 1 , 2 , 3 , 4 ].filter( i => i > 3 )
  // const c = a.filter( evento => evento._id === "1234")
  // const d = a.filter( evento => b.includes(evento._id) )
}
