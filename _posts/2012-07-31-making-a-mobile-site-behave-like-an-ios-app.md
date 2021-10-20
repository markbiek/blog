Title: Making a mobile site behave like an iOS app
Date: 2012-07-31 03:00
Author: mark
Category: Programming
Slug: making-a-mobile-site-behave-like-an-ios-app

So you’ve created a nice, mobile-friendly website. But now you want it
to seem a little more “app-like".

On iOS, you can create a icon on the home screen by using the “Add to
Home Screen" button in Safari.

![image][]

This nicely hides the browser toolbar at the top. Unfortunately the
footer toolbar is still visible.

Here’s where the [apple-mobile-web-app-capable][] meta tag comes in.

Adding the following meta-tag causes Safari to hide both toolbars and
run in fullscreen mode.


~~~~ {.html name="code"}
<meta name="apple-mobile-web-app-capable" content="yes">
~~~~



There’s one big limitation with **apple-mobile-web-app-capable** though.

By default, it only persists for that single page. Any links to other
pages of the same site will pop open Safari and you’ll be stuck with a
page that isn’t running fullscreen anymore.

Luckily there’s an easy Javascript workaround.


~~~~ {.javascript name="code"}
if(window.navigator.standalone) {    $(document).delegate('a', 'click', function(e) {        e.preventDefault();        location.href = $( event.target ).attr( "href" );      });}
~~~~



  [image]: http://i.imgur.com/TIaPR.png
  [apple-mobile-web-app-capable]: http://developer.apple.com/library/safari/#documentation/appleapplications/reference/SafariHTMLRef/Articles/MetaTags.html
