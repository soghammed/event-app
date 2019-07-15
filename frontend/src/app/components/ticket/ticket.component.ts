import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

	@Input() tid: number;
	ticket;
	action: string = '';
  response: any;
  constructor(
  	private ts: TicketService,
  	private route: ActivatedRoute
  ) { }

  ngOnInit() {
  	this.tid = +this.route.snapshot.paramMap.get('id');
  	if(window.location.href.match(/(status)/g)){
  		this.action = "status";
  		this.ts.getStatus(this.tid)
  			.subscribe(res => {
  				console.log('status res', res);
  				this.response = res['result'];
  			},
  			(err) => {
  				console.log('here', err);
  				this.response = err.statusText
  			});
  	}else if(window.location.href.match(/(redeem)/g)){
  		this.action = "redeem";
  		this.ts.redeemTicket(this.tid)
  			.subscribe(res => {
  				this.response = res['result'];
  			}, 
  			(err) => this.response = err.statusText);
  	}
  	// this.ts.
  }

}
