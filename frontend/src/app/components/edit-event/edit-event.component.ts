import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

	@Input() id;
	eventid: number;
  editEvent: FormGroup;
  errors: [];
  notification: string;
  constructor(private es:EventsService, private route:ActivatedRoute) { 
  	// console.log(this);
  }

  ngOnInit() {
  	this.id = +this.route.snapshot.paramMap.get('id');
  	console.log(this);
  	this.editEvent = new FormGroup({
  		name: new FormControl(''),
  		date: new FormControl(),
  		initialTicketCount: new FormControl(),
  	});
  }

  onSubmit(formVal){
    console.log(formVal);
    // formVal.event_id = this.eventid;
  	this.es.editEvent(formVal, this.id)
  		.subscribe(res => {
  			// console.log(res, res.message);
  		this.errors = null;
  		// if()
        // this.notification = res.message;
        // window.location.reload();
      },
      err => {
      	this.notification = null;
      	this.errors = err.error.errors;
      	// document.getElementsById('').innerHTML = 
      });
  }
}
