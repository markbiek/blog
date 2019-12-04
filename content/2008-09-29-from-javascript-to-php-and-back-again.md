Title: From Javascript to PHP and Back Again
Date: 2008-09-29 10:03
Author: mark
Category: Programming
Tags: ajax, javascript, json, php, prototypejs
Slug: from-javascript-to-php-and-back-again

How many times have you had to do this?

-   From Javascript, call some PHP page
-   Have PHP send back some result and/or a status message
-   Javascript checks the result and displays an error or does something
    with the result.

I have a new favorite way to handle this thanks to my new job and
[Prototype][].

Here's the first part, **the call from Javascript to PHP**

```
new Ajax.Request('dostuff.php', {
method:  'get',
parameters:  {'param1':  'this is param 1'},
onSuccess: function() { //do stuff  },
onFailure:  function(){ alert('Fail!');  }
});
```

Pretty straightforward, thanks to Prototype. We do a GET ajax call to
dostuff.php, show an error if the Ajax call fails, otherwise do stuff.

Now the problems are:

1. How do we pass status from the PHP code back to Javascript in a
consistent way?
2. How do we separate status messages from the actual content that PHP is
generating?

We're going to use [JSON][]!

The PHP will look something like this

```
$jsonHeader = array();
if($_REQUEST['param1']){
    echo 'You passed ' . $_REQUEST['param1'] . '</p>';
    $jsonHeader['status'] = 'Success';
}else{
    $jsonHeader['status'] = 'Failed because the request was invalid';
}
if(is_array($jsonHeader) and sizeof($jsonHeader) > 0){
    header('X-JSON: (' . json_encode($jsonHeader) . ')');
}
```

Basically what we're doing is building an associative array with status
info (it could obviously have other fields besides 'status'), converting
the array into JSON format, and passing back the JSON string as part of
the HTTP response header.

*Note that the [json\_encode][] function is only comes with PHP \>= 5.2
by default. If you're running < 5.2, you'll need to install the json
PECL package by hand.*

So what are we supposed to do with this JSON stuff we're getting back
from PHP?

Here's where Prototype really simplifies things.

Let's change the `onSuccess` method of the Ajax call

```
onSuccess:  function(response, jsonHeader){
    if(jsonHeader['status'] == 'Success'){
        //Everything is OK, do stuff 
    }else{
        alert(jsonHeader['status']);
    }
}
```

Prototype has built-in support for parsing X-JSON headers!

All you have to do is add a jsonHeader variable to your response
function and Prototype takes care of turning it back into a nice
associative array for you.

What I like to do is have PHP put an explicit error message into the
status variable. That way, if PHP generates an error, Javascript can
just immediately do something with that error.

So there you have it. Another way using a Javascript framework can make
your life easier.

Why haven't you learned one yet? It doesn't matter which one. Prototype,
jQuery, etc.

**Just go learn one. Right now.**

I'll wait.

  [Prototype]: http://www.prototypejs.org
  [JSON]: http://www.json.org/
  [json\_encode]: http://us3.php.net/manual/en/function.json-encode.php
