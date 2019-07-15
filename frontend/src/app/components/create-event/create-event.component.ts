import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  newEvent: FormGroup;
  formview: string = 'new';
  constructor(private es:EventsService) { 
  	// console.log(this);
  }

  ngOnInit() {
  	this.newEvent = new FormGroup({
  		name: new FormControl(''),
  		date: new FormControl(),
  		initialTicketCount: new FormControl() 
  	});
  }

  setView(view){
    this.formview = view;
  }

  onSubmit(formVal){
    console.log(formVal);
  	this.es.createEvent(formVal)
  		.subscribe(res => {
        // console.log('createevent res', res);
        window.location.href = "/";
      });
  }

}
