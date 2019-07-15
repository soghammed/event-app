import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Ticket } from '../models/ticket';


@Injectable({
  providedIn: 'root'
})
export class TicketService{

	redeemTicketUrl: string = "http://localhost:80/EventApp/public/api/redeem/";
	ticketStatusUrl: string = "http://localhost:80/EventApp/public/api/status/";
  constructor(private http:HttpClient) { }

  redeemTicket(ticket_id)
  {
  	return this.http.get(this.redeemTicketUrl+ticket_id);
  }

  getStatus(ticket_id)
  {
  	return this.http.get(this.ticketStatusUrl+ticket_id);
  }
}
