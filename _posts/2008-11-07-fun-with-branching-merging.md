Title: Fun with Branching  Merging
Date: 2008-11-07 10:34
Author: mark
Category: Programming
Tags: svn
Slug: fun-with-branching-merging

I've been working with Subversion for a couple of years now but never
really had much call to use the built-in merge feature. Everything I've
done in the past has been simple enough that, if I even had to branch at
all, it was easy enough to just move the changes back to the trunk by
hand.



Before we start, understand that Branching & Merging can be a bit
confusing. It may be worth your while to read the complete chapter
[Branching & Merging][] since my example here is going to oversimplify
things a bit.



Here's an illustration of what branching is all about *(borrowed from
the svn book)*



![Branching][]



In my case, I had a bunch of small copy changes to make to a website and
a couple of big new features to implement. The problem was that the copy
changes had to go live pretty quickly while the new features did not.
And the two sets of changes overlapped a bit so it wasn't going to be
trivial just moving out the copy-changed files.



That's where branching comes in handy.



I started a new branch of my current project, made all of the copy
changes in the trunk and all of the new feature stuff in the branch.
Everything stayed separate, still under version control, and it was easy
for me to switch back and forth between the two.



But I ran into problems (and I think is one of the biggest beefs with
Subversion) when I was ready to merge the branch back to the trunk.



Subversion 1.5 is supposed to make it pretty easy to do (and
TortoiseSVN) makes it even easier. In theory, you just do an svn merge
and tell it that you're reintegrating a branch.



Unfortunately, when I tried to reintegrate, I got this:




    Some revisions have been merged under it that have not been mergedinto the reintegration target; merge them first, then retry.



This is not very helpful.



In the end, I found [this thread][] which seems to have the solution.



Basically it means that there's a change in the trunk that needs to be
merged to the branch **before** you can reintegrate the branck.



So I merged the trunk to the branch, then the branch back to the trunk,
and everything is working.



  [Branching & Merging]: https://svnbook.red-bean.com/en/1.5/svn.branchmerge.html
  [Branching]: https://farm4.static.flickr.com/3182/3009862333_f54f22c558_o.png
  [this thread]: https://www.nabble.com/Trouble-using-Svn-merge---reintegrate-td19502890.html
