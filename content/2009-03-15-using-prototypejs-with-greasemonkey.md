Title: Using PrototypeJS with Greasemonkey
Date: 2009-03-15 20:19
Author: mark
Category: Programming
Tags: greasemonkey, javascript, prototypejs
Slug: using-prototypejs-with-greasemonkey

For those of you not already hooked on it, [Greasemonkey][] is an
amazing add-on for Firefox that basically lets you inject your own
Javascript into a page on the fly.

Don't like the way a page looks? Want to change things around? Is it a
page that doesn't belong to you? Well, thanks to Greasemonkey, you can
make that page your bitch. The problem is that writing Javascript
without using [PrototypeJS][]^\*^ sucks. It's tedious and you end up
having to write way to much code to do the simplest things.

<small>\*OK, jQuery is fine too.</small>

There are two obstacles we have to overcome to use PrototypeJS in a
Greasemonkey script

1.  Prototype has to be included **on the page the script is running
    on**, not within the Greasemonkey script. Otherwise Prototype won't
    actually be able to access any of the page elements
2.  You have to handle the case where a page is **already** including
    Prototype otherwise you end up including it twice and the whole
    thing dies.
3.  That's not quite it either.

</p>

The Greasemonkey Javascript we're going to write is going to do the
following things

1.  Check the page to see if it's already including Prototype (we'll
    also check for Scriptaculous while we're at it).
2.  If it's not included, add a new <script\> element to the <head\> of
    the page and set the **src** to Prototype
3.  Set up a handler for the window load event
4.  When the window loads, get handles to the Prototype functions we're
    interested in

</p>

Here's a complete script using the above strategy. This particular
example only works for [http://www.cnn.com][]. It does an
**Effect.Shake** and puts a red border on each <img\> tag on the page.

<p>
~~~~ {.javascript name="code"}
// ==UserScript==// @name           Prototype Test// @namespace      http://www.cnn.com// @description    This is a test script// @include        http://www.cnn.com/*// ==/UserScript==var scriptTags = document.getElementsByTagName('script');var addPrototype = true;var addScriptaculous = true;//Loop over all script tags in the page header//and check to see if Prototype or Scriptaculous are already being includedfor(i in scriptTags) {    if( scriptTags[i].src.match(/prototype.*?\.js/) ) {        addPrototype = false;    }    if( scriptTags[i].src.match(/scriptaculous.*?\.js/) ) {        addScriptaculous = false;    }}var scripts = [];var idx = 0;if(addPrototype) {    scripts[idx] = 'http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.3/prototype.js';    idx++}if(addScriptaculous) {    scripts[idx] = 'http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.2/scriptaculous.js';    idx++}//Add any missing script tags to the page headerfor (i in scripts) {    var script = document.createElement('script');    script.src = scripts[i];    document.getElementsByTagName('head')[0].appendChild(script);}//Handler for the window load eventwindow.addEventListener('load', function(event) {    //Get handles to the Prototype and Scriptaculous functions we're going to use    $ = unsafeWindow['window'].$;    $$ = unsafeWindow['window'].$$;    Effect = unsafeWindow['window'].Effect;        $$('img').each( function(elem) {        Effect.Shake(elem);        elem.setStyle( {border:  '3px dotted red'});    });}, 'false');
~~~~

</p>

The important part of the above is this

<p>
~~~~ {.javascript name="code"}
$ = unsafeWindow['window'].$;
~~~~

</p>

The problem is that Greasemonkey doesn't know about the PrototypeJS
functions because they only exist inside the actual page.

The **unsafeWindow** lets us get a handle to the page copy of the the
various PrototypeJS functions.

  [Greasemonkey]: https://addons.mozilla.org/en-US/firefox/addon/748
  [PrototypeJS]: http://www.prototypejs.org
  [http://www.cnn.com]: http://www.cnn.com
