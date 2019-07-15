import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';




@Injectable({
  providedIn: 'root'
})
export class EventsService {
	eventsUrl: string = "http://localhost:80/EventApp/public/api/events";
	eventUrl: string = "http://localhost:80/EventApp/public/api/event/";
	createEventUrl: string = "http://localhost:80/EventApp/public/api/event/create";
  createTicketUrl: string = "http://localhost:80/EventApp/public/api/ticket/create/";
	editEventUrl: string = "http://localhost:80/EventApp/public/api/event/update";
  redeemTicketUrl: string = "http://localhost:80/EventApp/public/api/redeem/autopick/";
	okTicketsCsvUrl: string = "http://localhost:80/EventApp/public/api/csv/okTickets/";
  newTicketsCsvUrl: string = "http://localhost:80/EventApp/public/api/csv/newTickets/";

	events: Event[];

  constructor(
  	private http:HttpClient
  ) { }

  getEvents(){
  	const	headers = new HttpHeaders({
				// 'Access-Control-Request-Method': '*',
				// 'Access-Control-Request-Headers': '*',
				// 'Access-Control-Allow-Methods': 'POST, GET',
		    // 'Access-Control-Allow-Headers': '*',
				'Content-Type': 'application/json'
		});
  	return this.http.get<Event[]>(this.eventsUrl, { headers: headers});
  }

  getEvent(id){
  	// console.log(this.events);
  	// this.event = this.events.filter( event => {
  	// 	return event.id === id;	
  	// });

  	const headers = new HttpHeaders({
  		'Content-Type': 'application/json'
  	});
  	return this.http.get<Event[]>(this.eventUrl+id, { headers: headers});
  }

  createTicket(event_id){
    return this.http.get(this.createTicketUrl+event_id);
  }

  createEvent(e){
    return this.http.post(this.createEventUrl, e);
  	// return this.http.post<Event>(this.eventUrl, e);
  }

  redeemTicket(event_id)
  {
  	return this.http.get(this.redeemTicketUrl+event_id);
  }

  downloadOkTickets(event_id)
  {
  	return this.http.get(this.okTicketsCsvUrl+event_id, {responseType: 'json'});
  }
  downloadNewTickets(event_id)
  {
    return this.http.get(this.newTicketsCsvUrl+event_id, {responseType: 'json'});    
  }

  editEvent(formVal, event_id)
  {
    formVal.event_id = event_id;
    return this.http.post(this.editEventUrl, formVal, { responseType: 'json'});
  }
}
