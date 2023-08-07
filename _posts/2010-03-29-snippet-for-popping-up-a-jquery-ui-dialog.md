Title: Snippet for popping up a jQuery UI Dialog
Date: 2010-03-29 09:13
Author: mark
Category: Geek, Programming
Tags: jquery, jqueryui
Slug: snippet-for-popping-up-a-jquery-ui-dialog

The [jQuery UI Dialog][] plugin is a nice way of popping up a message on
a page without using the Javascript **alert()** function.

The are lots of different ways and options you can use to actually
display the dialog and control it's behavior. But the most basic method
that I generally use (adapted from [here][]) looks like this:


~~~~ {.javascript name="code"}
function dlg(msg, title) {    var $dialog = $('').html(msg).dialog({ title: title});}
~~~~



Just call the function above with some text and a title and you'll get a
popup that looks just like this (assuming you're using the ui-lightness
[theme][]):

![image][]

Here's a complete example where clicking on a link popups up the dialog


~~~~ {.html name="code"}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"        "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="https://www.w3.org/1999/xhtml">    <head>        <title>Test</title>                <link rel="stylesheet" href="/mbiek/dlg/ui-lightness/jquery-ui.css" type="text/css" media="all" />    </head>    <body>        <a href="#">Click Me!</a>        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js"></script>        <script type="text/javascript">            function dlg(msg, title) {                var $dialog = $('<div></div>').html(msg).dialog({ title: title});            }            $(document).ready( function() {                $('a').click( function(event) {                    dlg('This is a dialog.', 'Yay');                });            });        </script>    </body></html>
~~~~



  [jQuery UI Dialog]: https://jqueryui.com/demos/dialog/
  [here]: https://blog.nemikor.com/2009/04/08/basic-usage-of-the-jquery-ui-dialog/
  [theme]: https://jqueryui.com/themeroller/
  [image]: https://farm5.static.flickr.com/4060/4473473274_0299ed0d62_o.png
