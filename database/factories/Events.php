<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Events;
use Faker\Generator as Faker;

$factory->define(Events::class, function (Faker $faker) {
    return [
        "name" => $faker->sentence($nbWords = 1),
        "date" => Carbon\Carbon::now(),
    ];
});
