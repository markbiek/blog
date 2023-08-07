Title: Facebook's OpenID Support:  It's cute and all but...
Date: 2009-05-20 19:14
Author: mark
Category: Geek
Tags: facebook, openid
Slug: facebooks-openid-support-its-cute-and-all-but

I was excited when I first heard Facebook was [going to launch support
for OpenID][]. I love OpenID and I wish I could use it in more places.
Having a big name like Facebook supporting OpenID is a big step towards
more widespread acceptance.

I rushed right over to my Account Settings page to link my OpenID url
with my Facebook account. Now I currently use [MyOpenID][] as my
provider but I also have an [OpenID Delegate][] page that I use for most
of my actual logins.

![Delegate page source][]

That lets me specify the [https://antelopelovefan.com/id][OpenID
Delegate] as my login URL but the actual authentication happens through
MyOpenID. This is nice because I won't have to go around changing all of
my identities if I switch from MyOpenID to something else.

Unfortunately, Facebook doesn't seem to support delegate urls.

![Not a valid OpenID url][]

That's a pretty big bummer right there.

Then there's the issue that the automatic login doesn't seem to work.
It's supposed to go like this:

1.  Login into your OpenID provider
2.  That sets a cookie saying your particular OpenID has been
    authenticated.
3.  You go to the Facebook site.
4.  It checks to see if you've authenticated any OpenIDs linked to your
    Facebook account.
5.  If you have, then you get automatically logged into Facebook.



To be fair, it does work ***some of the time***. In my case, it seems to
be about every third time. The rest of time, I just end up at the
Facebook login screen.

Which leads to my final beef.

Even when the automatic login **does** work, I keep running into
situations where I get redirected to the Facebook login screen even
though I'm (in theory) already authenticated). I lost two Facebook
messages this way. I automatically logged in and went to compose a
message. Everything was fine until I actually hit send at which point I
ended up at the login screen and my message was gone.

To sum up, I'm excited that Facebook is trying to support OpenID but I
some big improvements come soon.

  [going to launch support for OpenID]: https://arstechnica.com/web/news/2009/05/facebook-launches-support-for-openid-logins.ars
  [MyOpenID]: https://www.myopenid.com/
  [OpenID Delegate]: https://antelopelovefan.com/id
  [Delegate page source]: https://farm4.static.flickr.com/3344/3548187379_48c077663f_o.jpg
  [Not a valid OpenID url]: https://farm4.static.flickr.com/3551/3549028576_a8d44ca1ef_o.png
