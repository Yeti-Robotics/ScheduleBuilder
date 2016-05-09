<?php

$username = "";
$password = "";
$mongoServer = "";
$connection = new MongoClient($mongoServer);
$collection = $connection->schedule_builder->schedules;

$schedule = $collection->findOne();

var_dump($schedule);

?>