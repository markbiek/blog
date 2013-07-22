Title: Un-befuddling OpenID
Date: 2008-10-16 09:05
Author: mark
Category: Programming
Tags: openid
Slug: un-befuddling-openid

Lots of "medium-to-high internet savvy" users are "befuddled by OpenID",
or so says [Yahoo's usability study][].

</p>

The above is something that I just don't get. On other hand, I program
for a living so maybe my brain is broken in a way that normal people's
aren't.

</p>

So this is my attempt to de-mystify [OpenID][].

</p>

## What's an OpenID?

</p>

When it comes right down it, an OpenID is **just a url**. It's a regular
old url like *http://www.cnn.com* or *http://antelopelovefan.com*.

</p>

**But it's a special url, under your control, that lets you log into
other web pages.** Instead of having a username or using your email
address, you use your special url!

</p>

## Why do I care?

</p>

There are lots of reasons to care.

</p>

1.  You only have one username and password that you can use on lots of
    different sites. (Don't worry, the number of sites that support
    OpenID will start going up).
2.  You can control how much personal information gets sent to the site
    you're logging into.
3.  (And I think this is the most important one) **You don't have to
    trust the site you're logging into**. The site you're logging into
    doesn't get to know your password because someone else (your OpenID
    provider (more on that in a minute) ) is responsible for
    authenticating you.

</p>

## How do I get an OpenID?

</p>

There are lots of different ways to [get an OpenID][].

</p>

If you have an account with [Flickr][], [Blogger][], [AOL][], [Yahoo][],
and [a bunch of others][get an OpenID], *you already have an OpenID*.

</p>

That said **I recommend [myOpenID][]**. It's easy to use, well
implemented, and has lots of nice features like easy support for
multiple profiles, etc.

</p>

## But wait! There's another way!

</p>

Now I said that I use myOpenID as my provider. But I **don't** actually
use my myOpenID url when I log into sites. I've created an *OpenID
Delegate*.

</p>

This means that I have a url that I created myself which then hands
authentication over to myOpenID. The great thing about this is I can
dump myOpenID today, start using some other provider, and still use the
same url to log into all of my sites.

</p>

Here's how you do it:

</p>

You need a url somewhere that you control. I have my own hosted websites
so I just created the url [http://antelopelovefan.com/id][].

</p>

Let's look at the source for that page

</p>

<p>
    <html>    <head>        <link rel="openid.server" href="http://www.myopenid.com/server" />        <link rel="openid.delegate" href="http://antelopelovefan.myopenid.com/" />    </head>    <body></body></html>

</p>

That's all there is to it. The **openid.server** tag says that my
authentication is going to be handled through myOpenID and the
**openid.delegate** tag tells what my special OpenID url is.

</p>

## Can I see an example of how this works?

</p>

Well, since you asked so nicely, OK.

</p>

-   I go to [StackOverflow][] and click the *login* link

</p>

![image][]

</p>

-   It asks for my OpenID (which is http://antelopelovefan.com/id). You
    can see helpful links to lots of other providers.

</p>

![image][1]

</p>

-   I click **Login** and I get sent over to myopenid.com where I have
    to answer my password. Now remember that it's myopenid.com that
    knows my password, **not** StackOverflow. I don't to trust that
    shifty [Jeff Atwood][] with my password. Just kidding. Jeff Atwood's
    awesome. I'd totally tell him my password! But not anyone else.

</p>

![image][2]

</p>

-   Once I've authenticated with myOpenID, it asks if I really want to
    go on and sign into StackOverflow. It also gives me to option to
    skip this step next time. This is handy because I can set
    StackOverflow to remember me, set myOpenID to remember me, and never
    have to log into either again (until I clear my cookies).

</p>

![image][3]

</p>

-   An, voila! I'm logged into StackOverflow.

</p>

![image][4]

</p>

  [Yahoo's usability study]: http://developer.yahoo.com/openid/bestpractices.html
  [OpenID]: http://openid.net/
  [get an OpenID]: http://openid.net/get/
  [Flickr]: http://www.flicker.com
  [Blogger]: http://www.blogspot.com
  [AOL]: http://openid.blogspot.com
  [Yahoo]: http://openid.yahoo.com
  [myOpenID]: https://www.myopenid.com/
  [http://antelopelovefan.com/id]: http://antelopelovefan.com/id
  [StackOverflow]: http://stackoverflow.com
  [image]: http://farm4.static.flickr.com/3048/2947052022_70620a2628.jpg?v=1224162654
  [1]: http://farm4.static.flickr.com/3152/2946241717_c7af2bf3aa.jpg?v=0
  [Jeff Atwood]: http://www.codinghorror.com
  [2]: http://farm3.static.flickr.com/2165/2947052024_0eb4f15dca.jpg?v=1224162574
  [3]: http://farm4.static.flickr.com/3048/2947052014_2cf2e98383.jpg?v=1224162761
  [4]: http://farm4.static.flickr.com/3208/2947052020_692465cf55.jpg?v=1224162681
