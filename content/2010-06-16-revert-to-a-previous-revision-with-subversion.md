Title: Revert to a previous revision with Subversion
Date: 2010-06-16 16:02
Author: mark
Category: Geek, Programming
Tags: subversion, svn
Slug: revert-to-a-previous-revision-with-subversion

One of my favorite features of [TortoiseSVN][] is the ability to bring
up the log, click on an old revision, and revert the changes from that
revision.

If you've ever dealt with a situation where you're asked to make changes
to something, then someone decides to go back after you've committed
those changes, the above is a lifesaver.

The only beef I have is reverting the changes from a previous is
revision is *totally non-obvious* from the command-line. Did you expect
the **svn revert** command to accept a revision number? Nope.

In reality, TortoiseSVN isn't actually doing a revert all. It's doing an
[svn merge][]!

So if the file **index.php** is at revision 500 and you want to revert
the changes from revision 499, you do this:

<p>
~~~~ {name="code"}
  svn merge -r 500:499 index.php
~~~~

</p>

That reverse-merges the changes from 499 and modifies the file in your
working copy. Keep in mind, you still have to do an [svn commit][].

Of course, if you change you mind, you can always do an [svn revert][]
to undo the merge.

  [TortoiseSVN]: http://tortoisesvn.tigris.org/
  [svn merge]: http://svnbook.red-bean.com/en/1.0/re16.html
  [svn commit]: http://svnbook.red-bean.com/en/1.1/re06.html
  [svn revert]: http://svnbook.red-bean.com/en/1.1/re25.html
