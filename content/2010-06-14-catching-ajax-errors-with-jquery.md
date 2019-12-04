Title: Catching Ajax errors with jQuery
Date: 2010-06-14 13:09
Author: mark
Category: Geek, Programming
Tags: ajax, javascript, jquery
Slug: catching-ajax-errors-with-jquery

I had to debug an issue this morning where an Ajax call ($.getJSON)
failed in every browser except **Firefox**.

Some googling lead to [this answer on Stackoverflow][] which describes
how to setup error handling for ALL Ajax calls in your code.

Like most things with jQuery, it's very simple:


~~~~ {.javascript name="code"}
$(document).ready( function() {        $.ajaxSetup( {            'error':  function(XMLHttpRequest, textStatus, errorThrown) {                alert('Ajax Error:  (' + textStatus + ') ' + errorThrown);            }        }););
~~~~



If you read [that answer][this answer on Stackoverflow], you'll notice
he suggests malformed JSON as the most likely culprit for the callback
to $.getJSON not firing.

I added the above error handler and, sure enough, it was a bad-JSON
error. I ran my JSON through [JSONLint][] to discover an error that I've
run into many times and will, hopefully, someday, remember to look for.


~~~~ {.javascript name="code"}
  [    {"ant":"bear"},    {"cat":"dog"},  ]
~~~~



See that comma after **"dog"}**? Firefox is pretty forgiving about that
sort of thing but Internet Explorer (and Chrome) don't like it. I'm
constantly forgetting about removing that trailing comma, I suspect
because that's perfectly valid when declaring arrays and dictionaries in
Python.

Oh well. And yay for [jQuery][] and [JSONLint][].

  [this answer on Stackoverflow]: http://stackoverflow.com/questions/572991/jquery-getjson-doesnt-trigger-callback/573044#573044
  [JSONLint]: http://www.jsonlint.com/
  [jQuery]: http://jquery.com/
