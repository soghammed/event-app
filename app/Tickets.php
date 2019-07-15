<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
	protected $fillable = [
		'event_id', 'status', 'new_ticket'
	];
	
	public function event()
	{
		return $this->belongsTo(Events::class, 'event_id');
	}


	public static function available($event_id)
	{
		return Tickets::where(['event_id' => $event_id, 'status' => 'ok'])->get()->first();
	}

	public static function redeemed($event_id)
	{
		return Tickets::where(['event_id' => $event_id, 'status' => 'redeemed'])->get()->first();
	}
	
	public static function availableCount($event_id)
	{
		return Tickets::where(['event_id' => $event_id, 'status' => 'ok'])->count();
	}

	public static function redeemedCount($event_id)
	{
		return Tickets::where(['event_id' => $event_id, 'status' => 'redeemed'])->count();
	}

	public static function export($event_id)
	{
	    $headers = array(
	        "Content-type" => "text/csv",
	        "Content-Disposition" => "attachment; filename=file.csv",
	        "Pragma" => "no-cache",
	        "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
	        "Expires" => "0"
	    );

	    $tickets = Tickets::where(['event_id' => $event_id, 'status' => 'ok'])->get();
	    $columns = array('id', 'event_id', 'status', 'new_ticket');

	    $callback = function() use ($tickets, $columns)
	    {
	        $file = fopen('php://output', 'w');
	        fputcsv($file, $columns);

	        foreach($tickets as $ticket) {
	            fputcsv($file, array($ticket->id, $ticket->event_id, $ticket->status, $ticket->new_ticket));
	        }
	        fclose($file);
	    };
	    return \Response::stream($callback, 200, $headers);
	}
	// public static function redeemedCount($eventID)
	// {
	// 	return $tickets->filter(function($ticket, $ind){
	// 		return $ticket->status == "redeemed";
	// 	});
	// }
}
