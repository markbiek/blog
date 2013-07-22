Title: HTML Emails for fun and profit
Date: 2009-02-02 08:52
Author: mark
Category: Programming
Tags: css, email, html
Slug: html-emails-for-fun-and-profit

Someone asked this question on [StackOverflow][] the other day:

<p>
> </p>
>
> <div class="post-text">
> </p>
>
> A designer coded an html template using CSS best practices. I want to
> use this template as an email newsletter template, but I've heard
> people say hotmail, yahoo and gmail offer limited support for CSS.
>
> <p>
> Am I supposed to re-code these templates using table layouts and font
> tags?
> </div>

</p>

It just so happens that I've been getting to do some HTML emails at work
and, unfortunately, the short answer to his question is **Yes**. You
pretty much have to forget anything about CSS and go back to early-90's
HTML layouts.

You're going to get the best compatibility across webmail accounts &
email clients by using the most basic and dumbed down HTML possible.

-   Don't use any CSS files or
    <style> tags. Do everything inline.</style>
-   Handle positioning with nested tables that have explicit widths
-   -   I make heavy use of HTML comments in these situations to make
        sure I don't get confused about where I am in the layout.

-   All text should be surrounded by <font> tags with the font style
    information.</font>
-   Images should have explicit widths & heights.
-   -   This helps the email retain its proper layout when images are
        blocked.

</p>
I try to test on a minimum of the following:

-   Outlook 2003
-   Outlook 2007 (Most of your headaches will come from here)
-   Thunderbird
-   Entourage (OSX version of Outlook)
-   Gmail
-   Hotmail
-   Yahoo Mail

</p>

You're usually in pretty good shape if you get something that shows up
properly on all of those.

We use Exact Target and they have an HTML preview feature but it's not
perfect. I've run into a lot of situations where an email looked good in
the preview but still came through broken in Outlook 2007.

  [StackOverflow]: http://stackoverflow.com
