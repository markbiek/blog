Title: Un-befuddling OpenID
Date: 2008-10-16 09:05
Author: mark
Category: Programming
Tags: openid
Slug: un-befuddling-openid

Lots of "medium-to-high internet savvy" users are "befuddled by OpenID",
or so says [Yahoo's usability study][].



The above is something that I just don't get. On other hand, I program
for a living so maybe my brain is broken in a way that normal people's
aren't.



So this is my attempt to de-mystify [OpenID][].



## What's an OpenID?



When it comes right down it, an OpenID is **just a url**. It's a regular
old url like *http://www.cnn.com* or *http://antelopelovefan.com*.



**But it's a special url, under your control, that lets you log into
other web pages.** Instead of having a username or using your email
address, you use your special url!



## Why do I care?



There are lots of reasons to care.



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



## How do I get an OpenID?



There are lots of different ways to [get an OpenID][].



If you have an account with [Flickr][], [Blogger][], [AOL][], [Yahoo][],
and [a bunch of others][get an OpenID], *you already have an OpenID*.



That said **I recommend [myOpenID][]**. It's easy to use, well
implemented, and has lots of nice features like easy support for
multiple profiles, etc.



## But wait! There's another way!



Now I said that I use myOpenID as my provider. But I **don't** actually
use my myOpenID url when I log into sites. I've created an *OpenID
Delegate*.



This means that I have a url that I created myself which then hands
authentication over to myOpenID. The great thing about this is I can
dump myOpenID today, start using some other provider, and still use the
same url to log into all of my sites.



Here's how you do it:



You need a url somewhere that you control. I have my own hosted websites
so I just created the url [http://antelopelovefan.com/id][].



Let's look at the source for that page




    <html>    <head>        <link rel="openid.server" href="http://www.myopenid.com/server" />        <link rel="openid.delegate" href="http://antelopelovefan.myopenid.com/" />    </head>    <body></body></html>



That's all there is to it. The **openid.server** tag says that my
authentication is going to be handled through myOpenID and the
**openid.delegate** tag tells what my special OpenID url is.



## Can I see an example of how this works?



Well, since you asked so nicely, OK.



-   I go to [StackOverflow][] and click the *login* link



![image][]



-   It asks for my OpenID (which is http://antelopelovefan.com/id). You
    can see helpful links to lots of other providers.



![image][1]



-   I click **Login** and I get sent over to myopenid.com where I have
    to answer my password. Now remember that it's myopenid.com that
    knows my password, **not** StackOverflow. I don't to trust that
    shifty [Jeff Atwood][] with my password. Just kidding. Jeff Atwood's
    awesome. I'd totally tell him my password! But not anyone else.



![image][2]



-   Once I've authenticated with myOpenID, it asks if I really want to
    go on and sign into StackOverflow. It also gives me to option to
    skip this step next time. This is handy because I can set
    StackOverflow to remember me, set myOpenID to remember me, and never
    have to log into either again (until I clear my cookies).



![image][3]



-   An, voila! I'm logged into StackOverflow.



![image][4]



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
