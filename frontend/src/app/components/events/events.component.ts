import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/Event'; 
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
	events: Event[];
  constructor(
  		private es:EventsService
  ) {}

  ngOnInit() {
  	//get events;
  	// console.log('oninitevents');
    this.es.getEvents()
      .subscribe(
        (res) => {
          // console.log(res.data, res);
          
          this.events = res['data'];
          return 1;
        }
      )
  }

  checkStatus(){
    const eventId = document.getElementById('ticket_status').value;
    // console.log(eventId);
    window.location.href = "/status/"+eventId;
  }

  redeemTicket(){
    const eventId = document.getElementById('ticket_redeem').value;
    // console.log(eventId);
    window.location.href= "/redeem/"+eventId;
  }
}
