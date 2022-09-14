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

  position: [number,number] =[
    -15.437557770012095,
    28.12462338053807
  ];



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
        center: this.position,
        zoom: 16,
      });
      map.on('style.load', () => {
        map.setFog({});
        });
      const marker1 = new mapboxgl.Marker()
      .setLngLat(this.position)
      .addTo(map);

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

    if (this.event?.map_link) {
      let urlMap = this.event?.map_link.split('@' || '=');

      let lat = urlMap[1].substr(0, urlMap[1].search(','));
      let lng = urlMap[1].substr(lat.length +1, urlMap[1].search(',') );

      if (lat && lng) {
        this.position[0] = parseFloat(lng);
        this.position[1] = parseFloat(lat);
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
