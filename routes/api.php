<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/events', array('middleware' => ['api', 'cors'], 'uses' => 'EventsController@events'));

Route::get('/events', 'EventsController@events');

Route::get('/event/{event_id}', 'EventsController@event');

Route::post('/event/create', 'EventsController@create');

Route::post('/event/update', 'EventsController@update');

Route::get('/ticket/create/{event_id}', 'TicketsController@create');

Route::get('/redeem/{ticket_id}', 'TicketsController@redeem');

Route::get('/redeem/autopick/{event_id}', 'TicketsController@autoRedeem');

Route::get('/status/{ticket_id}', 'TicketsController@status');

Route::get('/csv/okTickets/{event_id}', 'TicketsController@exportOkTickets');

Route::get('/csv/newTickets/{event_id}', 'TicketsController@newTickets');