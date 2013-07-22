Title: Premature Optimization less harmful than Immature Stupidity
Date: 2009-04-07 12:36
Author: mark
Category: Geek, Programming
Tags: learning
Slug: premature-optimization-less-harmful-than-immature-stupidity

Many moons ago, when I was still naive enough to think I was a BADASS
PROGRAMMER, I was assigned a data-validation programming task.

The task?

Given a file containing name/value pairs, check a set of tab-delimited
files for values **not** found in the name/value pair file.

So the name/value file might look something like this

<table border="0" cellspacing="0" cellpadding="0" style="padding-left:  40px">
</p>
<p>
<tr>
<td colspan="3">
\#Variable
</td>
</tr>
</p>
<p>
<tr>
<td>
Foo
</td>
<td>
=
</td>
<td>
9000
</td>
</tr>
</p>
<p>
<tr>
<td>
Bar
</td>
<td>
=
</td>
<td>
12345
</td>
</tr>
</p>
<p>
<tr>
<td>
Baz
</td>
<td>
=
</td>
<td>
8888
</td>
</tr>
</p>
<p>
</table>
</p>

And one of the tab-delimited files might look like this

<table border="0" cellspacing="0" cellpadding="0" style="padding-left:  40px">
</p>
<p>
<tr>
<th>
Variable
</th>
</tr>
</p>
<p>
<tr>
<td>
9000
</td>
</tr>
</p>
<p>
<tr>
<td>
9000
</td>
</tr>
</p>
<p>
<tr>
<td>
8888
</td>
</tr>
</p>
<p>
<tr>
<td>
12345
</td>
</tr>
</p>
<p>
<tr>
<td>
55555
</td>
</tr>
</p>
<p>
</table>
</p>

So, in this very contrived case, the validation script would want to
print out that we found a value of 55555 for *Variable* that didn't
exist in the name/value pair file.

Taking some existing Python code we had laying around for doing stuff to
a set of tab-delimited files, it was easy enough to throw together a
script to perform the validation. It iterated over all of the
tab-delimited files and checked every value of every file against the
master list of name/value pairs, then wrote out a report of bogus values
found for each file.

But there was a small problem: The set of tab-delimited files was **40
gigabytes** and it took the script **72 hours** to run! By the time we
had the results with the bogus values, it was *too late to actually fix
them*.

Not a very useful script, right?

So I set about trying to improve the performance of the script but
pretty quickly found there wasn't much room for improvement given what I
had to do and the machine I had to run it on. Here's what it was doing

-   Load the name/value pair file into a set of dictionaries so I could
    easily check for values by name
-   Open a tab-delimited file
-   Read it one line at a time
-   Split each line into an array of values
-   Check each value against the dictionary from the first step

</p>

I eeked out a small speed gain by removing some unneeded regular
expressions and trying to read as much of the tab file as possible all
at once but some of the files were 4gb or more so the gain was pretty
miniscule.

Here's the point where the right thing to do would be to start
rethinking **the whole process**. The current method wasn't working at
all so how could we rethink the whole thing to try and get at our goal
in a different way. If the slowdown is caused by having to iterate over
every value of every file, how can we avoid that?

Unfortunately that's not what I did. Instead, I decided that the Python
String.split function and dictionaries were too slow and I was going to
**write my own in C**.

Sigh...

I spent about half-a-day working on some very very bad C code that
parsed a tab-delimited file and stored it into a hand-crafted hash
table. I tacked on the necessary code to make all of the data accessible
from Python so I could call out to my new C masterpiece from the
existing Python validation script. Then I sat back and let my creation
go to work. I had a small set of tab files that I was using to benchmark
things so I didn't have to wait long to see the results.

My custom C implementation of some of the most basic Python functions
made the validation script **almost 6 times SLOWER**.

I'm sure it won't come as a surprise to anyone out there that I was not
as good a C programmer as the folks who wrote Python.

![Dunce][]

So that's what it took to finally get me to start rethinking the problem
at a higher level.

Want to know what the appropriate solution ended up being?

All of this tab-delimited data eventually ended up in a gigantic MySQL
database. By adding a couple of extra tables to the database, all of the
validation could be done in pure SQL and eventually (with the help of
the company SQL-guru) came to happen in **minutes**.

So I guess the lesson here is that sometimes optimization is important.
But sometimes you have to recognize that you're trying to optimize
something that was the wrong way to solve the problem to begin with.

  [Dunce]: http://farm4.static.flickr.com/3382/3419970810_94bd559b3c_o.jpg
