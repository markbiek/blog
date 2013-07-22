Title: Foray into the Google App Engine
Date: 2008-10-20 09:46
Author: mark
Category: Programming
Tags: google-appengine, python
Slug: foray-into-the-google-app-engine

I've been hearing a lot (good and bad) about the [Google App Engine][].

</p>

Aside from the fears of ~~Skynet~~ Google ruling the world, I find the
idea of the App Engine really fascinating. To not have to worry about
the normal scaling issues! To be able to wield the raw power of Google!

</p>

Of course it's not like I really need that power for the scale I'm
operating on so I guess the best reasons are

</p>

-   because it's neat
-   because I need a Python hobby project

</p>

So I've decided to write a comment engine that uses the App Engine for
the back end.

</p>

Here are my goals:

</p>

-   Be able to use it for comments across multiple sites
-   Be able to access it from any language that supports HTTP requests
    and JSON.
-   Be at least slightly difficult to spam.

</p>

That last one is going to be tricky.

</p>

My plan so far is that each site that uses the comment engine will get a
secret key that it uses to send requests. That should (hopefully)
prevent people from submitting comments all willy-nilly from a
non-authorized site. The sites themselves will also need to have some
mechanism at the comment-posting level to make it slightly harder for
spammers.

</p>

And that's only for posting. I've decided that it doesn't matter
retrieves comments.

</p>

At this point, I'm just focusing on putting comments in and getting
comments back out. Some method for managing (ie deleting) comments and
sites will come later.

</p>

* * * * *

</p>

### Hello World!

</p>

Following the [Getting Started][] guide got me a very simple 'hello
world' app in about 5 minutes (running locally). Actually deploying the
thing to Google was as easy as could be.

</p>

### Friendly URLs

</p>

I'd figured out roughly how I wanted the various urls to work but I was
having some trouble figuring out how to implement friendly urls. Some
googling lead me to this:

</p>

<p>
~~~~ {.python name="code"}
application = webapp.WSGIApplication(                                     [                                       ( '/', MainPage),                                       ( r'/get/(.*)/(.*)', HandleFoo)                                     ], debug=True)
~~~~

</p>

You saw in the Getting Started guide (which you read already, right?)
how to set up your application as an WSGI application. The above is
defining the application and the urls it handles. Each url is bound to a
class.

</p>

In the case of the MainPage class, we're handling the just root url '/'.

</p>

In the case of HandleFoo, we're using a regular expression for the url.
The neat part happens when we define the HandleFoo class.

</p>

<p>
~~~~ {.python name="code"}
class HandleFoo(webapp.RequestHandler);    def get(self, foo, bar):        self.response.out.write(foo)        self.response.out.write(bar)
~~~~

</p>

Remember our regular expression from before?

</p>

<p>
    /get/(.*)/(.*)

</p>

This handles any url in the form **/get/stuff/morestuff** and hands that
request off to the HandleFoo class (which is only handling GET requests,
hence the **get** method).

</p>

Each item in the regular expression that's surrounded by parentheses
gets passed as a parameter to the **get** method of the class.

</p>

So, for the url **/get/stuff/morestuff**, the **get** method is going to
output

</p>

<p>
    'stuff''morestuff'

</p>

And there you have it. Friendly urls with the Google App Engine.

</p>

I'm off to figure out how the [simplejson][] library works.

</p>

  [Google App Engine]: http://code.google.com/appengine/
  [Getting Started]: http://code.google.com/appengine/docs/gettingstarted/
  [simplejson]: http://simplejson.googlecode.com
