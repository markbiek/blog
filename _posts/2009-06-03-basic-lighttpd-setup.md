Title: Basic Lighttpd Setup
Date: 2009-06-03 11:17
Author: mark
Category: Geek
Tags: lighttpd, linux
Slug: basic-lighttpd-setup

I've been interested in [lighttpd][] for a long time but haven't had the
time to actually set it up until recently.

#### Why not Apache?


I'm still a big fan of Apache. It comes standard with pretty much every
Linux distro you'd care to run and it's dead simple to get up and
running with. I have no immediate plans to stop using Apache for
Subversion & PHP.

#### So, why Lighttpd?



Here's the official party line.


> Security, speed, compliance, and flexibility -- all of these describe
> lighttpd (pron. lighty) which is rapidly redefining efficiency of a
> webserver; as it is designed and optimized for high performance
> environments. With a small memory footprint compared to other
> web-servers, effective management of the cpu-load, and advanced
> feature set (FastCGI, SCGI, Auth, Output-Compression, URL-Rewriting
> and many more) lighttpd is the perfect solution for every server that
> is suffering load problems.



My main reason boils down to Python. I've had nothing but horrible luck
with Python and Apache (at least on CentOS/RHEL).

Django has **never** worked with Apache on my home server and Python web
stuff via normal CGI/mod\_python is dead slow.

Some of that slowness may come from the fact that my home Linux server
is a 333mhz PIII with 256mb of RAM. I love that little beastie and I'm
not planning on giving it up anytime soon. I'm hoping the switch to
lighty will help me eek out a little more performance.

I'm also very interested in learning [web.py][] and their recommended
install is Lighttpd + FastCGI.

Getting a very basic Lighttpd setup running is pretty easy.

**Download Lighty**

You may be able to find packages depending on your distro. Otherwise you
can download the latest version (currently 1.4.22) [here][] and compile
from source (which is what I ended up doing).

**Unpack the archive**


~~~~ {.bash name="code"}
tar xzvf lighttpd-1.4.22.tar.gz
~~~~



*Note: Most of the next steps need to be run as root.*

**Compile and Install**


~~~~ {.bash name="code"}
cd lighttpd-1.4.22./configuremakemake install
~~~~



**Post-Install**

There's a sample init script in lighttpd-1.4.22/docs/rc.lighttpd.redhat.
Go ahead and put it in **/etc/init.d** and set it to run on boot.


~~~~ {.bash name="code"}
cp lighttpd-1.4.22/docs/rc.lighttpd.redhat /etc/init.d/lighttpdchkconfig lighttpd on
~~~~



For some reason, the install put the lighttpd binary in
**/usr/local/sbin** while the init script expected the binary to be in
**/usr/sbin**. I fixed it by symlinking but you could just as easily
modify the init script.


~~~~ {.bash name="code"}
ln -s /usr/local/sbin/lighttpd /usr/sbin/lighttpd
~~~~



**Configure**

The next step is to create a config file and log file.


~~~~ {.bash name="code"}
mkdir /etc/lighttpdtouch /etc/lighttpd/lighttpd.confmkdir /var/log/lighttpdtouch /var/log/lighttpd/error.log
~~~~



Put the following into the lighttpd.conf file


~~~~ {.conf name="code"}
server.document-root = "/var/www/html/lighttpd"server.port = 80mimetype.assign = (  ".html" => "text/html",  ".txt" => "text/plain",  ".jpg" => "image/jpeg",  ".png" => "image/png")server.errorlog         = "/var/log/lighttpd/error.log"index-file.names        = ( "index.php", "index.html",                            "index.htm", "default.htm",                            "index.py" )
~~~~



**Fire it up**

You may need to change the port if you're already running a webserver on
port 80 but that should be enough to run with otherwise.


~~~~ {.bash name="code"}
/etc/init.d/lighttpd start
~~~~



Stay tuned for the next installation of this series where I attempt to
get FastCGI working with Lighty and then move on to web.py.

  [lighttpd]: http://www.lighttpd.net/
  [web.py]: http://webpy.org/?v=151
  [here]: http://www.lighttpd.net/download
