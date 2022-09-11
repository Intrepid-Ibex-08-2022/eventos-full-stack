import { Component, Input, OnInit } from '@angular/core';
import { GetEventsService } from '../../services/events/get-events.service';
import { EventsResult } from '../../interface/event';
import { Users } from '../../interface/users';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: EventsResult | undefined;
  id: string | null = '';
  username: string | undefined;
  user?: Users;
  fav: boolean = false;

  constructor(
    private eventServices: GetEventsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private authServices: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    const idEvent = this.activateRoute.snapshot.paramMap.get('id') as string;
    this.getEvent(idEvent);

    this.id = localStorage.getItem('token');
    if (this.id) {
      (await this.authServices.loginIdAndFavorites(this.id)).subscribe(
        (resp) => {
          if (resp !== undefined) {
            this.user = resp;
            console.log(this.user);
            this.fav = this.user.favorites.includes(idEvent);
            console.log(this.fav);
            console.log(idEvent);
          }
          return;
        },
      );
    }
  }

  async getEvent(id: string) {
    (await this.eventServices.getEventDetails(id)).subscribe((resp) => {
      this.event = resp;
      this.getEvent(id);
    });
  }
  async getUser(id: string) {
    (await this.eventServices.getEventDetails(id)).subscribe((resp) => {
      this.event = resp;
      this.getEvent(id);
    });
  }
  addFavorite() {
    this.user!.favorites.push(this.event!._id);
    this.fav = this.user!.favorites.includes(this.event!._id);
  }
  delFavorite() {
    this.user!.favorites = this.user!.favorites.filter(
      (ev) => ev !== this.event!._id,
    );
    this.fav = this.user!.favorites.includes(this.event!._id);
  }
}
