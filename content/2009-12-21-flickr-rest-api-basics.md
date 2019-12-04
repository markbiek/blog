Title: Flickr REST API Basics
Date: 2009-12-21 08:55
Author: mark
Category: Geek, Programming
Tags: api, flickr, python
Slug: flickr-rest-api-basics

It's been a while since I've played with the [Flickr API][] and I was
pleasantly surprised by how much easier it's gotten to use. I don't
believe the [REST][] interface was available last time I tried (although
it's possible I was just dumb and missed it) so I ended up using
somebody's PHP XML-RPC class which was a bit clunky.

The REST API is dead-simple to use. The basic url format is


~~~~ {.html name="code"}
  http://api.flickr.com/services/rest/?method=<method-name>&name=value...
~~~~



While only some API calls require authentication, **all** require an
[API key][].

Here's what a call to [flickr.photos.search][] method might look like:


~~~~ {.html name="code"}
  http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=YOURKEY&tags=monkey
~~~~



The above call returns the 100 most recently uploaded photos matching
the tag *monkey*. The **flickr.photos.search** method has lots of other
options that let you customize the search.

You get back a big chunk of XML (there's a parameter to return JSON and
several other formats instead) that looks like this:


~~~~ {.xml name="code"}
<rsp stat="ok">    <photos page="1" pages="3410" perpage="100" total="340901">        <photo id="4195976808" owner="40592053@N02" secret="7605f0aa9f" server="2698" farm="3" title="373" ispublic="1" isfriend="0" isfamily="0"/>        <photo id="4195224913" owner="32143071@N00" secret="199a3c18cb" server="2650" farm="3" title="Q & Milk II" ispublic="1" isfriend="0" isfamily="0"/>    </photos></rsp>
~~~~



Once you have a photo id, you can call [flickr.photos.getinfo][] which,
among other things, lets you get the URL to the page for that photo. You
can also get thumbnail URLs in different sizes with a call to
[flickr.photos.getSizes][].

I decided to do my latest playing around in Python rather than PHP.
Here's a very basic function I threw together for making API calls:


~~~~ {.python name="code"}
def flickrRequest(method, params):    args = '&' + '&'.join([key + '=' + str(params[key]) for key in params.keys()])    url = "http://api.flickr.com/services/rest/?method=" + method + args    resp = urllib2.urlopen(url)    raw_xml = unicode(resp.read(), errors="ignore")    return minidom.parseString(raw_xml.encode("utf-8"))
~~~~



It takes an API method name a dictionary of parameters, then uses
urllib2 to get the XML response. The XML response is parsed using
[minidom][] and the DOM object is returned.

Since this is just for fun, the code basically just glosses over the
Unicode aspect of the response by ignoring any Unicode errors. This lets
us parse the XML at the expense of possible mangling some characters
(generally only in the image title).

This is how the above function would be used to do a simple search:


~~~~ {.python name="code"}
tags = ["monkey", "chimp"]searchParams = {                    'api_key': FLICKR_API_KEY,                    'tags': ','.join(tags),                    'tag_mode': 'any',                    'content_type': 1,                    'page': 1                    'sort': 'date-posted-desc',                    }dom = flickrRequest('flickr.photos.search', searchParams)
~~~~



This searches for any pictures that are tagged *monkey* or *chimp*. This
only returns the first page (the first 100 by default). You can get the
next batch by incrementing the **page** parameter.

Now let's say I want to call **flickr.photos.getInfo** for each image:


~~~~ {.python name="code"}
#This gives me all of the 'photo' nodes in the XMLphotos = dom.getElementsByTagName("photo")for photo in photos:  dom = flickrRequest('flickr.photos.getInfo', {'api_key': FLICKR_API_KEY, 'photo_id': photo.attributes["id"].value})  #The dom object now contains XML with info about the current photo  #You can take a look at the format here:  http://www.flickr.com/services/api/flickr.photos.getInfo.html
~~~~



And that's the basics of using the Flickr REST api. My ultimate goal
with learning the API is to write some sort of script that will let me
backup all of the meta-information (tags, sets, collections,
descriptions) of my Flickr account.

  [Flickr API]: http://www.flickr.com/services/api/
  [REST]: http://www.flickr.com/services/api/request.rest.html
  [API key]: http://www.flickr.com/services/api/misc.api_keys.html
  [flickr.photos.search]: http://www.flickr.com/services/api/flickr.photos.search.html
  [flickr.photos.getinfo]: http://www.flickr.com/services/api/flickr.photos.getInfo.html
  [flickr.photos.getSizes]: http://www.flickr.com/services/api/flickr.photos.getSizes.html
  [minidom]: http://docs.python.org/library/xml.dom.minidom.html
