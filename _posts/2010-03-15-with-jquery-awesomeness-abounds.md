Title: With jQuery, Awesomeness Abounds
Date: 2010-03-15 08:13
Author: mark
Category: Geek, Programming
Tags: javascript, jquery
Slug: with-jquery-awesomeness-abounds

While my job has primarily used [PrototypeJS][] in the year-and-a-half
I've been here, we've recently started shifting toward [jQuery][].

My favorite reasons for the switch:

1.  **Vibrant plugin-ecosystem:** — There are easy-to-use and
    well-documented plugins for almost anything you can think of. Plus
    you have great expansions like [jQuery UI][] and [jQTouch][]
2.  **Easy to write, easy to read** — While the basic functionality of
    Prototype and jQuery is pretty similar, I find jQuery code to be
    slightly more compact to write and easier to read.



The [jQuery API][] is full of all kinds of handy functions. I encourage
browsing it on a regular basis. You never know what you may find that
will help solve the problem at hand.

For example, last week I discovered the [jQuery.data()][] function which
lets you store arbitrary data associated with an element. The data is
stored using key/value pairs (and retrieved by key).

I was working on a very simple web-based survey and needed to show/hide
some questions based on the responses to previous questions. I was
originally going to create a global array/hash and do lookups into that,
but the data() function seemed like a cleaner way to handle storing the
show/hide info.

Here's a simple example of how it works.

Let's say our survey consists of the following HTML:


~~~~ {.html name="code"}
        <div id="Questions">            <div id="Q1">                <input type="radio" name="choice" id="choice1" class="showHideTrigger" value="1">gt; Choice 1<br />                <input type="radio" name="choice" id="choice2" class="showHideTrigger" value="2">gt; Choice 2<br />                <input type="radio" name="choice" id="choice3" class="showHideTrigger" value="3">gt; Choice 3<br />            </div>gt; <!-- /Q1 -->            <div id="Q2a" style="display:none;">                2.  This is Q2a:  <input type="text" name="input_q2a" id="input_q2a" value="" />            </div>gt; <!-- /Q2a -->            <div id="Q2b" style="display:none;">                2.  This is Q2b:  <input type="text" name="input_q2b" id="input_q2b" value="" />            </div>gt; <!-- /Q2a -->        </div>gt; <!-- /Questions -->
~~~~



The show/hide pattern is going to look like this:

-   Clicking *Choice 1* shows Q2a and hides Q2b.
-   Clicking *Choice 2* shows Q2b and hides Q2a.
-   Clicking *Choice 3* hides both Q2a and Q2b.



We use the **.data()** to store the meta-information about what to show
and hide. We also set up the click event handler for each of the radio
buttons (technically, anything that has the .showHideTrigger class).


~~~~ {.javascript name="code"}
            $(document).ready( function() {                $('#choice1').data('show', '#Q2a');                $('#choice1').data('hide', '#Q2b');                $('#choice2').data('show', '#Q2b');                $('#choice2').data('hide', '#Q2a');                $('#choice3').data('hide', '#Q2a,#Q2b');                //Setup the event handler for each element that will show/hide                //another element when clicked                $('.showHideTrigger').click( function(event) {                    showHide(this);                });            });
~~~~



And here's the code for the **showHide()** function:


~~~~ {.javascript name="code"}
           function showHide(elem) {                if(elem.checked) {                    if($(elem).data('hide')) {                        $($(elem).data('hide')).each( function(i) {                            $(this).hide();                            this.checked = false;                        });                    }                    if($(elem).data('show')) {                        $($(elem).data('show')).each( function(i) {                            $(this).show();                        });                    }                }            }
~~~~



Every time a radio button is clicked, the function checks to see if it
has "show" or "hide" data associated with it. It assumes that the data
is a valid CSS selector. It then iterates over each item that matches
the selector and shows or hides the elements.

And here's an ultra-compact version courtesy of a colleague at
[notjustahatrack.com][]. I clearly need to get more up to speed on
chaining with jQuery because the code below is much cleaner than my
first pass above.


~~~~ {.javascript name="code"}
$(function () {    $('#choice1').data('show', '#Q2a').data('hide', '#Q2b');    $('#choice2').data('show', '#Q2b').data('hide', '#Q2a');    $('#choice3').data('hide', '#Q2a,#Q2b');    //Setup the event handler for each element that will show/hide    //another element when clicked    $('.showHideTrigger').click( function() {      $($(this).data('show')).show();    $($(this).data('hide')).hide();  });  });  
~~~~



  [PrototypeJS]: https://www.prototypejs.org/
  [jQuery]: https://jquery.com/
  [jQuery UI]: https://jqueryui.com/demos/
  [jQTouch]: https://www.jqtouch.com/
  [jQuery API]: https://api.jquery.com/
  [jQuery.data()]: https://api.jquery.com/data/
  [notjustahatrack.com]: https://notjustahatrack.com/
