Title: The fun solution is not always the right one
Date: 2008-07-08 10:56
Author: mark
Category: Programming
Slug: the-fun-solution-is-not-always-the-right-one

About 2 years ago, I was tasked with writing a fairly simple web page.



The site was to work something like this



-   Create a database with customer information
-   Each customer can access their data via a unique web page
-   Customers can modify their data but, for certain fields, we want to
    track what values they changed while preserving the original value.



Again, nothing too funky. I probably could have put together a simple
PHP/MySQL solution in a day or two.



But I desperately was bored at work.



I'd been studying Python a lot in my spare time and reading about
dfferent Python web frameworks, [Django][] in particular.



In other words, I'd set myself up for a classic case of a solution
looking for a problem. Not stopping to think if it was the **right**
solution, I went with the **fun** solution.



And I paid the price for it.



Things went well initially. I printed out a ton of Django documentation
and wrote a few simple throw-away pages to experiment with. Then I
started in with the real deal.



The learning curve was pretty shallow and the documentation was good so
I had a functioning site in a pretty short amount of time (4-5 days). I
still think Django is a great package, although I did sometimes feel
like I was battling their idea of a model to get back the data I wanted.



The problem was that I had been working against the Django built-in
debug webserver the entire time. And, shortly after I finished, I
realized I had to figure out how to get this thing for real.



It seemed trivial at first. Just point Apache w/ mod\_python at the
Django app and you're done. But nothing is ever that simple.



I kept getting memory exceptions whenever I'd hit the page through
Apache and it turned out that I was running into some known issue w/
Django+Apache+mod\_python. (NB. This may be fixed now, I really have no
idea.)



I started researching work-arounds and the solution their seemed to be
some other web server. [lighthttpd][] seemed to be the popular choice.
The problem was that I had another web app running that depended on
Apache so I couldn't dump Apache entirely. But wait! I could set up a
pass-through proxy in Apache that pointed to lighthttpdon a different
port!



It seems pretty obvious at this point that I should have given up on the
whole thing. But I was too invested in the code I'd written and too
excited about having a puzzle to solve. I did the worst thing possible.



I carried on with my current path.



I'll spare you the days of searching for RPMs and compiling of bizarre
libraries from source that it took me to finally get lighthttpdrunning
on this box. But I'll tell you this, if you're symlinking .so files to
have different names to meet some weird dependency, you're not investing
a sound setup.



In the end, I got it working and everything worked wonderfully. The site
served its purpose and collected good data and the project was a
success.



Then the next year rolled around and they wanted to run the same site
again. The problem was that the server had been upgraded and all of the
binaries I'd generated from the previous year didn't work anymore. I was
faced with going through the same battle with Apache, lighthttpd, etc.



And this time, I gave up. I archived my super-fun Django code and
rewrote the whole thing in PHP.



I firmly believe that was the right decision. We've had to take the site
live on several other occasions, move it from server to server, and made
a host of other changes that would have been a nightmare to deal with
given what a mess my previous Django setup was. As it was, I just
checked out the PHP version of the site from Subversion on whatever
machine we happened to be running on and it just worked.



Now I don't blame Django or Apache or any other software packages for
this whole fiasco. This was entirely a people problem because I allowed
myself to go with the fun solution rather than the right solution.



And I got lucky because it didn't matter that I had to rewrite the whole
thing. No deadlines were missed. All of the features that needed to be
added got added.



But it's not a mistake I plan to make again.



  [Django]: https://www.djangoproject.com
  [lighthttpd]: https://www.lighttpd.net
