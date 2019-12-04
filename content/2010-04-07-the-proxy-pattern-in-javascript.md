Title: The Proxy Pattern in Javascript
Date: 2010-04-07 08:00
Author: mark
Category: Geek, Programming
Tags: javascript, jquery
Slug: the-proxy-pattern-in-javascript

The [jQuery function documentation][] has all kinds of great tidbits it.
One new thing I discovered is the [Proxy Pattern][].

The idea of the proxy pattern is that you wrap a function around an
existing function. This lets you perform additional actions before the
wrapped function is called while the modified function appears exactly
the same to the caller.

Here's a simple example from the documentation


~~~~ {.javascript name="code"}
(function() {    // log all calls to setArray    var proxied = jQuery.fn.setArray;    jQuery.fn.setArray = function() {      console.log(this, arguments);      return proxied.apply(this, arguments);    };})();
~~~~



In this example, the jQuery **setArray** function is proxied. By
wrapping setArray, the arguments passed to setArray are logged, and then
setArray is called normally.

Here's a quick (albeit not terribly useful) example that I came up with:


~~~~ {.javascript name="code"}
(function() {    var proxied = window.alert;     window.alert = function() {         if(typeof console == 'undefined') {             if(typeof proxied.apply == 'function') {                 return proxied.apply(this, arguments);             }else {                 return proxied(arguments[0]);             }         }else {             console.log(arguments[0]);         }     };}) ();
~~~~



In the above case, we're wrapping the **alert**. We check to see if any
sort of console object is available. If a console is defined, we output
the value passed to **alert** to the console instead of displaying the
Javascript alert box. If no console is defined, we call the alert
function normally. We have to include an additional check of the
**apply** function because window.alert doesn't have an apply method in
Internet Explorer 8.

  [jQuery function documentation]: http://docs.jquery.com/Types#Function
  [Proxy Pattern]: http://docs.jquery.com/Types#Proxy_Pattern
