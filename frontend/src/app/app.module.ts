import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    CreateEventComponent,
    TicketComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
