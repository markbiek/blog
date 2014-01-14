Title: Getting an '__doPostBack is undefined' error in IE10
Date: 2013-08-16 18:51
Author: mark
Category: Geek
Tags: c#,.net
Slug: getting-an-dopostback-is-undefined-error-in-ie10

I was doing some cross-browser testing on a C#/ASP.NET website the other day and I realized the site didn't function at all in IE10.

Poking around in the console, I saw that attempting to do anything was throwing a `'__doPostBack' is undefined` error.

Some googling lead me to this [very informative article](http://www.hanselman.com/blog/CommentView.aspx?guid=40de7f39-3ff7-4f21-89ab-baa6cdd9d51e#commentstart)[^1] from Scott Hanselman about the issue.

In short, .NET 2.0 and .NET 4 ship with a set of browser definition files that define specific versions for all of the major browsers. And IE10 isn't included in those definitions!

This means that ASP.NET things IE10 is an unknown browser and disables Javascript support (among other things).

It's worth mentioning that this issue is fairly old (the article referenced above is from 2011) so it's probably not an issue for people with more modern setups. In my case, this site is running on a Windows Server 2008 virtual machine so it's not the latest and greatest.

The best solution for me was to install the [.NET 4](http://support.microsoft.com/kb/2600088) and/or [.NET 2.0](http://support.microsoft.com/kb/2608565) hotfixes. It's possible too, by this point, that these hotfixes have been rolled into either .NET or Windows Server updates.

[^1] More info on the issue [http://stackoverflow.com/questions/15273618/ie10-script5009-dopostback-is-undefined](http://stackoverflow.com/questions/15273618/ie10-script5009-dopostback-is-undefined)
