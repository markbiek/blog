Title: Twitter Search API:  Make millions, wow your friends.
Date: 2009-03-01 22:11
Author: mark
Category: Programming
Tags: php, twitter, twitterapi
Slug: twitter-search-api-make-millions-wow-your-friends

Like the rest of the Twitter API, the [Search API][] is dead simple to
use. Another nice thing is that the Search API is **not** rate-limited
(although I'm sure you could abuse it enough to get blocked if you
really tried.)

-   Find tweets containing a word:
    https://search.twitter.com/search.atom?q=twitter
-   Find tweets from a user:
    https://search.twitter.com/search.atom?q=from%3Aantelopelovefan
-   Find tweets to a user:
    https://search.twitter.com/search.atom?q=to%3Aantelopelovefan
-   Find tweets referencing a user:
    https://search.twitter.com/search.atom?q=%40antelopelovefan
-   Find tweets containing a hashtag:
    https://search.twitter.com/search.atom?q=%23stackoverflow
-   Combine any of the operators together:
    https://search.twitter.com/search.atom?q=movie+%3A%29


The above examples return the results as an [Atom][] feed. Like the
other API calls, changing **.atom** to **.json** or **.rss** will you
give you results back in JSON or RSS.

There are a number of different [optional url parameters][Search API]
that can be passed with a Search request. I'll just mention a couple of
the more useful ones.

-   **rpp**: the number of tweets to return per page, up to a max of
    100.
-   **page**: the page number (starting at 1) to return



And that's pretty much enough to get rolling with the Twitter Search
API.

That didn't seem like enough for an entire post so I decided to have a
little fun with the PrototypeJS [PeriodicalExecuter][] and the Search
API.

I introduced a few simple classes in my [last post on Twitter][]
including the [TRequest][] class for making Twitter API requests. For
this exercise, I've thrown together a simple [TSearch][] class for doing
searches.

First a little bit about the PeriodicalExecuter. Basically it's just a
wrapper around *clearInterval/setInterval* and lets you execute a
function repeatedly on an interval.

Here's an example that will pop up a prompt every 5 seconds until OK is
clicked:


~~~~ {.javascript name="code"}
new PeriodicalExecuter(function(pe) {  if (confirm('Ready to stop?'))    pe.stop();}, 5);
~~~~



Our little example tonight is going to be a web page that queries the
Twitter Search API on a timer. Each request will fetch a single search
result and display it.

Here's the Javascript. It does an Ajax request inside the
PeriodicalExecuter to a small PHP service that handles querying the
Search API.


~~~~ {.javascript name="code"}
Event.observe(window, 'load', function() {    new PeriodicalExecuter( function(pe) {        if($('pestatus').value == 'stop'){            pe.stop();            return;        }        new Ajax.Request('lib/services/get-search-result.php', {            method:  'get',            parameters:  {},            onSuccess:  function(response, jsonHeader) {                try {                    if(jsonHeader['status'] == 'Success') {                        alert(response.responseText);                    }else {                        alert(jsonHeader['status']);                        pe.stop();                    }                }catch(e) {                    alert('Could not get next search result because an error ocurred. (' + e.message + ')');                    pe.stop();                }            },            onFailure:  function() {                alert('Could not get next search result because an error ocurred.');                pe.stop();            }        });    }, 5);});
~~~~



And here's the code for the PHP service, **get-search-result.php**. Even
though searches aren't rate-limited, I decided to put some limits on my
end just to minimize my outgoing bandwidth. Like most of these little
exercises, it doesn't really matter in this simple setting. But my
feeling is that it doesn't hurt to at least be dimly aware of these
kinds of considerations.

Here's how it works:

-   The first time called, the service calls the Search API and gets the
    first 15 search results from page one.
-   A single search result is popped off the results array and returned
    as the output. The remaining search results are stored to a SESSION
    variable along with the page number (1, in this case).
-   Future calls continue popping results off the array until there are
    no results left.
-   Then we increment the page number and do another call to the Search
    API for the next 15 results.


The process repeats for as long there are results to be retrieved.


~~~~ {.php name="code"}
$jsonHeader = array();try {    if(count($_SESSION['searchResults']) <= 0) {        unset($_SESSION['searchResults']);        $_SESSION['searchPageNum']++;    }    $searchTerm = 'antelope';    if(!isset($_SESSION['searchPageNum'])) {        $_SESSION['searchPageNum'] = 1;    }    $pageNum = $_SESSION['searchPageNum'];    if(!isset($_SESSION['searchResults'])) {        $req = new TSearch($searchTerm, $TWITTER_USER, $TWITTER_PASS, $pageNum);        $_SESSION['searchResults'] = $req->data->results;    }    $results = $_SESSION['searchResults'];    $cur = array_pop($results);    $_SESSION['searchResults'] = $results;    $jsonHeader['status'] = 'Success';}catch(Exception $e) {    $jsonHeader['status'] = $e->getMessage();}if(is_array($jsonHeader) and sizeof($jsonHeader) > 0)  {      header('X-JSON: (' . json_encode($jsonHeader) . ')');  }  echo $cur->text;
~~~~



  [Search API]: https://apiwiki.twitter.com/Search+API+Documentation#Search
  [Atom]: https://en.wikipedia.org/wiki/Atom_(standard)
  [PeriodicalExecuter]: https://www.prototypejs.org/api/periodicalExecuter
  [last post on Twitter]: https://mark.biek.org/blog/2009/02/writing-a-simple-twitter-bot-in-php/
  [TRequest]: https://mark.biek.org/blog/static/TRequest.htm
  [TSearch]: https://mark.biek.org/blog/static/TSearch.htm
