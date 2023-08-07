Title: How to write a very simple jQuery Plugin
Date: 2011-06-21 10:17
Author: mark
Category: Geek, Programming
Tags: javascript, jquery, plugin
Slug: how-to-write-a-very-simple-jquery-plugin

One of the great things about jQuery is that it's very easy to extend
and has a great [plugin][] ecosystem.

Today, we're going to create a very simple jQuery plugin which will
change the border color of an element.

### Step 1: Protect the global scope


The first thing to do is wrap your plugin code in an anonymous function
that calls itself so we don't pollute the global scope.


~~~~ {.javascript name="code"}
(function($) {})(jQuery);
~~~~



Now any variables we declare inside that function will only exist within
the local scope.

We also pass the main jQuery object to our function. This allows us to
use the $ object even when jQuery is running in [noConflict][] mode.

### Step 2: Create our plugin function and make sure it's chainable


We going to add a function called **borderize** to the jQuery object.


~~~~ {.javascript name="code"}
(function($) {    $.fn.borderize = function(opts) {        return this.each( function() {        });     };})(jQuery);
~~~~



The ** return this.each();** is important because it allows our plugin
to be chainable by returning the object the function is being called on.

That means we'll be able to do things like this:

$('\#Foo').borderize().css('width', '500px');

### Step 3: Setup some default options for the plugin but allow the
end-user to change them.



We set our default border color to red. If **borderize()** is called
without any arguments, the border color will still be red.


~~~~ {.javascript name="code"}
(function($) {    $.fn.borderize = function(opts) {        return this.each( function() {            var settings = {                borderColor: '#00ff00'              };                        if(typeof opts == 'object') {              $.extend(settings, opts);               }        });     };})(jQuery);
~~~~



We use the [$.extend][] function to update our settings object with any
options the user might pass in.


~~~~ {.javascript name="code"}
$('#Foo').borderize( { borderColor: '#000' } );
~~~~



In the above, we're passing in black for the border color. **$.extend**
will overwrite the value of borderColor in **settings** with the value
passed in via **opts**

### Step 4: Make the plugin actually do something



Now that the scaffold of our plugin, we add a call to [$.css][] to
actually change the border color of the passed in object.


~~~~ {.javascript name="code"}
(function($) {    $.fn.borderize = function(opts) {        return this.each( function() {            var settings = {                borderColor: '#00ff00'              };                        if(typeof opts == 'object') {              $.extend(settings, opts);               }                        $(this).css('border', '1px solid ' + settings.borderColor);        });     };})(jQuery);
~~~~



### Step 5: A final demo


Here's a working [jsfiddle demo][]

  [plugin]: https://plugins.jquery.com/
  [noConflict]: https://api.jquery.com/jQuery.noConflict/
  [$.extend]: https://api.jquery.com/jQuery.extend/
  [$.css]: https://api.jquery.com/css/
  [jsfiddle demo]: https://jsfiddle.net/antelopelovefan/EGBcm/
