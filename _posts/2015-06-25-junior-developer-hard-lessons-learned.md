Title: Junior Developer, hard lessons learned
Date: 2015-06-25 20:05
Author: mark
Category: Geek
Tags: 
Slug: junior-developer-hard-lessons-learned

1999.

I was a year out of college and working for a Boston startup named PinPoint Corporation.

We made active RFID tracking tags and I worked on a suite of Visual Basic 6 applications used to track and manage them. I had a few releases under my belt, a solid performance review and was pretty certain I was hot shit.

It was one day before I was heading out on a week's vacation to California. It was also two days before our next release.

We'd been having some weird, intermittent errors in one of the applications and I had a brilliant idea for how to add some logging to try and track the error down. Every function in the main form had an On Error Goto <label> error handler.

So I wrote a nice function that took an error object and wrote out the pertinent details to a file. And then I added a call to that function in every single error handler.

I couldn't figure out a good way to test it but it looked OK so I checked the change into Visual SourceSafe (shudder) and headed out.

I woke up, the next day, to a calm but pissed off phone call from my manager. My last-minute change had completely broken the application to the point that it wouldn't even launch.

I spent the rest of the afternoon using my parent's dial-up connection and personal computer to undo my changes and email them back to work.

I only lost a day of vacation and the release went out on time.

But that's a lesson I only had to learn once.

