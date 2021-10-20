Title: Good Lazy vs. Bad Lazy
Date: 2008-07-05 15:33
Author: mark
Category: Programming
Tags: learning
Slug: good-lazy-vs-bad-lazy

I talk a lot, during the course of my work, about being lazy. Some
people look taken aback when I say that. They think it's a terrible
thing and they can't understand my pride. And other people nod
knowingly. They get it.



They understand that there's **good** and **bad** lazy.



Bad lazy is **not** something to be proud of. Bad lazy misses deadlines,
produces shoddy work, doesn't want to learn new things, and generally
doesn't care. Bad lazy spends all day on YouTube or MySpace or Facebook.
Bad lazy does things the same slow way over and over without ever
wondering if there's a better way.



Good lazy is about wanting to do things faster and more efficiently.
Good lazy tries to get to the root of a process to make that process
easier to run. Good lazy sees a manual process and is dying to write a
script to take care of it. Good lazy avoids using the mouse as much as
possible. Good lazy collects keyboard shortcuts for every commonly used
application.



My goal is to be good-lazy. Of course I have my bad-lazy days but they
don't come very often. I find that becoming more proficient with a tool
improves my attitude overall. I think it probably boils down to
[controlling your environment][]



I inherited a process last year that came with two full pages of
single-spaced instructions. It went on and on and on in this vein:



1.  Run programX like this: "programX \> outputX"
2.  Open the file outputX
3.  Delete this line
4.  Delete this other line
5.  Then delete this line
6.  Then run this command: "sort outputX \> outputX2"
7.  Then run programY like this: "programY outputX2 \> outputY"
8.  Open the file outputY
9.  Delete this line
10. etc etc etc
11. Finally end up with outputZ that you can actually do something with



This process was invented by a lazy person who either didn't have to run
it himself or just didn't care how painful it was to execute.



I spent about 10 minutes looking at all of the different files at each
intermediate step, then at the final output file and ended up replacing
those two pages of instructions with something like this:




    programX | egrep -v "Stuff I don't want" | sort | programY | egrep -v "More stuff I don't want" > outputZ



A process that used to talk 20-30 minutes to run (and had to be done
over and over) now takes less than a second.



  [controlling your environment]: http://www.joelonsoftware.com/uibook/fog0000000249.html
