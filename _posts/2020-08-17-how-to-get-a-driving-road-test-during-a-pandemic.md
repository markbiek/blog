Title: How to get a driving road test during a pandemic
Date: 2020-08-17 20:02
Author: mark
Category: Geek
Tags: pandemic,programming,php
Slug: how-to-get-a-driving-road-test-during-a-pandemic

My middle son is currently eligible to take the road test[^1] for his driver's license!

The problem is that we're in the middle of a global pandemic so Goverment services are spotty at-best. First the DMV was closed for months, now there's a huge backlog of people trying to get road tests.

The timeline of our attempts went roughly like this:

* Jul 2020 - Check the scheduling website and see they're booked through the end of Aug 2020
* Aug 2020 - Find out that Sep 2020 tests become available on Aug 14
* Aug 13, midnight - Go to scheduling website to find it's crashed.
* Aug 14 - 16 - Periodically check scheduling website to find it's either down or still only showing Aug
* Aug 17 - Site is up and showing schedule for Sep 1 - 18 and *they're all booked* 😡

At this point, I do what any self-respecting programmer would do. I write a script to automate this whole process.

The idea is something like this:

1. Grab the contents of the scheduling webpage
2. Check to see if there are any open days
3. If 2, send me a text message
4. Repeat every few minutes

There are obviously a million ways to go about this so I decided to go with my old standby, PHP[^2].

Here are 3 libraries that made this little script a breeze:

* [Symfony DomCrawler](https://symfony.com/doc/current/components/dom_crawler.html) for parsing HTML
* [Symfony CssSelector](https://symfony.com/doc/current/components/css_selector.html) for doing media queries on our parsed HTML
* [Twilio](https://www.twilio.com/docs/libraries/php) for sending text messages

And here's the code which took less than 20m to cobble together.

<script src="https://gist.github.com/markbiek/02737438c2a8ba56855e07ba53640cf8.js"></script>

The fun part is, I never even had to run it as a cronjob.

On the third manual test, I got a hit for availability on Sep 15, 2020!

[^1]: A little background for anyone outside of the US (or Kentucky).

	Here in Jefferson County Kentucky, you take a written test to get your driver's permit at age 16. With the permit, you can drive as long as there's a licensed adult over 21 in the car with you.
	
	After 6 months of driving with your permit and logging 60h of driving time, you're eligible to take the road test where you have to drive a car with a DMV (Department of Motor Vehicles) employee with you and complete certain tasks (parallel parking, etc). Once you've passed the road test, you get your provisional driver's license which lets you drive without an adult (with some restrictions)

[^2]: Yeah, I know PHP isn't cool. Most of the stuff you hate about it hasn't been an issue since PHP 5 and PHP 7.4 (especially using something like Laravel) is downright tasty. Whatever. You do you.
