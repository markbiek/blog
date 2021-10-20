Title: A frustrating Web.config transformation error
Date: 2014-03-24 18:31
Author: mark
Category: Geek
Tags: c#,asp.net
Slug: a-frustrating-webconfig-transformation-error

I recently ran into a strange error while writing a Web.config transformation for a new website:

> No element in the source document matches '/configuration/system.web'

So you know all about Web.config transformations, right?

What? You don't!?!

You *must* learn about [Web.config transformations](http://msdn.microsoft.com/en-us/library/dd465326%28VS.100%29.aspx)!

But here's a quick overview.

You have a Web.config file with a bunch of settings. However certain settings change from enviroment to environment (eg from Dev to Production).

You put the bulk of the settings that don't change into the main Web.config. Then you create Configuration-specific Web.config (like Web.Release.config) which have the modified values. There are a series of `xdt:` attributes that can be added to Insert, Remove, Replace values within the Web.config file.

In short, no more manually changing values before publishing your site.

In addition, there's a fantastic Studio plugin call [SlowCheetah - XML Transforms](http://visualstudiogallery.msdn.microsoft.com/69023d00-a4f9-4a34-a6cd-7e854ba318b5) which lets you do exactly the same thing with *any* XML file in your project, not just Web.config.

But I digress. Back to our strange transformation error.

My Web.config looked something like this:

    <configuration xmlns="http://schemas.microsoft.com/.NetConfiguration/v2.0">
        <system.web>
            <!-- stuff -->
        </system.web>
    </configuration>

And my Web.Release.config looked a bit like this:

    <configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
         <system.web>
             <identity impersonate="true" userName="USER" password="PASS" xdt:Transform="Insert" />
         </system.web>
     </configuration>

Basically, on the production server, the website has to run under a certain user account using *identity impersonate*.

After lots of head-bashing and scouring over other websites that weren't throwing the error, I found that the `xmlns="http://schemas.microsoft.com/.NetConfiguration/v2.0"` attribute was causing the error.

I just changed the main Web.config to this and all was well:

    <configuration>
        <system.web>
            <!-- stuff -->
        </system.web>
    </configuration>

