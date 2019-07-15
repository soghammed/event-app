<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Tickets;
use \App\Exports\TicketsExport;

class TicketsController extends Controller
{
    public function create($event_id)
    {
    	return Tickets::create([
    		'event_id' => $event_id,
    		'new_ticket' => true
    	]);
    }

    public function redeem($ticket_id)
    {
    	$ticket = Tickets::find($ticket_id);
    	if($ticket && $ticket->status != 'redeemed')
    	{
	    	$ticket->status = 'redeemed';
    		$ticket->save();    
    		return \Response::json(["result" => "OK"], 200);
    	}else if($ticket->status == "redeemed"){
    		return \Response::json(["result" => "GONE"], 410);
    	}
    }

    public function autoRedeem($event_id)
    {
    	$ticket = Tickets::available($event_id);
        if($ticket){
        	$ticket->status = 'redeemed';
        	$ticket->save();
            return \Response::json(["message" => "TicketID: ".$ticket->id." redeemed successfully"]);
        }else{
            return \Response::json(["message" => "No redeemable tickets remain"]);
        }
    }

    public function status($ticket_id)
    {
    	$ticket = Tickets::find($ticket_id);
    	if($ticket){
			return \Response::json(["result" => $ticket->status], 200);
    	}
    	return \Response::json(["result" => 'Ticket ID out of range', 500]);
    }

    public function okTickets($ticket_id)
    {
    	return Tickets::export($ticket_id);
    }

    public function exportOkTickets($event_id) 
	{
	    return Tickets::where(['event_id' => $event_id, 'status' => 'ok'])->get();
	}

    public function newTickets($event_id)
    {
        return Tickets::where(['event_id' => $event_id, 'new_ticket' => true])->get();
    }
}
