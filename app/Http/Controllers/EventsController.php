<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Events as EventsResource;
use \App\Events;
use \App\Tickets;

class EventsController extends Controller
{
    //
    public function index(){
    	return view('index');
    }

    public function create(Request $request){
        $request->validate([
            'name' => 'required|string',
            'date' => 'required',
            'initialTicketCount' => 'required'
        ]);

    	$newEvent = Events::create([
    		'name' => $request->name,
    		'date' => $request->date,
    		'initialTicketCount' => $request->initialTicketCount
    	]);

    	if($newEvent){ 
    		for($i = 0; $i < $newEvent->initialTicketCount; $i++)
    		{
    			Tickets::create([
    				'event_id' => $newEvent->id,
    			]);
    		}
    		return \Response::json(['message' => 'success'], 200);
    	}else{
    		return \Response::json(['message' => 'Error occured while creating event'], 401);
    	}
    }

    public function update(Request $request)
    {
        // dd($request, $request->event_id);
        $request->validate([
            'event_id' => 'required'
        ]);

        $event = Events::find($request->event_id) ? Events::find($request->event_id) : die('Event wasn\'t found');
        
        $event->update([
            "name" => trim($request->name) != '' ? $request->name : $event->name,
            "date" => trim($request->date) != '' ? $request->date : $event->date
            // "initialTicketCount" => trim($request->initialTicketCount) != '' ? $request->initialTicketCount : $event->initialTicketCount
        ]);

        return \Response::json(['message' => 'success'], 200);
    }

    public function events(Request $request)
    {
        return new EventsResource(Events::orderBy('id', 'desc')->get());
    }

    public function event($id)
    {
        return [
            "availableTicketCount" => Tickets::availableCount($id),
            "redeemedTicketCount" => Tickets::redeemedCount($id),
            "EventData" => Events::with('tickets')->where('id', $id)->get()
        ];
        // return new EventsResource(Events::with('ticketCount')->where('id', $id));
    }
}
