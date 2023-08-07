Title: Profiling PHP with APD
Date: 2008-11-26 07:15
Author: mark
Category: Programming
Tags: php
Slug: profiling-php-with-apd

A while back, I asked the following question on [StackOverflow][]:

### [What's the simplest way to profile a PHP script][]


There were several promising possibilities but the one I found easiest
to get rolling with was the [PCL APD extension][].

Installing it was as simple as **pecl install apd**.

Once it's installed, make sure you set the **apd.dumpdir** property in
your **/etc/php.d/apd.ini** file


    zend_extension=/usr/lib/php/modules/apd.soapd.dumpdir = /tmp/traceapd.statement_tracing = 0


Then you just add a call to **apd\_set\_pprof\_trace();** at the top of
your code.

A trace file in the form **pprof.NNNNN.NNN** will be generated everytime
your site is loaded.

The trace file can be parsed using **pprofp**. I like to use the **-R**
option which sorts by real time spent in subroutines.

The output looks something like this:


    Total Elapsed Time = 0.08Total System Time  = 0.01Total User Time    = 0.05         Real         User        System             secs/    cumm%Time (excl/cumm)  (excl/cumm)  (excl/cumm) Calls    call    s/call  Memory Usage Name--------------------------------------------------------------------------------------99.9 0.00 0.08  0.00 0.05  0.00 0.01     1  0.0002   0.0824            0 main49.3 0.00 0.04  0.00 0.03  0.00 0.01     7  0.0003   0.0058            0 require_once27.6 0.00 0.02  0.00 0.01  0.00 0.00     1  0.0001   0.0227            0 Handler->postLists27.0 0.00 0.02  0.00 0.01  0.00 0.00     2  0.0002   0.0111            0 getPostTitles17.1 0.00 0.01  0.00 0.01  0.00 0.00     1  0.0001   0.0141            0 Handler->defaultRequest16.0 0.01 0.01  0.01 0.01  0.00 0.00     1  0.0132   0.0132            0 apd_set_pprof_trace14.9 0.01 0.01  0.00 0.00  0.00 0.00     5  0.0025   0.0025            0 PDO->__construct14.5 0.00 0.01  0.00 0.01  0.00 0.00     2  0.0004   0.0060            0 Smarty->fetch12.9 0.00 0.01  0.00 0.00  0.00 0.00     1  0.0001   0.0106            0 getPostContent12.2 0.01 0.01  0.00 0.00  0.00 0.00     4  0.0025   0.0025            0 PDO->query11.3 0.01 0.01  0.01 0.01  0.00 0.00     2  0.0046   0.0046            0 defined9.9 0.00 0.01  0.00 0.01  0.00 0.00     1  0.0001   0.0081            0 Handler->showPage9.5 0.00 0.01  0.00 0.01  0.00 0.00     1  0.0001   0.0078            0 Smarty->display8.3 0.00 0.01  0.00 0.00  0.00 0.00     2  0.0002   0.0034            0 getRecentPostName7.8 0.00 0.01  0.00 0.01  0.00 0.00     2  0.0000   0.0032            0 Smarty->_fetch_compile6.8 0.01 0.01  0.00 0.00  0.00 0.00    27  0.0002   0.0002            0 define5.5 0.00 0.00  0.00 0.00  0.00 0.00     7  0.0007   0.0007            0 strtotime4.9 0.00 0.00  0.00 0.00  0.00 0.00    13  0.0003   0.0003            0 is_array4.8 0.00 0.00  0.00 0.00  0.00 0.00     1  0.0001   0.0040            0 getPostContentArray4.6 0.00 0.00  0.00 0.00  0.00 0.00     2  0.0008   0.0019            0 include


You get a nice list of all functions that get called, how many times
each function is called, and how long each call took.

The above trace is after making a bunch of adjustments. A single page
load takes 0.08s which is a number I'm pretty happy with given that this
blog is currently hosted on a 333mhz PIII with 384mb RAM.

The original time of a single page load was closer to 0.25s which is not
as zippy.

The two areas eating up the most processing time were [Markdown][]
processing and the Smarty template engine.

I was originally parsing the Markdown of each post each time the page
loaded which was lazy of me and slow.

I considered just serving the raw Markdown text to the browser and using
Javascript to parse it but it was an easier change to process the
Markdown and store the resulting HTML in the database at the time that a
post gets saved.

To improve the template engine speeds, I decided to switch from Smarty
to [Template Lite][] which is based on Smarty but is missing a few
things from Smarty (that I don't care about anyway), requires valid
XHTML template files (which Smarty doesn't), and is blindingly fast.

The nice thing was that Template Lite was pretty much a drop-in
replacement for Smarty.

So the time spent speeding up was about 10m to install APD, 5m to
profile the site, and another 30m or so to actually write the
improvements.

Not a big time investment for such a big speed gain.

  [StackOverflow]: https://www.stackoverflow.com
  [What's the simplest way to profile a PHP script]: https://stackoverflow.com/questions/21133/simplest-way-to-profile-a-php-script
  [PCL APD extension]: https://www.php.net/apd
  [Markdown]: https://daringfireball.net/projects/markdown/
  [Template Lite]: https://templatelite.sourceforge.net/
