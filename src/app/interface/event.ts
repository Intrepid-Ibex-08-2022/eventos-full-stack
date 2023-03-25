export interface Event {
  events_results: EventsResult[];
}

export interface EventsResult {
  _id: string;
  tipo_event: string;
  place: string;
  image?: string;
  title: string;
  description: string;
  date: EventDate;
  address: string[];
  adress?: string[];
  ticket_info: string;
  venue?: Venue;
  map_link: string;
  id?: number
}

export interface EventDate {
  start_date?: string;
  when: string;
}

export interface Venue {
  rating?: string;
  reviews?: string;
}
