Title: Can't load XRegExp twice in the same frame
Date: 2011-02-24 15:25
Author: mark
Category: Geek, Programming
Tags: javascript, jquery
Slug: cant-load-xregexp-twice-in-the-same-frame

Have you ever gotten this error when using jQuery to handle DOM events?

**Can't load XRegExp twice in the same frame**

In many cases, I’ve found that to be caused by code like this:


~~~~ {.”javascript” name="”code”"}
$(‘a.foo’).click( function() {  alert(‘You clicked on me!’);});
~~~~



when **a.foo** * doesn’t exist in the DOM yet*.

The fix? Use [jQuery.live()][] to bind to the event.


~~~~ {.”javascript” name="”code”"}
$(‘a.foo’).live( ‘click’, function() {  alert(‘You clicked on me!’);});
~~~~



* * * * *


I've also run into a couple of situations where Chrome Extensions for
formatting JSON & XML also caused this error in some cases. Disabling
those extensions also fixed the error.

Thanks to [this Stackoverflow answer][] for the suggestion.

  [jQuery.live()]: ”http://api.jquery.com/live/”
  [this Stackoverflow answer]: http://stackoverflow.com/questions/6424633/chrome-uncaught-error-cant-load-xregexp-twice-in-the-same-frame/6424780#6424780
