Title: Javascript awesomeness with Prototype
Date: 2009-01-27 22:12
Author: mark
Category: Programming
Tags: google, javascript, prototypejs
Slug: javascript-awesomeness-with-prototype

I've talked a bit about the Ajax features of [Prototype][] in a
[previous post][]. Now I want to talk about some of the other fun things
Prototype can do.

The first thing to do is add the appropriate Prototype includes to your
HTML file. You can do this by downloading the latest version from
[http://www.prototypejs.org][] and hosting it yourself.

Or you can let Google do the hard work by adding this to your HTML
header:

<p>
~~~~ {.html name="code"}
    
~~~~

</p>

The first thing I'll mention is how fantastic the [Prototype API
Documentation][] is. Once you've covered the basics, I highly recommend
spending some time reading through it.

The second thing we're going to do is set up a handler for the window
onload event. You might normally do it like this **<body
onload="someFunction();"\>** but I like the method below because it
keeps all of our javascript separate from the HTML.

<p>
~~~~ {.js name="code"}
Event.observe(window, 'load', function() {    alert('Hello World!');});
~~~~

</p>

The basic format of [Event][].observe is **Event.observe(<element\>,
'<event\>', <event-handling-function\>)**

We could just as easily have done this

<p>
~~~~ {.js name="code"}
function HelloWorld() {    alert('Hello World!');}Event.observe(window, 'load', HelloWorld);
~~~~

</p>

but I generally use the first version. I think having the handling
function inline makes it a little easier to read.

Now let's talk about how easy it is to get objects out of the DOM.
Here's some HTML

<p>
~~~~ {.html name="code"}
        
~~~~

</p>

Let's set up an event handler for the click event on that submit button.
We just need to add a few lines to our existing window load event
handler.

<p>
~~~~ {.js name="code"}
Event.observe(window, 'load', function() {    Event.observe( $('dostuff'), 'click', function() {        alert('Hello World!');    });});
~~~~

</p>

As you can see, we've just added an Event.observe call inside the window
load event handler. The key thing to note is **$('dostuff')**. The **$**
is essentially a shortcut to **document.getElementById** but it's a lot
less to type and the [element][] you get back has loads of handy methods
added to it by Prototype.

Now that we've seen how easy it is to use **$** to get back a single
object, let's talk about dealing with multiple objects.

Here's some more HTML

<p>
~~~~ {.html name="code"}
                                                
~~~~

</p>

Let's update our window load javascript code

<p>
~~~~ {.js name="code"}
Event.observe(window, 'load', function() {    Event.observe( $('dostuff'), 'click', function() {        $$('input[type=checkbox]').each( function(elem) {            alert(elem.id);        });    });});
~~~~

</p>

The example above shows a simple example of the **[$$][]** utility
method which takes a CSS rule as an argument and returns a list of
Prototype-enhanced elements.

In our example, we're using the [each][] method to apply a function to
every item in the list returned by $$.

Here are a few more simple examples of $$:

-   **$$('input')** returns a list all input elements.
-   **$$('td.even')** returns a list of all td elements that have a
    class of *even*
-   **$$('table\#stuff td')** returns a list of all td elements that are
    inside the table element that has an id of *stuff*

</p>

So those are few simple examples of using Prototype to retrieve DOM
elements. I'll come back and cover some other Prototype fun in a later
post.

  [Prototype]: http://www.prototypejs.org/
  [previous post]: http://mark.biek.org/blog/2008/09/from-javascript-to-php-and-back-again/
  [http://www.prototypejs.org]: http://www.prototypejs.org
  [Prototype API Documentation]: http://www.prototypejs.org/api
  [Event]: http://www.prototypejs.org/api/event
  [element]: http://www.prototypejs.org/api/element
  [$$]: http://www.prototypejs.org/api/utility/dollar-dollar
  [each]: http://www.prototypejs.org/api/array#method-each
