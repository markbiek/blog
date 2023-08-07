Title: This Bash trick will make your brain explode
Date: 2009-05-13 18:28
Author: mark
Category: Geek, Programming
Tags: bash, linux
Slug: this-bash-trick-will-make-your-brain-explode

While you can live a (mostly) happy Linux existence with just GUI tools,
I think a strong base working on the command-line can drastically
improve your flexibility and efficiency. I urge everyone to spend some
time studying all of the great Bash tutorials out there.

![Terminal Window][]

I am **constantly** learning new things. For instance, I had never
considered [combining multiple commands][] into a single alias before.

Which leads us to my favorite Bash trick of all time; the single thing I
use more than anything else.


> 
> Performing actions in a loop over the output of another command.
>
> 



There are different ways to do this, the most compact being [xargs][],
but I prefer to use **while read**.

The main reason I like **while** over **xargs** is that xargs will die
if you're working with too many items since the entire operation happens
on a single command-line action whereas while executes many separate
actions.

This will make a whole lot more sense with some examples.

Here's one I use all the time:

**Deleting all .svn directories from a path** (handy for making a
working copy not be a working copy any more).


~~~~ {.bash name="code"}
  find ./ -type d -name ".svn" | while read d; do rm -rf "$d"; done
~~~~



Let's break this down a little.

The first thing we're doing is a simple find command that finds all
directories *(-type d)* named .svn *(-name ".svn")* in the current
directory.

The next thing, and this is where all of the power of this construct
comes from, is that we pipe the output of the find command to a Bash
while loop. The while loop iterates over the find output and puts each
value into the Bash variable **$d** (the name of the variable can be
anything. I usually stick with something like 'd' for directories or 'f'
for files). Then, for each time through the loop, we delete the
directory in the $d variable.

The basic form of the while loop looks like this:


~~~~ {.bash name="code"}
  while read d; do <stuff happens here> done
~~~~



What you do within the while loop is entirely up to you. All of the
usual Bash concepts for stringing commands together (using ;, &, or |)
still work.

The real power of this idea is that you can do use it with **anything
that has newline-separated output.**

Let's say you have a file that contains a list of files like this:


> 
> foo\_file1.txt
>
> foo\_file2.txt
>
> bar\_file1.txt
>
> foo\_file3.txt
>
> foo\_file4.txt
>
> bar\_file2.txt
>
> 


Maybe we want to make all files that start with "bar\_" world-writable.


~~~~ {.bash name="code"}
  egrep "^bar_" filelist.txt | while read f; do chmod a+w "$f"; done
~~~~



The egrep command gives us all lines from the file that start with
"bar\_". That output gets piped to the while loop which does the chmod
command.

Now a real world example.

My previous job involved dealing with massive amounts of data from an
online survey. Of the many fields entered as part of this survey, one
field was the price people paid for something. We had some validation on
the price field but, one quarter, a bogus (and very large) price snuck
through into the final data. This was a large problem because we
generated a lots reports that used the Average Price Paid and this
number was throwing them all off. We need to (quickly) go in and update
all records.

Unfortunately, this involved checking and updating more tables than a
sane person would ever want to deal with by hand.

So it was **while** loop to the rescue!

Step one is construct a command-line that will loop over all of the
tables in a database. We have the egrep call to strip out the first line
of the output which isn't actually a table name. This example just
prints out the name of each table.


~~~~ {.bash name="code"}
  mysql -B -e "show tables" thedb | egrep -v "^Tables_in_" | while read tbl; do echo "$tbl"; done
~~~~



Step two does a SELECT on each table and prints all of the ids with an
invalid price. Once again, we do a grep to strip out some extra info
that mysql is printing out.


~~~~ {.bash name="code"}
  mysql -B -e "show tables" thedb | egrep -v "^Tables_in_" | while read tbl; do mysql -B -e "SELECT id FROM $tbl WHERE price >= 10000" | egrep "^[0-9]"; done
~~~~



That's the Bash trick I use the most. Remember, it works for anything
that has newline-separated output.

  [Terminal Window]: https://farm3.static.flickr.com/2226/3527858095_2dc5e3e64f_m.jpg
  [combining multiple commands]: https://www.coffeemonk.com/2009/05/linux-toolbox-alias/%20
  [xargs]: https://unixhelp.ed.ac.uk/CGI/man-cgi?xargs
