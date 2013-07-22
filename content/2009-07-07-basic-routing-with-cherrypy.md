Title: Basic page routing with CherryPy
Date: 2009-07-07 21:36
Author: mark
Category: Geek, Programming
Tags: cherrypy, python
Slug: basic-routing-with-cherrypy

My last [CherryPy][] post covered how to set up a very basic site using
the **quickstart()** function. This time, I'm going to go into some
basic details on page handling..

The first thing we're going to do is define a class for handling the
root of our site.

<p>
~~~~ {.python name="code"}
class Root:    def index(self):        return "This is the root"    index.exposed = Trueif __name__ == "__main__":    root = Root()    cherrypy.tree.mount(root, '/')    cherrypy.engine.start()    cherrypy.engine.block()
~~~~

</p>

There's a lot going on in the above so let's break it down starting with
the code that's actually running the site.

First we create an instance of the Root() class and mount it at the url
'/'. Then we start the cherrypy engine. The default behavior in this
case is for the site to run on port 8080 so our site is running on
[http://localhost:8080][].

Hitting that url is going to call the **index()** of the Root() class.
Note the **index.exposed = True** line below the method. That's
important because, without it, the method can't be called from outside
the class.

Now let's add another url route.

<p>
~~~~ {.python name="code"}
if __name__ == "__main__":    root = Root()    root.names = NamesPage()    cherrypy.tree.mount(root, '/')    cherrypy.engine.start()    cherrypy.engine.block()
~~~~

</p>

See the line starting with **root.names =**? That's going to set up a
handler for the url [http://localhost:8080/names][].

Let's look at the definition of the NamesPage() class. The simplest
would be something just like the Root() class.

<p>
~~~~ {.python name="code"}
class NamesPage:    def index(self):        return "This is the root"    index.exposed = True
~~~~

</p>

But what if we also wanted to handle the url
[http://localhost:8080/names/help][]?

<p>
~~~~ {.python name="code"}
class NamesPage:    def index(self):        return "This is the names index"    index.exposed = True    def help(self):        return "This is the help page"    help.exposed = True
~~~~

</p>

You can see how the first part of the request URI maps to the index
method of the page handler class. The next part of the request URI maps
to any method in the routing class with a matching name.

The next neat bit about routing comes into play when the last part of
the URI doesn't match any defined methods. For example, how do we handle
the url [http://localhost:8080/names/mark][]?

As the NamesPage() class stands now, we'll end up with a 404 exception.
But, by using the **default()** method in the NamesPage() class, we can
handle it in a very cool way.

<p>
~~~~ {.python name="code"}
class NamesPage:    def default(self, name=None):       return "Hello " + name    default.exposed = True    def help(self):        return "This is the help page"    help.exposed = True
~~~~

</p>

With this definition of NamesPage(), everything that comes after
"/names/" (except for help/) gets passed as an argument to the default()
method.

The above is a pretty simple summary. There's a lot more that can be
done as you can see from the [PageHandlers][] documentation.

  [CherryPy]: http://mark.biek.org/blog/2009/06/getting-started-with-cherrypy/
  [http://localhost:8080]: http://localhost:8080/
  [http://localhost:8080/names]: http://localhost:8080/names
  [http://localhost:8080/names/help]: http://localhost:8080/names/help
  [http://localhost:8080/names/mark]: http://localhost:8080/names/mark
  [PageHandlers]: http://www.cherrypy.org/wiki/PageHandlers
