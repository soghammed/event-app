<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	factory(App\Events::class, 10)->create()->each(function($event){
    		$event->tickets()->save(factory(App\Tickets::class)->make());
    		$event->tickets()->save(factory(App\Tickets::class)->make());
    	});
        // $this->call(UsersTableSeeder::class);
    }
}
