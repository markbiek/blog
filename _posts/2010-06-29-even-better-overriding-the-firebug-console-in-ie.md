Title: Even better overriding the Firebug console in IE
Date: 2010-06-29 10:55
Author: mark
Category: Uncategorized
Tags: firebug, ie, javascript
Slug: even-better-overriding-the-firebug-console-in-ie

I wrote, a while back, about [Overriding the Firebug console object][]
to prevent IE from throwing errors when you **console.log** all over
your code.

The only problem that first version is that it's too much to type.
Here's a much shorter way of doing it using object literal notation.


~~~~ {.javascript name="code"}
if(typeof console=='undefined'){console={log:function(){}};}
~~~~



It'd be easy to enough add a handler for the **console.debug** function
and to have those functions actually do something in IE (of course you
could also just use [Firebug Lite][]) but I find the snippet above is
good enough for most cases.

  [Overriding the Firebug console object]: http://mark.biek.org/blog/2009/10/overriding-the-firebug-console-object-in-ie/
  [Firebug Lite]: http://getfirebug.com/firebuglite
