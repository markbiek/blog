Title: Preserving the $ with jQuery.noConflict
Date: 2011-03-11 08:58
Author: mark
Category: Geek, Programming
Tags: javascript, jquery
Slug: preserving-the-with-jquery-noconflict

I occasionally run into a scenario where I have to run [jQuery][]
**and** [PrototypeJS][] on the same site.

Usually this is because it’s an older site that was original written
using Prototype and we’re migrating it over to jQuery. Or other times
it’s just easier to use an existing jQuery plugin for something than to
write a few dozen lines of Prototype from scratch.

It’s easy to run jQuery in parallel with other libraries thanks to
jQuery’s [noConflict][] mode which makes jQuery stop using the **$**
variable.

“But", you say, “Having to type jQuery.whatever() over and over is so
hard compared to typing <code>$.whatever()</code>."

Well, my friend, today is your lucky day. I have a solution for you that
will save you **characters** of typing. Characters!

If all of your code is happening inside of a [jQuery.ready()][] event,
you can do this:

<code>
  jQuery(document).ready(
    function($) {
        $('a’).css('border’, '1px solid red’);
    }
  );
</code>


In the example above, jQuery is passing itself to the ready() function
handler. That means any code instead the ready handler can use **$** to
access the jQuery object.

And if your jQuery code isn’t inside a ready() event? Still easy to
handle:

<code>
(function($) {  
    function makeAllLinksRed() {
        $('a’).css('border’, '1px solid red’);
    }
})(jQuery);
</code>

In this case, we wrap all of our code in an anonymous function that
calls itself, passing in the jQuery object as a single parameter. Now
all of the code inside the anonymous function can use **$** to access
the jQuery object.

  [jQuery]: http://jquery.com/
  [PrototypeJS]: http://www.prototypejs.org/
  [noConflict]: http://api.jquery.com/jQuery.noConflict/
  [jQuery.ready()]: http://api.jquery.com/ready/
