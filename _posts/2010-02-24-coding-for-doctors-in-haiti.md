Title: Coding for Doctors in Haiti
Date: 2010-02-24 08:20
Author: mark
Category: Geek, Programming
Tags: haiti, mysql, php
Slug: coding-for-doctors-in-haiti

A colleague of mine who does a lot of programming work in the medical
community came to me with an interesting project.

A number of doctors were heading to work at a medical camp in Haiti
treating earthquake victims and they needed an easy way to track patient
information. Almost all of the doctors there have iPhones so the initial
thought was to write a quick iPhone app using [Appcelerator][]. That
way, patient information could be stored locally on the iPhone until a
network connection was available to sync the data up to a server
somewhere.

Unfortunately the turn-around time was too tight to navigate the process
of getting an app into the Apple App Store. This is a perfect example of
why I dislike the Apple model of only allowing approved apps onto the
iPhone. We would had a much wider range of solutions had we been able to
easily distribute an app ourselves.

In the end, we had to go with a simple PHP/MySQL web application that
used [jQtouch][] to simulate the iPhone look-and-feel (with some tweaks
so it would display properly in Firefox and IE). The basic web app was
fairly simple. Just a couple of pages with lists of existing patients
and a form for entering patient information.

Initially the web app was hosted on a server here in the U.S. but the
satellite internet connection in the medical camp in Haiti proved too
unreliable. In the end, one of the doctors was able to get a hold of a
Windows 2003 which we installed [WAMP][] on. With some minor tweaking,
we were able to move the web app from the US-based server over to the
WAMP server in Haiti. A team of Google & Apple engineers setup a
wireless LAN that covered the medical camp and the doctors were able to
move freely about the camp with their mobile devices entering patient
information.

Additional features were added over the next several days. The camp is
organized into rows of tents so the app has a mechanism to easily list
patients in a specific tent or an entire row. A native iPhone app would
have been nice because we could've used the GPS to do that sort of thing
automatically. We also added the ability to upload images (unfortunately
not from the iPhone itself) so the doctors now have access to x-rays and
other patient photos directly from their devices.

Most of the difficulty with the whole process was related to the lack of
infrastructure in Haiti. The lack of reliable Internet meant that most
communication and file transfer had to happen via email and we had to
make an effort to keep things small. Cell phone/satellite phone service
is spotty at best. Being on the phone with these doctors and hearing the
chaos in the background and hearing about the condition of the people
they're treating is unreal. I have an enormous amount of respect for
these medical professionals who have traveled to Haiti and are doing
their best to help.

All in all, an interesting experience with a different set of challenges
and I feel privileged to have been able to contribute, albeit in a very
small way. Score 1 for the power of technology.

  [Appcelerator]: https://www.appcelerator.com/
  [jQtouch]: https://www.jqtouch.com/
  [WAMP]: https://www.wampserver.com/en/
