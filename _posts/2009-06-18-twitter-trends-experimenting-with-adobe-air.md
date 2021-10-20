Title: Twitter Trends:  Experimenting with Adobe Air
Date: 2009-06-18 11:01
Author: mark
Category: Geek, Programming
Tags: adobeair, twitter, twitterapi
Slug: twitter-trends-experimenting-with-adobe-air

Now that there are a couple of Adobe Air applications in my regular
toolbox ([Tweet Deck][], in particular), I figured it was time to find
out more about how Air works.

I knew you could create Air applications with [Flash][] (and also
[Flex][]), but I was pleasantly surprised to see that you can also
create Air applications with [HTML/Ajax][].

After working through the [Air SDK tutorial][], I set about writing a
simple Air app that interacts with the [Twitter API][].

#### Step 1: Download & install the [Air SDK][]


The SDK has all of the tools for debugging & packaging Air apps. This is
especially useful for HTML Air apps when you're just working from a text
editor.

#### Step 2: Create the application descriptor file


Every Air app has a descriptor XML file which specifies the application
name, version, window size, etc.


~~~~ {.xml name="code"}
<?xml version="1.0" encoding="UTF-8"?><application xmlns="http://ns.adobe.com/air/application/1.5">    <id>testing.html.TwitterTrends</id>    <version>0.1</version>    <filename>TwitterTrends</filename>    <initialWindow>        <content>TwitterTrends.html</content>        <visible>true</visible>        <width>300</width>        <height>400</height>    </initialWindow></application>
~~~~



#### Step 3: Download any library files you're going to need


You'll need to put a copy of the **AIRAliases.js** file in your project
directory. Among other things, this exposes some helpful debugging
functions, **air.trace()** being one I used a lot for printing messages
to the debug console.

This example makes use of [PrototypeJS][] and [Scriptaculous][] so
you'll also need to download those files and put them in the project
folder. I initially tried including Prototype from [Google Code][] but
the way Air handles sandboxing seems to prevent that.

#### Step 4: Put together some HTML & Javascript to do stuff


Here's what our simple application is going to do:

1.  Make an Ajax call to the Twitter API to get the current top 10
    trends ([http://search.twitter.com/trends/current.json][])
2.  
    
3.  Put the results into a div
4.  Make the div blink when we're done
5.  Wait 60 seconds
6.  Do the whole thing again



And here's the Javascript code for it


~~~~ {.javascript name="code"}
function getTrends() {                new Ajax.Request('http://search.twitter.com/trends/current.json', {                    method:  'get',                    onSuccess:  function(response) {                        try {                            if(response.responseJSON) {                                var json = response.responseText;                                var data = json.evalJSON(true);                                //air.trace(json);                                air.trace(data.as_of);                                //air.trace(data.trends);                                //air.trace(Object.toJSON(data.trends));                                //The actual trend items are in a hash with a single element.                                //The key for that element is the "as_of" date/time string                                //Get the date/time key                                var key = Object.keys(data.trends);                                //This is an array of trend Objects which have name & query elements                                var trends = data.trends[key];                                $('output').innerHTML = '';                                trends.each( function(trend) {                                    var url = 'http://search.twitter.com/search?q=' + escape(trend.query);                                    air.trace(url);                                    $('output').innerHTML += '' + trend.name + '';                                });                                new Effect.Highlight('output');                                air.trace('done');                            }else {                                air.trace('Empty response');                            }                        }catch(e) {                            $('errors').innerHTML += 'Request failed. (' + e.message + ')';                        }                    },                    onFailure:  function() {                        $('errors').innerHTML += 'Request failed.';                    }                });            }            function appLoad() {                air.trace('appLoad()');                getTrends();                //Retrieve the current trends every 60 seconds                new PeriodicalExecuter( getTrends, 60);            }            Event.observe(window, 'load', function() {                appLoad();            });
~~~~



The HTML is pretty basic as well


~~~~ {.html name="code"}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">    <head>        <title>Twitter Trends</title>        <script src="AIRAliases.js" type="text/javascript"></script>        <script src="prototype-1.6.0.3.js" type="text/javascript"></script>        <script src="scriptaculous.js?load=effects" type="text/javascript"></script>        <style type="text/css">            body {                text-align:  left;            }            h3 {                text-align:  center;            }            #MainContent {                width:  250px;                margin:  auto;                padding-left:  10px;            }            #output {                width:  200px;            }        </style>              <script>            //Javascript goes here        </script>    </head>    <body>        <div id="MainContent">            <h3>Twitter Trends</h3>            <div id="errors"></div>            <div id="output"></div>        </div> <!-- /MainContent -->    </body></html>    
~~~~



#### Step 5: Run it!


To run the app in debug mode, run **adl *application-descriptor-file***
(found in the bin directory of your AirSDK install).


> 
> adl TwitterTrends-app.xml
>
> 



If all goes well, you should see something like this:

![Twitter Trends app window][]

You'll also notice some debug messages (courtesy of the air.trace()
function) in the terminal window where you ran the adl command:

![debug message][]

<h4>
Step 6: Package it up
</h5>

Once you have a working app, you might want to actually share it with
other people.

The first step is to create a self-signed certificate to sign your app
with (using the **adt** program in the bin directory of the SDK).


> 
>
> adt –certificate -cn SelfSigned 1024-RSA sampleCert.pfx samplePassword
>
> 



This creates a certificate file **sampleCert.pfx** which has a password
of *samplePassword* that you can use for signing your Air application.

And now you can actually package the whole thing up:


> 
> adt -package -storetype pkcs12 -keystore sampleCert.pfx
> TwitterTrends.air TwitterTrends-app.xml TwitterTrends.html
> AIRAliases.js prototype-1.6.0.3.js scriptaculous.js effects.js
>
> 



The basic format of the command is **adt** -package -storetype pkcs12
-keystore *certificate-name* *output-air-filename*
*list-of-all-files-in-the-app*. Note that you have to explicitly name
**every** file to be included in the app.

Thus concludes our brief Adobe Air tutorial. You can download a [.zip
file][] with all of the files used in this example, including the sample
certificate and a batch file for packaging things up.

  [Tweet Deck]: http://tweetdeck.com/beta/
  [Flash]: http://www.adobe.com/devnet/air/flash/
  [Flex]: http://www.adobe.com/devnet/air/flex/
  [HTML/Ajax]: http://www.adobe.com/devnet/air/ajax/
  [Air SDK tutorial]: http://help.adobe.com/en_US/AIR/1.5/devappshtml/WS5b3ccc516d4fbf351e63e3d118666ade46-7ecc.html
  [Twitter API]: http://apiwiki.twitter.com/
  [Air SDK]: http://www.adobe.com/products/air/tools/sdk/
  [PrototypeJS]: http://www.prototypejs.org/
  [Scriptaculous]: http://script.aculo.us/
  [Google Code]: http://code.google.com/apis/ajaxlibs/documentation/#prototype
  [http://search.twitter.com/trends/current.json]: http://search.twitter.com/trends/current.json
  [Twitter Trends app window]: http://farm4.static.flickr.com/3413/3638165969_0ba229fe56_o.png
  [debug message]: http://farm4.static.flickr.com/3607/3638980812_0d1a0b9916_o.png
  [.zip file]: http://mark.biek.org/blog/static/TwitterTrends.zip
