export interface Event {
  search_metadata:    SearchMetadata;
  search_parameters:  SearchParameters;
  search_information: SearchInformation;
  events_results?:    EventsResult[];
  error?:             Error;
}

export enum Error {
  GoogleHasnTReturnedAnyResultsForThisQuery = "Google hasn't returned any results for this query.",
}

export interface EventsResult {
  title?:              string;
  date?:               DateClass;
  address?:            string[];
  link?:               string;
  event_location_map?: EventLocationMap;
  description?:        string;
  ticket_info?:        TicketInfo[];
  venue?:              Venue;
  thumbnail?:          string;
  search_metadata?:    SearchMetadata;
  search_parameters?:  SearchParameters;
  search_information?: SearchInformation;
  error?:              Error;
}

export interface DateClass {
  start_date?: string;
  when:       string;
}

export interface EventLocationMap {
  image:        string;
  link:         string;
  serpapi_link: string;
}

export interface SearchInformation {
  events_results_state: EventsResultsState;
}

export enum EventsResultsState {
  FullyEmpty = "Fully empty",
  ResultsForExactSpelling = "Results for exact spelling",
}

export interface SearchMetadata {
  id:                string;
  status:            Status;
  json_endpoint:     string;
  created_at:        string;
  processed_at:      string;
  google_events_url: string;
  raw_html_file:     string;
  total_time_taken:  string;
}

export enum Status {
  Success = "Success",
}

export interface SearchParameters {
  q:      string;
  engine: Engine;
}

export enum Engine {
  GoogleEvents = "google_events",
}

export interface TicketInfo {
  source:    string;
  link:      string;
  link_type: string;
}

export enum LinkType {
  MásInformación = "más información",
  Tickets = "tickets",
}

export interface Venue {
  name:    string;
  rating:  string;
  reviews: number;
  link:    string;
}
