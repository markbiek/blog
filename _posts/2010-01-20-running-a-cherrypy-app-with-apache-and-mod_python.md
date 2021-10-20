Title: Running a CherryPy app with Apache and mod_python
Date: 2010-01-20 16:31
Author: mark
Category: Geek, Programming
Tags: apache, cherrypy, python
Slug: running-a-cherrypy-app-with-apache-and-mod_python

I've been working on getting a new server setup to run some [CherryPy][]
apps. I'd only ever run CherryPy scripts using the built-in webserver so
I figured I'd do quick write-up of how I got it working with Apache and
mod\_python.

**A Simple Python Template**

The [basic usage example][] is a good place to start. Just make sure
that you don't accidentally make **def setup\_server()** part of the
**Root** class. In the end, I went with the [DeployTemplate][] example
because I like the fact it can run inside Apache or using the built-in
webserver without any code changes.

The **Root** class is used in the same way as all the other CherryPy
examples. The functions below ( start(), serverless(), and server() )
allow the script to operate either inside Apache or using the built-in
webserver.


~~~~ {.python name="code"}
import osimport cherrypyclass Root(object):    def index(self):        return "Hello World!"    index.exposed = Trueroot = Root()def start():    cherrypy.config.update({        'log.error_file': os.path.join(os.path.dirname(__file__), 'site.log'),        'environment': 'production',        })    cherrypy.tree.mount(root)    cherrypy.engine.start()def serverless():    cherrypy.server.unsubscribe()    start()def server():    cherrpy.config.update({'log.screen': True})    start()if __name__ == "__main__":    serve()
~~~~



**Configuring Apache**

This is a normal [Name-based VirtualHost entry][]. The important stuff
is down in the **Directory** directive.

The first step is to add the path to the directory *containing* your
application to the **PythonPath**.

The next step is to setup CherryPy as the **PythonHandler**

The last required step tells CherryPy which function to call to start
your app. In this case, my app is named **myapp.py** and it lives in the
**/data/websites/myapp.net/htdocs** directory. We're then telling
CherryPy to call the **serverless()** function that's defined inside
**myapp.py**

I've also left PythonDebug on which helps for debugging by printing more
complete error information to the screen and logs. You'd want to turn
that off in production.


~~~~ {.apache name="code"}
<VirtualHost *:80>        ServerName myapp.net        DocumentRoot "/data/websites/myapp.net/htdocs"        Customlog "/data/websites/myapp.net/logs/access.log" combined        ErrorLog "/data/websites/myapp.net/logs/errors.log"        <Directory /data/websites/myapp.net/htdocs>                AllowOverride All                PythonPath "sys.path+['/data/websites/myapp.net/htdocs']"                SetHandler python-program                PythonHandler cherrypy._cpmodpy::handler                PythonOption cherrypy.setup myapp::serverless                PythonDebug On        </Directory></VirtualHost>
~~~~



  [CherryPy]: http://www.cherrypy.org/
  [basic usage example]: http://cherrypy.org/wiki/ModPython
  [DeployTemplate]: http://cherrypy.org/wiki/DeployTemplate
  [Name-based VirtualHost entry]: http://httpd.apache.org/docs/2.0/vhosts/name-based.html
