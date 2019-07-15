<?php

namespace App\Exports;

use App\Tickets;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\FromCollection;

class TicketsExport implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    private $event_id;

    public function __construct($event_id)
    {
    	$this->event_id = $event_id;
    }

    // public function collection()
    // {
    //     return Tickets::where(['event_id' => $this->event_id, 'status' => 'ok'])->get();
    // }
    public function view(): View
    {
    	return view('exports.tickets', [
    		'tickets' => Tickets::where(['event_id' => $this->event_id, 'status' => 'ok'])->get()
    	]);
    }
}
