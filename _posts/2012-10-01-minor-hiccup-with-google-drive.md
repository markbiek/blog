Title: Minor hiccup with Google Drive
Date: 2012-10-01 07:08
Author: mark
Category: Geek
Slug: minor-hiccup-with-google-drive

First of all, I’m a huge fan of Google Drive and Google Docs. In fact,
most of these blog entries are written in Docs and then copied over to
WordPress. I also love Dropbox too so I’ve actually placed my Dropbox
folder *inside* my Google Drive folder.

But I had a disconcerting experience with Google Drive last week.

My domain runs on Google Apps and I’m using the Google Drive client for
OSX. One morning, out of nowhere, the Google Drive client quit with a
*“This service has not been enabled by the administrator of the domain"*
error message.

As the administrator of the domain, I knew that wasn’t true and my first
fear was that I had been hacked. I quickly logged into the Google Apps
dashboard and, after checking everything over thoroughly, I convinced
myself that wasn’t the case.

I also verified that Google Drive was working on my Android phone as
well as my Windows desktop.

It was *just* the OSX client that was having trouble.

I decided to take the approach of letting it sit and seeing if the
problem corrected itself. Sure enough, when I fired the Drive client up
again the next day, it started without errors.

But my troubles weren’t over yet.

The Drive client has behaving as if I was setting it up from scratch and
was asking where I’d like the Google Drive folder to be placed. I
pointed the client at my existing Google Drive folder and was presented
with an error informing me that that location couldn’t be used because
it already contained files. Apparently the client insists on having an
empty folder to start with.

Sigh.

I moved all of my Google Drive files out of the way, pointed the client
the correct place and moved my files back. My hope was that Drive would
be smart enough to know that these files were exactly the same as the
files living in the cloud.

No such luck. Drive started re-syncing *everything* as if it was brand
new.

Another wrinkle that I didn’t notice for a couple of days was that it
was creating duplicate folders for everything.

My Google Drive folder now looked like this:

Dropbox

Dropbox (1)

Files

Files (1)

Photos

Photos (1)

etc...

After some investigating, I verified that the contents of each folder
were exactly the same.

From there, I killed all of the (1) folders and everything has been
running normally every since.

At no point was I in danger of losing anything, although migrating away
would’ve been a pain. But it made me glad that I have a decent backup
plan in place.

Thanks to Google Drive, all of my non-Google-Docs files also live
locally on my machine. I’m also paying for [Backupify][] which backs up
my Drive, Calendar and Gmail.

But the whole experience made me just a little bit nervous.

  [Backupify]: https://www.backupify.com/
