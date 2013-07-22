Title: Where am I?  Where are you?
Date: 2009-03-22 15:54
Author: mark
Category: Programming
Tags: api, google, maps
Slug: where-am-i-where-are-you

Today, we're going to cover the very basics of the [Google Maps API][]
which, like most of the other Google APIs I've been playing with, is
very full-featured and easy to use.

I'll show the basic code to embed a map on a web page and place a marker
at a specific address.

![Map of Washington, DC][]

The first thing to do is add the appropriate script tags to the <head\>
tags of your page.

<p>
~~~~ {.html name="code"}
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.3/prototype.js"></script>    <script src="http://maps.google.com/maps?file=api&v=2&sensor=false        &key=ABQIAAAAJKAoDxf0DXpmiPNGeIJ5_BTGeqkvninRPqN0VBb3AwYRVTSEZxQ5doci0or7L4Elev6DsRR4ertl1A"        type="text/javascript">    </script>
~~~~

</p>

Notice the **key** parameter. That's your API key (which is
domain-specific). You can get your own by [signing up here][].

The first thing to do is create a couple of global variables for the map
& geocoding objects. We initialize the map (giving it a <div\> to put
the map content in), add the zoom control, and enable scroll wheel
zooming. The home function centers the map over the middle of the United
States and sets the zoom level so the whole country is visible.

<p>
~~~~ {.javascript name="code"}
  var geocoder;  var map;    function home() {                        map.setCenter(new GLatLng(37.0625, -95.677068), 3);                    }    Event.observe(window, 'load', function() {                        map = new google.maps.Map2($('map_canvas'));                        geocoder = new GClientGeocoder();                        map.addControl(new GSmallZoomControl3D());                        map.enableScrollWheelZoom();                        home();                    })
~~~~

</p>

Here's the html of the <div\> where the map content gets placed.

<p>
~~~~ {.html name="code"}
        <div id="map_canvas" style="border:1px solid #979797; background-color:#e5e3df; width:400px; height:300px; margin-bottom:  10px;">            <div style="padding:1em; color:gray;">Loading...</div>        </div>
~~~~

</p>

The code for placing a marker is pretty simple. The **point** variable
is a [GPoint][] object which is the Latitude and Longitude of where to
place the marker.

<p>
~~~~ {.javascript name="code"}
    var marker = new GMarker(point);    map.addOverlay(marker);
~~~~

</p>

[This page][] shows the above in action by letting the user enter an
address and place a marker on the map for that address.

<p>
~~~~ {.javascript name="code"}
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">    <head>        <title>Where am I?  Where are you?</title>        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.3/prototype.js"></script>        <script src="http://maps.google.com/maps?file=api&v=2&sensor=false        &key=ABQIAAAAJKAoDxf0DXpmiPNGeIJ5_BTGeqkvninRPqN0VBb3AwYRVTSEZxQ5doci0or7L4Elev6DsRR4ertl1A"        type="text/javascript">        </script>        <script type="text/javascript">                    var geocoder;                    var map;                    function showAddress(address) {                        if (geocoder) {                            geocoder.getLatLng(                                address,                                function(point) {                                    if (!point) {                                        alert(address + " not found");                                    } else {                                        var marker = new GMarker(point);                                        map.addOverlay(marker);                                        marker.openInfoWindowHtml(address);                                    }                                }                            );                        }                    }                    function home() {                        map.setCenter(new GLatLng(37.0625, -95.677068), 3);                    }                    Event.observe(window, 'load', function() {                        Event.observe($('mapit'), 'click', function(event) {                            Event.stop(event);                            if($('address').value) {                                showAddress($('address').value);                            }                        });                        map = new google.maps.Map2($('map_canvas'));                        geocoder = new GClientGeocoder();                        map.addControl(new GSmallZoomControl3D());                        map.enableScrollWheelZoom();                        home();                    })        </script>    </head>    <body>        <div id="map_canvas" style="border:1px solid #979797; background-color:#e5e3df; width:400px; height:300px; margin-bottom:  10px;">            <div style="padding:1em; color:gray;">Loading...</div>        </div>        <textarea id="address" rows="3" cols="35"></textarea><br />        <input type="submit" id="mapit" value="Map It!" />    </body></html>
~~~~

</p>

  [Google Maps API]: http://code.google.com/apis/maps/
  [Map of Washington, DC]: http://farm4.static.flickr.com/3378/3424208483_d8bde4b74c_o.png
  [signing up here]: http://code.google.com/apis/maps/signup.html
  [GPoint]: http://code.google.com/apis/maps/documentation/reference.html#GPoint
  [This page]: http://mark.biek.org/blog/static/mapstest.php
