import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetEventsService } from '../../services/events/get-events.service';
import { EventsResult } from '../../interface/event';
import { Users } from '../../interface/users';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit, AfterContentInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  event: EventsResult | undefined;
  id: string | null = '';
  username: string | undefined;
  user?: Users;
  email: any;
  fav: boolean = false;

  position = {
    lat: 28.12462338053807,
    lng: -15.437557770012095,
  };



  constructor(
    private eventServices: GetEventsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private authServices: AuthService,
  ) {}

  ngAfterContentInit() {
    mapboxgl.accessToken = environment.MAP_BOX_TOKEN;

    setTimeout(() => {
      const map  = new mapboxgl.Map({
        container: this.mapDivElement!.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
          -15.437557770012095,
           28.12462338053807
          ],
        zoom: 14,
      });
      map.on('style.load', () => {
        map.setFog({});
        });

    }, 1500);

  }

  async ngOnInit(): Promise<void> {
    const idEvent = this.activateRoute.snapshot.paramMap.get('id') as string;
    this.getEvent(idEvent);

    this.id = localStorage.getItem('token');
    if (this.id) {
      (await this.authServices.getUserByToken(this.id)).subscribe(
        async (email) => {
          if (email !== undefined) {
            this.email = email;
            (await this.authServices.loginIdAndFavorites(this.email)).subscribe(
              (user) => {
                if (user) {
                  this.user = user;
                  this.fav = this.user.favorites.includes(idEvent);
                }
              },
            );
          }
          return;
        },
      );
    }
  }


  eventPostion() {
    let urlMap = this.event?.map_link;

    if (urlMap) {
      let position = urlMap?.substr(urlMap.search('@') + 1, 22);

      let lat = position?.substr(0, position.search(','));
      let lng = position?.substr(position.search(',') + 1, position.length);

      if (lat && lng) {
        this.position = { lat: parseFloat(lat), lng: parseFloat(lng) };
      } else {
        position = urlMap?.substr(urlMap.search('=') + 1, 22);

        lat = position?.substr(0, position.search(','));
        lng = position?.substr(position.search(',') + 1, position.length);

        this.position = { lat: parseFloat(lat), lng: parseFloat(lng) };
      }
    }
  }

  async getEvent(id: string) {
    (await this.eventServices.getEventDetails(id)).subscribe((resp) => {
      this.event = resp;
      this.eventPostion();
    });
  }
  async getUser(id: string) {
    (await this.eventServices.getEventDetails(id)).subscribe((resp) => {
      this.event = resp;
      this.getEvent(id);
    });
  }
  async addFavorite() {
    this.user!.favorites.push(this.event!._id);
    await this.authServices.updateUser(this.user!);
    this.fav = this.user!.favorites.includes(this.event!._id);
  }
  async delFavorite() {
    this.user!.favorites = this.user!.favorites.filter(
      (ev) => ev !== this.event!._id,
    );
    await this.authServices.updateUser(this.user!);
    this.fav = this.user!.favorites.includes(this.event!._id);
  }
}
