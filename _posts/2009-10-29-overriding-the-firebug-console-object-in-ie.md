Title: Making sure FireBug console calls don't bomb in IE
Date: 2009-10-29 10:39
Author: mark
Category: Geek, Programming
Tags: console, firebug, ie, javascript
Slug: overriding-the-firebug-console-object-in-ie

One of my favorite [FireBug][] features is logging messages from
Javascript to the FireBug [Console][] window using
console.log(‘whatever’).

But one problem is that your Javascript fails in IE because the console
object doesn’t exist. Here’s a very simple workaround that doesn't
support the complete Firebug console syntax but is good enough for
simple cases.

Just put this somewhere where it gets called when the page loads BEFORE
you do any console.log() calls:


~~~~ {.javascript name="code"}
  if(typeof console == "undefined") {        console = new Object();        console.log = function(msg) {            alert(msg);        }    }
~~~~



Now console.log() will still go the Firebug console in FF but will pop
up an alert in IE. You could just easily tweak it to output to a div (or
do nothing) instead of having the alert box.

  [FireBug]: http://getfirebug.com/
  [Console]: http://getfirebug.com/console.html
