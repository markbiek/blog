Title: Getting started with CherryPy
Date: 2009-06-16 20:27
Author: mark
Category: Geek, Programming
Tags: cherrypy, python
Slug: getting-started-with-cherrypy

I [mentioned briefly][] last week that I was getting started with
CherryPy and how impressed I was with the ease of [the install][]. I
also finally figured out that Ubuntu has a psycopg package
(*python-psycopg*), although I still couldn't get **web.py** to work
with it.

Here's a list of the packages that I had to install on my Ubuntu 9.0.4
server to get CherryPy running


> 
> apt-get install python
>
> apt-get install python-setuptools
>
> apt-get install flup
>
> apt-get install postgres
>
> apt-get install postgresql postgresql-client postgresql-contrib
>
> apt-get install pgdb
>
> apt-get install postgresql-python
>
> apt-get install python-pygresql
>
> apt-get install gcc
>
> apt-get install g++
>
> apt-get install postgresql-dev
>
> apt-get install libpq-dev
>
> apt-get install python-psycopg
>
> 



Want to get a "Hello World" example of CherryPy working? It's incredible
easy, especially if you use CherryPy's built-in webserver (which seems
like it'll handle the sort of loads I'm going to be dealing with).

Here's the code:


~~~~ {.python name="code"}
import cherrypycherrypy.config.update( {'server.socket_host': '127.0.0.1',                        'server.socket_port':  80,                        })class HelloWorld:        def index(self):            return "Hello World"        index.exposed = Truecherrypy.quickstart(HelloWorld())
~~~~



Then, as root, run the following command to start the built-in webserver
*(assuming the code above is in the file /var/www/hello.py)*:


> 
> python /var/www/hello.py
>
> 



If all goes well, you should see something like this:


> 
> [16/Jun/2009:21:08:00] ENGINE Listening for SIGHUP.
>
> [16/Jun/2009:21:08:00] ENGINE Listening for SIGTERM.
>
> [16/Jun/2009:21:08:00] ENGINE Listening for SIGUSR1.
>
> [16/Jun/2009:21:08:00] ENGINE Bus STARTING
>
> 



Go to [https://localhost][] in your browser and you should see the text
"Hello World."

And here's a quick database example that connects to a PostgreSQL
database called **testdb** with a single table called **todo**.


~~~~ {.sql name="code"}
CREATE TABLE todo (    id integer NOT NULL,    title text,    created timestamp without time zone DEFAULT now(),    done boolean DEFAULT false);INSERT INTO todo (id, title, created, done) VALUES (1, 'Learn CherryPy', '2009-06-15 11:31:38.106307', false);
~~~~




~~~~ {.python name="code"}
import cherrypyimport psycopgimport syscherrypy.config.update( {'server.socket_host': '10.0.0.4',                        'server.socket_port':  80,                        })class HelloWorld:        def index(self):            conn = psycopg.connect('dbname=testdb', 'user=myuser', 'password=mypass')            mark = conn.cursor()            mark.execute('SELECT * FROM todo');            rec = mark.fetchall()            body = ''            for row in rec:                body += str(row)            return body        index.exposed = Truecherrypy.quickstart(HelloWorld())
~~~~



That's a **very** basic intro to CherryPy. The [complete
documentation][] has lots of great stuff and I'll be back to write more
about it after I've had a chance to write something real.

  [mentioned briefly]: https://mark.biek.org/blog/2009/06/installing-things-on-linux-is-still-a-pain-in-the-tuchus/
  [the install]: https://www.cherrypy.org/wiki/CherryPyInstall
  [https://localhost]: https://localhost
  [complete documentation]: https://www.cherrypy.org/wiki/TableOfContents
