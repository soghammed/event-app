import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { TicketComponent } from './components/ticket/ticket.component';

const routes: Routes = [
	{ 	path: '', redirectTo: "/events", pathMatch: "full" },
	{	path: 'events', component: EventsComponent },
	{	path: 'event/:id',	component: EventComponent },
	{ 	path: 'create-event', component: CreateEventComponent },
	{   path: 'edit-event/:id', component: EditEventComponent },
	{	path: 'status/:id', component: TicketComponent },
	{	path: 'redeem/:id', component: TicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
