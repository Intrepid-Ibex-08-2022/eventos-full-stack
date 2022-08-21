export interface Event {
  events_results:  EventsResult[];
}


export interface EventsResult  {
  id         : number,
  tipo_event : string,
  image?     : string,
  title      : string,
  description: string,
  date?      : Date,
  address    : string[],
  ticket_info: string,
  venue?     : Venue,
  map_link   : string
}

export interface Date {
  start_date: string,
  when      : string,
}

export interface Venue {
  rating : string,
  reviews: string,
}
