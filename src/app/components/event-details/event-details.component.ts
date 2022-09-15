import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetEventsService } from '../../services/events/get-events.service';
import { EventsResult } from '../../interface/event';
import { UsersResponse, User } from '../../interface/users';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment'
import mapboxgl from 'mapbox-gl'

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
  user?: User;
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
        async (resp) => {
          if (resp) {
            this.user = resp.user;
            if(this.user.fav?.includes(idEvent)){
              this.fav = true;
            }
          }
          return;
        },
      );
    }

  }

  eventPostion() {
     let urlMap = this.event?.map_link.split('@' || '=')
       . filter(resp => (/[0-9]/).test(resp.substring(0,1)))

    if (urlMap) {

      let lat = urlMap[0].substr(0, urlMap[0].search(','));
      let lng = urlMap[0].substr(lat.length +1, urlMap[0].search(',') );

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
    // this.user!.favorites.push(this.event!._id);
    (await this.authServices.updateUserFavorites(
      this.event!._id,
      this.id as string,
    )).subscribe((resp: any) => console.log(resp));
    this.fav = true;
  }
  async delFavorite() {
    // this.user!.favorites = this.user!.favorites.filter(
    // (ev) => ev !== this.event!._id,
    // );
    await this.authServices.deleteUserFavorites(
      this.event!._id,
      this.id as string,
    ).subscribe((resp: any) => console.log(resp));
    this.fav = false;
  }
}
