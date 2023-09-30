Title: Uniqueness of US City Names
Date: 2023-09-22 16:32:00
Author: mark
Category: Misc
Tags: learning,data
Slug: us-city-names

I've traveled around the USA a lot in my life and I've always noticed how many city names are re-used from state-to-state (not to mention US cities that use names from other countries)!

On a trip to Bowling Green, KY a couple of years ago, we accidentally booked a hotel for Bowling Green, OH and I started to wonder: How many unique city names are there?!?

So, today, I decided to try and roughly quantify it. I found this great free database of US cities from [SimpleMaps](https://simplemaps.com/data/us-cities) which has 30,844 US cities listed in a convenient CSV format.

I threw together a simple PHP script to process the data and here's what I found.

Out of 30,844 US cities, there were 16,782 cities with unique names (about 54%).

And the most common city names (which I defined as cities that were duplicated 15 times or more) are:

* Franklin (29)
* Fairview (24)
* Marion (23)
* Clinton (23)
* Greenville (22)
* Springfield (21)
* Madison (21)
* Georgetown (20)
* Centerville (20)
* Kingston (20)
* Arlington (19)
* Salem (19)
* Clayton (19)
* Washington (18)
* Dayton (18)
* Oakland (18)
* Lexington (18)
* Princeton (18)
* Waverly (18)
* Cleveland (17)
* Jackson (17)
* Manchester (17)
* Fairfield (17)
* Burlington (17)
* Hillsboro (17)
* Auburn (17)
* Ashland (17)
* Riverside (16)
* Buffalo (16)
* Trenton (16)
* Mount Vernon (16)
* Farmington (16)
* Milton (16)
* Chester (16)
* Jamestown (16)
* Jefferson (16)
* Fulton (16)
* Columbus (15)
* Bridgeport (15)
* Columbia (15)
* Albany (15)
* Aurora (15)
* Henderson (15)
* Monroe (15)
* Utica (15)
* Middletown (15)
* Florence (15)
* Troy (15)
* Lebanon (15)
* Weston (15)
* Hamilton (15)
* Danville (15)
* Liberty (15)
* Oxford (15)
* Newport (15)
* Hudson (15)
* Midway (15)
* Oak Grove (15)
* Union (15)

Here's a [Github project](https://github.com/markbiek/us-city-frequency) which has a basic composer file and docker setup for running locally.

And here's the code for parsing the data:


```
<?php

require_once __DIR__ . '/vendor/autoload.php';

use League\Csv\Reader;

$csv = Reader::createFromPath(__DIR__ . '/uscities.csv', 'r');
$csv->setHeaderOffset(0);
$header_offset = $csv->getHeaderOffset();
$header = $csv->getHeader(); 

$results = [];

$records = $csv->getRecords();
$cities = [];
foreach ($records as $offset => $record) {
	$cities[] = $record['city_ascii'];
	$clean_name = preg_replace('/[^A-Za-z0-9]/', '', $record['city_ascii']);

	if ( ! isset($results[$clean_name])) {
		$results[$clean_name] = [
			'count' => 0,
			'name' => $record['city_ascii'],
		];
	}

	$results[$clean_name]['count']++;
}

uasort($results, function($a, $b) {
	if ($a['count'] == $b['count']) {
		return 0;
	}

	return $a['count'] > $b['count'] ? -1 : 1;
});

$common_cities = array_filter($results, function($city) {
	return $city['count'] >= 15;
});

$unique_cities = array_filter($results, function($city) {
	return $city['count'] === 1;
});

$unique_city_count = count($unique_cities);
$total_city_count = count($cities);

echo "Total cities: $total_city_count<br />";
echo "Unique cities: $unique_city_count<br />";
echo "Percent unique: " . round($unique_city_count / $total_city_count * 100, 2) . "%<br />";

echo "<br />Common cities:<br />";
foreach ($common_cities as $city) {
	echo $city['name'] . ' (' . $city['count'] . ')<br />';
}
```