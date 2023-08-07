Title: SSH Tunneling:  Taming the series of tubes
Date: 2009-07-22 11:27
Author: mark
Category: Geek
Tags: ssh, tunnel
Slug: ssh-tunneling-taming-the-series-of-tubes

How many times have you been in this situation?

You can connect to a server via SSH but you really need access to some
other process on the server that doesn't have an exposed port. Or worse,
you need to connect to an entirely different server that isn't exposed
to the outside at all.

Well, thanks to the mystical voodoo of SSH tunnels, your worries are
over!

The idea of SSH tunnels can be a little confusing at first but it's
actually pretty simple in practice.

![SSH Tunnel diagram][]

Here's the basic idea of how it works:

-   Start an SSH connection.
-   Define a port on the local machine (the machine where your SSH
    connection is *starting from*).
-   Define a remote port and IP address for the to local port map to.



For example:

Let's say that you are allowed to SSH into the server at remote.foo.com
but you want to be able to connect to it via VNC. You normally can't
because, even though VNC is running on remote.foo.com, the VNC port
isn't exposed to the outside.

But you **can** connect to VNC through an SSH tunnel.

Using your favorite SSH client, map the local port 5900 to
localhost:5900 (in this case, localhost:5900 refers to port 5900 of
**the machine you're connecting *to* via ssh**), and connect.

Now you can fire up your VNC client and point it at localhost:5900 (in
this case, localhost:5900 is the **local machine** (eg the machine your
SSH connection *started from*). Your SSH client will then forward that
local VNC connection through the existing SSH connection and you'll be
connected to VNC on the remote machine.

So how do you actually set up the tunnel in your SSH client?

It's very easy if you're using the command-line SSH client. Here's the
basic command syntax:


> 
> ssh -L LOCAL\_PORT:REMOTE\_IP:REMOTE\_PORT
>
> 



So, in our example above, the command would look like:


> 
> ssh -L 5900:localhost:5900 remote.foo.com
>
> 



![image][]

If you're on Windows, you're probably using [PuTTY][] (and you should be
if you're not).

To set up an tunnel with PuTTY, click on the **Connection** item in the
PuTTY Configuration, then click **SSH**, and then click **Tunnels**

Enter the local port in the *Source port* box and the remote ip/port in
the *Destination* box.

![image][1]

Now here's the really cool thing about SSH tunnels.

You can also tunnel to *other machines* on the same LAN as the machine
you've SSH'ed into!

Let's say there's a server on the same network as remote.foo.com but
it's not exposed to the outside at all. Let's say it has an IP address
of 10.0.0.4 and it's running a web server on port 80.

We can set up the following SSH tunnel to get access to the web server.


> 
> ssh -L 8080:10.0.0.4:80 remote.foo.com
>
> 



Once you're connected to remote.foo.com, start up your browser and surf
to [https://localhost:8080][] and that traffic will get tunneled through
to the machine behind remote.foo.com.

It's important to note that the traffic from your local machine **to**
remote.foo.com is secure because the SSH connection is encrypting it.
However the traffic **from** remote.foo.com to 10.0.0.4 is *not* secure.

And, of course, you can stack up as many tunnels as you want.


> 
> ssh -L 5900:localhost:5900 -L 8080:10.0.0.4:80 -L 5901:10.0.0.4:5900
> remote.foo.com
>
> 



The above creates tunnels to VNC on remote.foo.com, port 80 on 10.0.0.4,
and VNC on 10.0.0.4.

There you have it, the basics of SSH tunneling, one of my favorite
tricks. My most common use of late has been tunneling connections to
either PostgreSQL or MySQL so I can use [PGAdmin][] or [SQLyog
Community][].

  [SSH Tunnel diagram]: https://farm4.static.flickr.com/3475/3745579035_a591e7fc20.jpg
  [image]: https://farm3.static.flickr.com/2671/3746243218_b4ea2d0c67.jpg?v=0
  [PuTTY]: https://www.chiark.greenend.org.uk/~sgtatham/putty/
  [1]: https://farm3.static.flickr.com/2524/3746243224_95e8ec1cd5.jpg
  [https://localhost:8080]: https://localhost:8080
  [PGAdmin]: https://www.pgadmin.org/
  [SQLyog Community]: https://webyog.com/en/downloads.php
