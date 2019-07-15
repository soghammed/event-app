import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/Event';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit,AfterViewInit {
	
	@Input() event: Event[];
	@Input() events: Event[];
	currentUrl: boolean = false;
  notification: string;
  spawn: string = "<div class='spinner-border text-warning' role='status'><span class='sr-only'>Loading...</span></div>";
  loading: boolean = true;
  constructor(
  		private route: ActivatedRoute,
  		private http: HttpClient,
  		private es: EventsService
  	) {}

  ngOnInit() {
  	if(!this.event){
      const id = +this.route.snapshot.paramMap.get('id');
      this.es.getEvent(id)
        .subscribe( res => {
          this.loading = false;
          console.log(res);
          this.event = res['EventData'][0];
          this.event.availableTicketCount = res.availableTicketCount;
          this.event.redeemedTicketCount = res.redeemedTicketCount;
        });
  		// console.log(id);
  		// this.event = this.es.getEvents().find((event, ind) => {
        // console.log(event, ind);
  			// return id == event.id;
  		// });
  	}else{
  		this.currentUrl = window.location.pathname.trim() == "/events";
  	}
  }

  ngAfterViewInit(){
  	// console.log(this);
  }

  refreshCounters(event_id){
    this.resetNotification();
    this.loading = true;
    this.es.getEvent(event_id)
      .subscribe( res => {
        console.log('refresCounters', res);
        this.event.availableTicketCount = res.availableTicketCount;
        this.event.redeemedTicketCount = res.redeemedTicketCount;
        this.loading = false;
      })
  }

  addTicketHandle(event_id){
    this.loading = true;
    this.es.createTicket(event_id)
      .subscribe(res => {
        this.notification = "Event ticket created successfully";
        this.loading = false;
        setTimeout(() => {
          this.refreshCounters(event_id);            
        }, 1000);
        // this.refreshCounters(event_id);
      })
  }

  redeemTicketHandle(event_id)
  {
    console.log(event_id);
    this.loading = true;
    this.es.redeemTicket(event_id)
      .subscribe(res => {
          this.notification = res.message;
          this.loading = false;
          if(!res.message.match(/(No)/g)){
            setTimeout(() => {
              this.refreshCounters(event_id);            
            }, 2000);
          }
      },
      err => {
        // console.log(err.message);
        // this.notification = err.message;
      });
  }

  downloadOkTickets(event_id)
  {
    this.es.downloadOkTickets(event_id)
      .subscribe(res => {
        if(res.length){
          const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'EventID: '+event_id+' - '+'Available Tickets',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
          }
          const csvExporter = new ExportToCsv(options);
          csvExporter.generateCsv(res);
        }else{
          this.notification = "No Data to generate csv";
        }
      },
      (err) => {
        console.log('err', err);
      });
  }

  downloadNewTickets(event_id)
  {
    this.es.downloadNewTickets(event_id)
      .subscribe(res => {
        if(res.length){
          console.log('downloadnewTickets', res);
          const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'EventID: '+event_id+' - '+'New Tickets',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
          }
          const csvExporter = new ExportToCsv(options);
          csvExporter.generateCsv(res);
        }else{
          this.notification = "No Data to generate csv";
        }
      });
  }

  resetNotification(){
    this.notification = null;
  }
}
