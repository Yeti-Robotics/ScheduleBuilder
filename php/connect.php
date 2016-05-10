<?php

include("../config/config.php");
$connection = new MongoClient($mongoServer);
$collection = $connection->schedule_builder->schedules;

?>