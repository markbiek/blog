Title: Your data is your life.  Why aren't you protecting it?
Date: 2009-01-11 20:53
Author: mark
Category: Geek
Tags: amazons3, backups, jungledisk
Slug: your-data-is-your-life-why-arent-you-protecting-it

Given how cheap disk space is, there's no excuse for having at least
some sort of backup system. I'm appalled by how many people I know who
have **no backups** of any kind. I'm especially concerned for people who
only have laptps.

What are you going to do if that laptop gets stolen or run over by a bus
or has water dumped on it?

The main question you have to ask yourself is

### If my computer completely failed right this second, what would I
lose?

</p>

You have some shopping to do if the answer to that question scares you.

Go buy a copy of [![Acronis True Image][]][] and a [![cheap USB hard
drive][]][].

You can get almost total peace of mind for under $200.

That first step is the most important. But there's another thing to
worry about

### What happens if my house burns down and I lose my computer *and* my
backup disk?

</p>

Some people might be comfortable ignoring that level of paranoia. If you
took the first step and are comfortable stopping there, **go ahead and
stop**

I've been burned a couple of times before so I'm a little more paranoid.
Here's my setup:

-   A Linux fileserver which serves as a backup to my two Windows
    machines. The My Documents folders on my Windows machine also point
    to network shares on the fileserver
-   One of the Windows machines has a second 500gb SATA drive in it that
    serves as a backup to a number of files from the Linux fileserver
    (like the My Documents folders)

</p>

All of the backups happen automatically via cronjobs twice a day. I have
a few very simple Bash scripts that use rsync to do incremental backups.
This system has served me well and I've had to go to those backups
several times.

But it's always bothered me that I don't have offsite backups as part of
the equation. I investigated a number of services like [rsync.net][] and
[Dropbox][] but those seemed a bit expensive.

In the end, I settled on [![Jungle Disk][]][] which uses [Amazon S3][]
for online storage.

I paid $20 for the full version of Jungle Disk (there's a free trial
too) and I'll be paying $0.15/gb/month to actually store the data at
Amazon S3 (you also pay $0.15/gb for transfers in and out).

It's nice too because I'm not locked into Jungle Disk (which is great so
far). I can use an Amazon S3 compliant client to get files in and out.

I hear sob stories from people who've lost all of their digital
pictures/mp3s/etc and I have very little sympathy because it's too easy
to avoid.

So get out there and make sure your data is protected.

  [Acronis True Image]: http://farm4.static.flickr.com/3505/3182530414_f031461a59_o.gif
  [![Acronis True Image][]]: http://www.acronis.com/homecomputing/products/trueimage/
  [cheap USB hard drive]: http://farm4.static.flickr.com/3263/3182530406_fdd915fb5a_o.jpg
  [![cheap USB hard drive][]]: http://www.newegg.com/Product/ProductList.aspx?Submit=ENE&N=2010150414%20131021357&name=400GB%20-%20750GB
  [rsync.net]: http://www.rsync.net/
  [Dropbox]: http://www.getdropbox.com/
  [Jungle Disk]: http://farm4.static.flickr.com/3089/3184022374_4e452bd146_o.jpg
  [![Jungle Disk][]]: http://www.jungledisk.com/
  [Amazon S3]: http://aws.amazon.com/s3/
