Title: Converting an RFC 3339 date to a Python timestamp(plus an update to my Google Docs backup script)
Date: 2009-12-23 07:39
Author: mark
Category: Geek, Programming
Tags: googleapi, googledocs, python
Slug: converting-an-rfc-3339-date-to-a-python-timestampplus-an-update-to-my-google-docs-backup-script

I've been working on updating the script to [backup my Google docs][].

One of the biggest issues with the current version is that it's dumb and
always downloads every single file, whether that file has changed or
not. The nightly download is getting slower and slower so I figured it
was time to make the script a bit smarter.

It turns out that the feed containing the [document list][] has an
**<updated\>** property which is, obviously, that last date/time the
file was updated. Pretty handy, huh?

The problem is that date/time stamp was in a format I'd never seen
before:


~~~~ {.python name="code"}
2009-01-26T01:47:26.036Z
~~~~



What?

After some digging, I found the *Entry Update Date* mentioned in the
[Protocol Reference][] which helpfully informed me that the Date is in
[RFC 3339][] format.

Again, what?

A little more digging lead me to the fact that RFC3339 is the date
format used in [ATOM feeds][], which makes sense since that's exactly
what the Google Docs document list is. The format itself is pretty
straightfoward. The **T** separates the date and time portion and the
**Z** is used to specify a numeric time zone offset. In this case, no
**Z** value is provided so we know we're dealing with [GMT][].

My next problem was how best to turn this RFC3339 date into a Python
timestamp. My first instinct was to hack together a quick regex and be
done with it but, in the end, I decided check with [StackOverflow][] to
see if there was a better way to do it.

And I'm glad I checked because I was immediately pointed to [PyFeed][]
by Steven Hastings which, in addition to a handy library for parsing
ATOM feeds, includes a set of functions for manipulating RCF3339 dates.
In particular, the **tf\_from\_timestamp(ts\_string)** function which
takes an RFC3339 string and returns a Python timestamp.

The current version of Doxworker (thanks to [Ben][] for the name, fixing
the spreadsheet downloads, and folder support) can be downloaded
[here][]. You'll need to modify **doxworker.cfg** and you may also need
to modify **main.py** depending on the location of your doxworker.cfg
file.

  [backup my Google docs]: http://mark.biek.org/blog/2009/03/backing-up-your-google-docs/
  [document list]: http://code.google.com/apis/documents/docs/2.0/developers_guide_protocol.html#ListDocs
  [Protocol Reference]: http://code.google.com/apis/gdata/docs/2.0/reference.html
  [RFC 3339]: http://www.ietf.org/rfc/rfc3339.txt
  [ATOM feeds]: http://www.atomenabled.org/developers/syndication/atom-format-spec.php#date.constructs
  [GMT]: http://wwp.greenwichmeantime.com/
  [StackOverflow]: http://stackoverflow.com/questions/1941927/convert-an-rfc-3339-time-to-a-standard-python-timestamp
  [PyFeed]: http://home.blarg.net/~steveha/pyfeed.html
  [Ben]: http://thelocust.org
  [here]: mark.biek.org/blog/static/doxworker.tar.gz
