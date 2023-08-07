Title: Installing things on Linux is still a pain in the tuchus
Date: 2009-06-11 07:22
Author: mark
Category: Geek, Programming
Tags: cherrypy, linux, python
Slug: installing-things-on-linux-is-still-a-pain-in-the-tuchus

I've been trying like mad to get [web.py][] working over the last week.
Getting the initial dependencies and base install was straightforward
enough but now I'm stuck.

I can't get web.py to connect to Postgres using whatever the built-in
Python DB library is and I can't get [psycopg2][] installed because of
an endless series of bizarre errors. The documentation for both web.py
and psycopg is less than stellar.

**So I'm giving up.**

I hope this makes every Linux developer out there shudder. How many
people are dumping your software because they can't figure out how to
install the freaking thing?

Yes, I know things have drastically improved with the various package
systems out there. Yes, I know the Linux ecosystem is more complicated
to handle installation for.

Guess what? I don't give a shit.

I don't want to waste a week just trying to get a piece of software to
run. I want to **write code**.

And that's why I've switched over to [CherryPy][]. The base install,
including DB support, was **one step** and took me all of 5 minutes to
do. Now I can get down to my primary goal of doing something fun in
Python.

So, to all you Open Source projects out there, you're awesome and I love
you! But you've got to spend more time on documentation and making
installation easier if you want your project to really succeed.

<small>^\*^Yes, I know the install process on OSX is generally really
good but, at this point, I still have more Windows experience to speak
to.</small>

  [web.py]: https://webpy.org/
  [psycopg2]: https://initd.org/pub/software/psycopg/
  [CherryPy]: https://www.cherrypy.org/
