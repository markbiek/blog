Title: The PalmOS Browser War That Never Was
Date: 2009-04-29 21:24
Author: mark
Category: Geek, Programming
Tags: browser, palmos
Slug: the-palmos-browser-war-that-never-was

In 2001, I left my first post-college job at [PinPoint Corporation][] to
work for a start-up called [ZFrame][]. A long-time colleague of mine was
one of the co-founders and our somewhat ambitious goal was to write the
next (you could almost argue, the first) major web browser for the
PalmOS.

I loved this job.

First of all, the product was amazing. It was pretty cutting edge and
nobody else had anything like it at the time. Second, we had a great
team with some really sharp developers. Third of all, I got to work from
home full-time for 2 years.

This was a pretty major undertaking considering the state of mobile
computing in 2001, the pinnacle of which was the ubiquitous Omnisky
modem for the Palm V.

![Omnisky Modem][]

We struggled along for a couple of years trying to find our niche before
finally running out of money and closing shop. ZFrame was my first
failed start-up (although just barely since PinPoint went under a few
months after I left) and I'll always remember it fondly.

There were several levels to the architecture behind the browser. We had
a proprietary program that turned regular web pages into a special,
compressed image that contained all kinds of meta-information about the
page. This program could be queried via a Classic ASP web service. The
PalmOS program called out the web service to retrieve the compressed
page data which it then manipulated and displayed in various ways. There
was also a load-balancing component to the server-side so we could have
a number of page compression programs running on multiple machines
(mainly to handle the crushing user load that never materialized).

![ZFrame Network Diagram][]

The PalmOS application was written in C using Metrowerks Codewarrior for
PalmOS. Most of my CS classes in college used C but this was the first
time I'd written production C code and writing for the PalmOS posed a
number of interesting challenges, the main one being small memory space.

For better or worse, our strategy for dealing with memory was to
allocate all of the memory we could possible use right when the
application started. All of the rest of the code would then use chunks
out of this pre-allocated block. This approach would have been tolerable
if we'd written some common malloc/free-like functions to keep track of
what parts of this giant block were in use. No such luck there though.
We relied entirely on discussing, verbally, what range of the memory
block someone should use. As you can imagine, this caused all kinds of
fun bugs when one part of the program would start overwriting the memory
used by another part (although we did manage to get those worked out
before the app actually shipped).

There also problems with code segements getting too large so we were
always having to move code around. Eventually the entire application got
too large and we had to move part of the functionality into a second app
that got launched transparently for some operations.

As far as using the browser went, you entered a url and the Palm device
would initially display a high-level overview of a page which you could
drag the pen over. The drag action would then pop up links and little
snippets of text. (For a more complete feature overview, check out the
[UI demo][]).

![Page Overview][]

You could also zoom in on different areas of the page to see the page in
high resolution.

![Zoomed Page][]

The above view was good for graphics-heavy areas of pages but not so
good for large quantities of text. For that, we had a Text View mode.

![Text Viewer][]![Text View with Links][]

The Text Viewer was my first assignment after I got hired to ZFrame and
served as my introduction to PalmOS programming.

I wrote C module that was handed a big block of text containing a
limited number of HTML tags. I had to parse the text and render it on
the screen taking the HTML into account. The only tags I had to handle
were <p\>, <br\>, <b\>, <i\>, <u\>, and <a\>. I also had to keep track
of links so they could be clickable, including highlighting the links
when the pen was dragged over them.

I spent about 3 weeks working on the Text Viewer and more than half of
that was on making the text scrollable.

The biggest problem was the viewer was too slow if I tried to parse all
of the text at once. In the end, I settled on parsing 2 screenfuls of
text on the initial view. The viewer would the parse a few more
screenfuls each time the user scrolled down a page. Each processed page
was kept in memory so scrolling up and down after the initial parsing
was pretty fast. I also ended up implementing a simple double-buffering
scheme to prevent flicker when changing pages.

In addition to the Text Viewer, I also to got to implement all kinds of
fun features like SSL support and:

Bookmarks

![Bookmarks][]

Email

(This was handled via a special Classic ASP page that the Palm contacted
the main ZFrame service)

![Email][]![Email Inbox][]

In all, working at ZFrame was a fantastic experience. I learned a ton
about C programming and working in an environment with pretty restricted
memory. It was also good from a personal standpoint because, since I was
working from home, I had to make sure that I stayed focused and
organized to hit all of my deadlines.

  [PinPoint Corporation]: https://www.pinpointco.com
  [ZFrame]: https://www.zframe.com/
  [Omnisky Modem]: https://farm4.static.flickr.com/3553/3486066247_4246cb702c_o.jpg
  [ZFrame Network Diagram]: https://farm4.static.flickr.com/3557/3486290633_69ce3f6881_o.png
  [UI demo]: https://www.zframe.com/uidemo.html
  [Page Overview]: https://farm4.static.flickr.com/3304/3487085516_665a31be18_o.jpg
  [Zoomed Page]: https://farm4.static.flickr.com/3639/3487085480_98f3275009_o.jpg
  [Text Viewer]: https://farm4.static.flickr.com/3615/3486271387_01040fd1dd_o.jpg
  [Text View with Links]: https://farm4.static.flickr.com/3410/3486271415_3dce2591e3_o.jpg
  [Bookmarks]: https://farm4.static.flickr.com/3411/3486271681_7fd7319146_o.jpg
  [Email]: https://farm4.static.flickr.com/3548/3486271623_98823f20f7_o.jpg
  [Email Inbox]: https://farm4.static.flickr.com/3332/3487085558_d2fefa1188_o.jpg
