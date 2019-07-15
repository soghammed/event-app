import { Component, OnInit, OnChanges } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/Event'; 
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnChanges {
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
          
          this.events = res.data;
          return 1;
        }
      )
  }

  ngOnChanges(changes){
    console.log('update view');
  }
}
