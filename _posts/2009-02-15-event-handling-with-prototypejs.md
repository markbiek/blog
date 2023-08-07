Title: Event handling with PrototypeJS
Date: 2009-02-15 22:13
Author: mark
Category: Programming
Tags: javascript, prototypejs
Slug: event-handling-with-prototypejs

I've talked about the basics of PrototypeJS a bit before so I hope
you're convinced about the [awesomeness of Prototype][].

Now I want to talk a little more about how Prototype can make event
handling easier.

You're probably used to handling Javascript events by defining a
function and then specifying the different event calls inline. This can
get hard to keep track of over time. You have to remember to add the
function call in every time you add a form element. It can also cause
trouble if you have to change the call for the event because you have to
go and change it everywhere.


~~~~ {.html name="code"}
<head>                function checkboxClick(elem) {                  alert(elem.value);              }  </head><body></body>
~~~~



Now here's the Prototype way


~~~~ {.html name="code"}
<head>      $$('input[type="checkbox"]').each( function(elem) {      Event.observe(elem, 'click', function(event) {        alert(this.value);      });    });  </head><body></body>
~~~~



The functionality here is exactly the same as the first example but
we've taken the important step of **removing the Javascript code from
the HTML**. This makes it easier to change the functionality of click
event as well as making it easier to handle changes to the HTML.

Here's a practical example. Let's say we'd like an easy way to have some
links popup in new windows while other links open in the same window.

In this example, we're going to set it up so that every link with a
class of *offsite* will popup in a new window.


~~~~ {.html name="code"}
<head>            $$('a.offsite').each( function(elem) {            Event.observe(elem, 'click', function(event) {                window.open(this.href, 'offsitewindow');                Event.stop(event);            });        });    </head><body>    Onsite Link    Offsite Link 1    Offsite Link 2    Offsite Link 3</body>
~~~~



We use the **$$** to get all **a** tags with a class of *offsite*. Then
we define a **click** event handler for each link which pops up a new
window.

There's one new thing here to be aware of:


~~~~ {.html name="code"}
  Event.stop(event);
~~~~



This stops the default action of the event. In this case, without it,
clicking on the link would popup in a new window **and** in the current
window.

  [awesomeness of Prototype]: https://mark.biek.org/blog/2009/01/javascript-awesomeness-with-prototype/
