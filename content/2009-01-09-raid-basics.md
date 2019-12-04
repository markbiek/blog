Title: RAID basics
Date: 2009-01-09 10:02
Author: mark
Category: Geek
Tags: raid
Slug: raid-basics

## What is RAID?



RAID stands for Redundant Array of Inexpensive Disks. Meaning that you
can combine disks in different ways to create a large pool of space
while protecting yourself from drive failures. Most RAID levels can
survive the failure of at least one disk.

However, **RAID is not a [backup solution][].**

I'm going to say that again because it's important.

**RAID is not a backup solution.**

RAID only protects you from **hardware** failure. It doesn't save you
from an errant *rm -rf* command. All the RAID in the world doesn't do
you any good if all your files get deleted and you don't have backups
somewhere else.

![image][]

RAID 0 combines a minimum of two disks into a single large disk. Two
100gb disks would give you 200gb of usable space. You can use disks of
different sizes but you're limited by the size of the smallest disk.

#### Good



-   Fast read/write speeds



#### Bad



-   Lose one disk and you lose **everything**



* * * * *


![image][1]

RAID 1 mirrors the contents of one disk onto another disk. Two 100gb
disks would give you 100gb of usable space.

#### Good



-   Easy to set up. Most controller cards support it and it's pretty
    fast as software RAID.
-   Can easily handle a single drive failure and can sometimes handle
    multiple drive failures (depending on the total number of disks and
    the controller).



#### Bad



-   While read speeds are normal, writes are twice as slow
-   Not a very efficient use of available disk space.



* * * * *


![image][2]

RAID 5 spreads parity data across all disks giving you more available
storage with a comparable fault tolerance to RAID 1. This is a flexible
and cost-effective option.

#### Good



-   Makes good use of disk space. That means four 100gb drives would
    providing 300gb of usable space under RAID 5 while only providing
    200gb of usable space under RAID 1.
-   Very fast reads, medium-speed writes



#### Bad



-   Requires a minimum of 3 drives.
-   Rebuilding a failed array is much slower than RAID 1
-   Controller cards are more expensive



* * * * *



## RAID 10 - Mirroring & Striping


RAID 10 is a great option if cost and hardware are not an issue and is
achieved by taking two RAID 1 arrays and combining them into a RAID 0
array. Four 100gb drives would yield 200gb of usable space.

#### Good



-   Fault tolerance of RAID 1
-   Read/Write performance of RAID 0



#### Bad



-   Expensive to implement. Controller cards are generally pretty
    expensive and also requires a minimum of four disks.
-   Doesn't scale very well due to the sheer amount of hardware
    required.



<small>Thanks to Wikipedia for the images. Don't worry, I'm not leeching
them.</small>

  [backup solution]: http://mark.biek.org/blog/2009/01/your-data-is-your-life-why-arent-you-protecting-it/
  [image]: http://farm4.static.flickr.com/3398/3181879875_f936c63094.jpg?v=0
  [1]: http://farm4.static.flickr.com/3432/3181879877_7f6ecc033f.jpg?v=0
  [2]: http://farm4.static.flickr.com/3099/3181879885_f5c6557b3a.jpg?v=0
