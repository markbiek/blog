Title: Facebook's OpenID Support:  Much Improved!
Date: 2009-06-04 07:18
Author: mark
Category: Geek
Tags: facebook, openid
Slug: facebooks-openid-support-much-improved

I decided to give linking my Facebook account to my [OpenID][] delegate
page another go last night.

Lo and behold, it still didn't work. But this time, I got a useful error
message!

![Facebook Error Message][]

After some Googling and reading, I finally figured out that I needed to
add the following two lines to the source of my [delegate page][]. Now I
have a delegate page that works with OpenID 1.1 **and** OpenID 2.0.


~~~~ {.html name="code"}
                
~~~~



Once I got that, I was able to link Facebook to my MyOpenID account. The
weird logging in and out issues I reported a couple of weeks ago also
seem to be resolved.


~~~~ {.html name="code"}
<html>    <head>        <!-- OpenID 2.0 delegate information -->        <link rel="openid2.provider" href="http://www.myopenid.com/server" />        <link rel="openid2.local_id" href="http://yourusername.myopenid.com/" />        <!-- OpenID 1.1 delegate information -->        <link rel="openid.server" href="http://www.myopenid.com/server" />        <link rel="openid.delegate" href="http://yourusername.myopenid.com/" />    </head>    <body>    </body></html>
~~~~



  [OpenID]: http://mark.biek.org/blog/2008/10/un-befuddling-openid/
  [Facebook Error Message]: http://farm4.static.flickr.com/3350/3592405201_ac9a52234c_o.png
  [delegate page]: http://antelopelovefan.com/id
