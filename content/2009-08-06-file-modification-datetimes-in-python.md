Title: File modification date/times in Python
Date: 2009-08-06 21:31
Author: mark
Category: Geek, Programming
Tags: os.stat, python
Slug: file-modification-datetimes-in-python

A while back, I asked on StackOverflow, [how to get file
creation/modification date/times in Python][].

It turns out, it's pretty easy via the [os.stat()][] function.

#### Pass os.stat() a filename!



    print os.stat("/tmp/file")



#### Get back a bunch of numbers!



> 
> posix.stat\_result(st\_mode=33188, st\_ino=515666L, st\_dev=64512L,
>
> st\_nlink=1, st\_uid=1000, st\_gid=1000, st\_size=0L,
>
> st\_atime=1249609170, st\_mtime=1249609170, st\_ctime=1249609170)
>
> 



#### Umm...so...what do all of those numbers actually mean?



**ST\_MODE**
  ~ Inode protection mode.
**ST\_INO**
  ~ Inode number.
**ST\_DEV**
  ~ Device inode resides on.
**ST\_NLINK**
  ~ Number of links to the inode.
**ST\_UID**
  ~ User id of the owner.
**ST\_GID**
  ~ Group id of the owner.
**ST\_SIZE**
  ~ Size in bytes of a plain file; amount of data waiting on some
    special files.
**ST\_ATIME**
  ~ Time of last access.
**ST\_MTIME**
  ~ Time of last modification.
**ST\_CTIME**
  ~ The "ctime" as reported by the operating system. On some systems
    (like Unix) is the time of the last metadata change, and, on others
    (like Windows), is the creation time (see platform documentation for
    details).



My whole reason for finding out about os.stat() was to figure out which
copy of a file was newer than another which can be done like this:


    stat1 = os.stat(file1)stat2 = os.stat(file2)   diff = stat1.st_mtime - stat2.st_mtimeif diff > 0:    #file1 was modified more recentlyelif diff < 0:    #file2 was modified more recentlyelse    #files have the same modification date/time



My next goal is to work this into my [Google Docs backup script][].

  [how to get file creation/modification date/times in Python]: http://stackoverflow.com/questions/237079/how-to-get-file-creation-modification-date-times-in-python
  [os.stat()]: http://www.python.org/doc/2.5.2/lib/module-stat.html
  [Google Docs backup script]: http://mark.biek.org/blog/2009/03/backing-up-your-google-docs/
