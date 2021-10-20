Title: Writing a simple Twitter-bot in PHP
Date: 2009-02-17 23:40
Author: mark
Category: Programming
Tags: bot, php, twitter, twitterapi
Slug: writing-a-simple-twitter-bot-in-php

OK kiddos, buckle up because today we're going to write a simple PHP
Twitter-bot that:

-   Gets a list of a user's direct messages.
-   For each direct message, replies with the current date and time.



You're going to need a few things to get started:

1.  You'll need two [Twitter][] accounts. One that you can send messages
    from and another to make API calls.
2.  A web server with PHP 5+ and cURL. I've done this on both CentOS 5
    and [XAMPP][] on Windows.



The Twitter [REST API][] is very well written and simple to use. Since
it's a [RESTful][] API, all we're doing is using cURL to call various
URLs. Retrieving data is a GET request while sending/deleting data is a
POST request.

**Step 1: Get a list of direct messages**


~~~~ {.php name="code"}
$username = "Your Twitter Username";$password = "Your Twitter Password";$url = "http://twitter.com/direct_messages.json";$httpReq = curl_init();curl_setopt($httpReq, CURLOPT_URL, $url);curl_setopt($httpReq, CURLOPT_RETURNTRANSFER, true);curl_setopt($httpReq, CURLOPT_USERPWD, $username . ':' . $password);$jsonret = curl_exec($httpReq);curl_close($httpReq);$data = json_decode($jsonret);
~~~~



We're doing a GET of **http://twitter.com/direct\_messages** and sending
our Twitter username & password via HTTP Basic Authentication (the only
authentication Twitter fully supports so far).

Here's the fun part. See that **.json** at the end of the URL?

That's telling Twitter that we want the direct message results back in
JSON format. We could just as easily get back results in XML (**.xml**)
or RSS (**.rss**)

I like to get JSON-encoded responses because then I can turn them into
PHP objects with [json\_decode][].

In this case **$data** is an Array of PHP **stdClass** objects.


~~~~ {.php name="code"}
Array(    [0] => stdClass Object        (            [sender] => stdClass Object                (                    [description] =>                    [screen_name] => antelopelovefan                    [url] => http://antelopelovefan.com                    [name] => Mark Biek                    [protected] =>                    [profile_image_url] => http://s3.amazonaws.com/twitter_production/profile_images/74213403/m34_tiny_normal.png                    [location] =>                    [id] => 3556041                    [followers_count] => 17                )            [created_at] => Mon Feb 16 21:41:34 +0000 2009            [recipient_id] => 99999999            [sender_id] => 3556041            [recipient] => stdClass Object                (                    [description] =>                    [screen_name] => faketwitterbot                    [url] =>                    [name] => Fake Twitter Bot                    [protected] =>                    [profile_image_url] => http://static.twitter.com/images/default_profile_normal.png                    [location] =>                    [id] => 99999999                    [followers_count] => 1                )            [sender_screen_name] => antelopelovefan            [text] => This is another test message            [id] => 60474989            [recipient_screen_name] => faketwitterbot        ))
~~~~



With the above, it's trivial to iterate over the list of messages.


~~~~ {.php name="code"}
foreach($data as $message) {  echo 'Message from ' . $message->sender->screen_name . '';}
~~~~



Now that we can get our hands on the direct messages, it's time to send
a response.

Again, this is really easy. It's just a matter of using the correct URL
and POSTing the correct values to it. This code is just like the code to
retrieve the list of messages


~~~~ {.php name="code"}
$username = "Your Twitter Username";$password = "Your Twitter Password";$url = "http://twitter.com/direct_messages/new.json";$postData = array('user'=>'antelopelovefan', 'text'=>'The current date/time is ' . date('c'));$httpReq = curl_init();curl_setopt($httpReq, CURLOPT_URL, $url);curl_setopt($httpReq, CURLOPT_RETURNTRANSFER, true);curl_setopt($httpReq, CURLOPT_USERPWD, $username . ':' . $password);curl_setopt($httpReq, CURLOPT_HTTPHEADER, array('Expect:'));curl_setopt($httpReq, CURLOPT_POST, true);curl_setopt($httpReq, CURLOPT_POSTFIELDS, $postData);$jsonret = curl_exec($httpReq);curl_close($httpReq);$data = json_decode($jsonret);
~~~~



The only difference here is that, since we're sending data to the API,
we need to use POST instead of GET.

We also pass a couple of parameters with the request. The first is the
Twitter username of the person we're sending the message to and the
second is the message itself (remember, 140 characters max!). The return
value is an encoded copy of the message you just sent.

We probably don't want to respond to the same messages over and over so
let's delete each message when we're done.


~~~~ {.php name="code"}
foreach($data as $message) {  $username = "Your Twitter Username";  $password = "Your Twitter Password";  $url = 'http://twitter.com/direct_messages/destroy/' . $message->id . '.json';  $httpReq = curl_init();  curl_setopt($httpReq, CURLOPT_URL, $url);  curl_setopt($httpReq, CURLOPT_RETURNTRANSFER, true);  curl_setopt($httpReq, CURLOPT_USERPWD, $username . ':' . $password);  curl_setopt($httpReq, CURLOPT_HTTPHEADER, array('Expect:'));  curl_setopt($httpReq, CURLOPT_POST, true);  $jsonret = curl_exec($httpReq);  curl_close($httpReq);  $data = json_decode($jsonret);}
~~~~



In this case, the return is a list of the remaining messages.

There are lots of [Twitter libraries][] in different languages. However,
as part of this exercise, I've written a couple of simple PHP classes.

-   [TRequest.php][] is a base class for doing Twitter requests. The
    idea was to build specific types of requests on top of this class.
-   [TDirectMessages.php][] is a simple class for handling direct
    messages and extends TRequest.



And here's the code for implementing a [simple Twitter-bot][] like the
one I described above.

  [Twitter]: https://twitter.com/signup
  [XAMPP]: http://www.apachefriends.org/en/xampp.html
  [REST API]: http://apiwiki.twitter.com/REST+API+Documentation
  [RESTful]: http://en.wikipedia.org/wiki/Representational_State_Transfer
  [json\_decode]: http://us3.php.net/manual/en/function.json-decode.php
  [Twitter libraries]: http://apiwiki.twitter.com/Libraries
  [TRequest.php]: http://mark.biek.org/blog/static/TRequest.htm
  [TDirectMessages.php]: http://mark.biek.org/blog/static/TDirectMessages.htm
  [simple Twitter-bot]: http://mark.biek.org/blog/static/SimpleTwitterBot.htm
