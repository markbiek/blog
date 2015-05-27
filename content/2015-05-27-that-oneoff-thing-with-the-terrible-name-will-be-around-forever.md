Title: That one-off thing with the terrible name will be around forever
Date: 2015-05-27 12:51
Author: mark
Category: Geek
Tags: programming
Slug: that-oneoff-thing-with-the-terrible-name-will-be-around-forever

My first job out of college was for a medium-sized startup that made tracking devices (more on this in future posts) and a suite of software to go with it.

Data was passed around the system using a standard publish/subscribe mechanism.

Most of the client applications were written in Visual Basic 6 (since this was 1998) but some of the low-level networking components were written in C/C++.

The main low-level component handled all of the network client stuff and, since it was written in a prototyping phase (long before I started), was called MyFuckingOCX.

This mean that every single client application we wrote (and there were at least 8) contained references to MyFuckingOCX all over the place.

This was fine for about 18 months.

And then came the day when LARGE COMPANY wanted to take our product and our software, rebrand it with their own logo, and resell it.

This meant we had to create a SDK for the developers at LARGE COMPANY and we certainly couldn.t give them a bunch of code littered with MyFuckingOCX.

It took days to update and rebuild everything without references to MyFuckingOCX.

Just remember, that badly named, one-off test thing you wrote will be around forever.

So maybe give it a decent name at the start?
