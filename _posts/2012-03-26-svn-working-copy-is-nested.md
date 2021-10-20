Title: SVN working copy is nested?
Date: 2012-03-26 07:00
Author: mark
Category: Programming
Tags: subversion, svn
Slug: svn-working-copy-is-nested

Have you ever gone to commit something and TortoiseSVN tells you that
part of your working copy is “nested"?

![image][]

You know what that means?

It means that the nested folder contains the Subversion meta-information
for a *different working copy*! I find this usually happens when you
copy a directory into your working copy from somewhere else and forget
to delete all of the **.svn** directories.

The interesting thing is that, despite this warning, Subversion will
happily commit *any* changes you’ve made in that directory.

The problem is that it commits them to whatever repository that
directory came from, **not** to your repository.

We had a situation at work today where part of a working copy was nested
and we thought we’d lost the only copy of a modified image as a result.
Luckily we were able to pull the correct image from the revision log of
the *other* working copy.

So how do you fix a nested working copy? It’s really easy.

\1. Delete all of the **.svn** directories from the nested directory.

\2. Add the directory into subversion (svn add).

\3. Commit the add (svn ci).

\4. Profit!

  [image]: http://i.imgur.com/SWQbq.png
