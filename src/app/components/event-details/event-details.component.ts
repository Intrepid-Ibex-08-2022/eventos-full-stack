import { Component, OnInit } from '@angular/core';
import { GetEventsService } from '../../services/get-events.service';
import { EventsResult } from '../../interface/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: EventsResult = {
    "title": "Melendi - Likes y Cicatrices Gran Canaria",
    "date": {
        "start_date": "Oct 28",
        "when": "Vie, Oct 28, 7:30 PM GMT+1"
    },
    "address": [
        "Gran Canaria Arena, C. Fondos de Segura, s/n",
        "Las Palmas de Gran Canaria, España"
    ],
    "link": "https://www.seetickets.com/tour/melendi-likes-y-cicatrices-gran-canaria",
    "event_location_map": {
        "image": "https://www.google.com/maps/vt/data=RbBkhwJumzeW7wCbzKSGT0xtpT3g2D-Uhi1JN1VMFUxWBf5fvxfg4rjLxBzjUh81qGUtl6BBmiORZmH-g0bgTBrVqjT1NVixcmXfnNdpis_5v6HDqYM",
        "link": "https://www.google.com/maps/place//data=!4m2!3m1!1s0xc4095c7faf13115:0xee8943e7c62dfb8a?sa=X&hl=en",
        "serpapi_link": "https://serpapi.com/search.json?data=%214m2%213m1%211s0xc4095c7faf13115%3A0xee8943e7c62dfb8a&engine=google_maps&google_domain=google.com&hl=en&q=las+palmas+de+gran+canaria&type=place"
    },
    "description": "Compre entradas Melendi - Likes y Cicatrices Gran Canaria y regístrese para recibir las últimas alertas turísticas. Find Melendi - Likes y Cicatrices Gran Canaria tour fechas, comentarios, horarios y detalles de eventos.",
    "ticket_info": [
        {
            "source": "Seetickets.com",
            "link": "https://planetrock.seetickets.com/event/melendi-likes-y-cicatrices-gran-canaria/gran-canaria-arena/2303340",
            "link_type": "tickets"
        }
    ],
    "venue": {
        "name": "Gran Canaria Arena",
        "rating": "4.7",
        "reviews": 33,
        "link": "https://www.google.com/search?hl=en&q=Gran+Canaria+Arena&ludocid=17188344115577617290&ibp=gwp%3B0,7"
    },
    "thumbnail": "https://cd1.taquilla.com/data/images/t/f3/melendi.jpg"
  };

  constructor(private eventServices: GetEventsService) { }

  ngOnInit(): void {
    this.event = this.eventServices.eventDetails;

  }

}
