Title: Changing an application's favicon in CherryPy
Date: 2010-02-08 08:00
Author: mark
Category: Geek, Programming
Tags: cherrypy, favicon, python
Slug: changing-an-applications-favicon-in-cherrypy

While it's technically simple, I found the documentation about changing
the favicon of a CherryPy site to be somewhat confusing. This is my
attempt to clear it up a bit.

There are two different ways of supplying config information:

1.  Config information from a text file (you can pass a filename or open
    file handle).
2.  Config information from a Python dictionary in your code.



I'm going to concentrate on the second method for now.

Here's my config dictionary.


~~~~ {.python name="code"}
config = {    '/': {        'log.error_file': os.path.join(os.path.dirname(__file__), 'site.log'),        'environment': 'production',    },    '/favicon.ico': {        'tools.staticfile.on': True,        'tools.staticfile.filename': '/path/to/favicon.ico',    }}
~~~~



Notice that the dictionary contains two sub-dictionaries, one for
**'/'** and one for **'/favicon.ico'**.

**'/'** is where global application configuration goes. In this case,
we're setting where the error log goes and what type of environment
we're running.

CherryPy has a default favicon.ico that it will use if one isn't
specified. The second part (**'/favicon.ico'**) of the dictionary
overrides that default and specifies the location of a different file to
use.

My last post about [configuring CherryPy to run with Apache][] defined a
method called **start()** that was responsible for starting the CherryPy
engine when called from apache.

To use this new config setup, we're going to change that start() method
slightly to this:


~~~~ {.python name="code"}
def start():    cherrypy.tree.mount(root, '/', config=config)    cherrypy.engine.start()
~~~~



Previously, we passed the '/' config parameters to
**cherrypy.config.update()**.

Now we pass the entire config dictionary along. This approach is nice
because we can also store application configuration info (that CherryPy
doesn't necessarily care about) and then get values out of it by using
the **cherrypy.request.app.config** dictionary.

Another addition to this approach is to configure an area for serving
static content (CSS, javascript, images, etc). That can easily be done
by adding the following item to the config dictionary:


~~~~ {.python name="code"}
'/static': {        'tools.staticdir.on': True,        'tools.staticdir.dir': os.path.join(os.path.dirname(__file__), 'static')    },
~~~~



This adds the path **/static** (looking for the directory *static* in
the same directory as the app) and sets it as a static dir. Now anything
that uses the url **/static** will point to files within the *static*
directory.

For example, this will now link to the static file global.css rather
than looking for a CherryPy route.


~~~~ {.html name="code"}
<link rel="stylesheet" type="text/css" href="/static/css/global.css" media="screen"><link>
~~~~



  [configuring CherryPy to run with Apache]: http://mark.biek.org/blog/2010/01/running-a-cherrypy-app-with-apache-and-mod_python/
