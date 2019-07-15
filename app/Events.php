<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
	protected $fillable = [
		'name', 'date', 'initialTicketCount'
	];
    public function tickets()
    {
    	return $this->hasMany(Tickets::class, 'event_id');
    }
}
