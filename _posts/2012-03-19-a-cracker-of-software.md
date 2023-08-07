Title: My one, feeble attempt at being a cracker of software.
Date: 2012-03-19 07:00
Author: mark
Category: Geek, Programming
Tags: cracking, games, macintosh
Slug: a-cracker-of-software

Ah, the heady days of fall-1994. I was 16, hopelessly obsessed with my
computer, and my dorm room had dial-up Internet access.

This meant my roommates and I spent far more time hacking (in the good
way), and downloading and playing Mac (System 7 for life!) games than
attending class.

The gaming went through a number of phases.

**Phase 1:** [Myst][]. There were four of us in the room and one of the
four (not me) almost flunked out because of his Myst obsession.

![image][]

**Phase 2:** [Civilization][]. I got hooked on this in high school. In
the end, I think we all lost equal amounts of time to this one.

![image][1]

**Phase 3:** Network games of [Spectre][]. 3D tanks!
Virtual-reality-esque! This was back when [Lawnmower Man][] was cool.
(OK, Lawnmower Man was never cool but I still loved it).

![image][2]

**Phase 4:** Network games of [Marathon][] (OK, technically this one
didn’t come around until early 1995.)

For the network games, we bribed a facilities maintenance person to
drill a hole through my closet so we could run Ethernet cable into the
room next door.

**Phase 5:** Emulation! I was mainly a fan of 8-bit Nintendo emulators
with the occasional Sega Genesis\* game thrown in for good measure.

![image][3]

<small>\*I loved my Sega Genesis in high school. I, unfortunately, sold
it to my then-girlfriend’s little sister who proceeded to never pay me
for it. When said-girlfriend and I parted ways, any hopes of collecting
my money disappeared.</small>

My preferred Nintendo emulator at the time was a little Macintosh
shareware app called **iNES**. There’s still a iNES emulator in active
development that’s cross platform, I have no idea if it’s the same one I
used.

This old version, iNES 7.7, had a copy-protection scheme where it would
lock itself down after a certain number of uses unless you paid for it.

Thanks to [Zen and the Art of Resource Editing][], I spent a fair amount
of time poking around in the guts of my Macintosh LC and its various
applications.

It turned out that the mechanism by which iNES locked itself was pretty
simple. First, it made a modification to the iNES preferences file, then
made the file locked and invisible. Second, it added a special resource
to the resource fork of the iNES application which flagged it as
“expired".

After manually unlocking iNES a bunch of times using [ResEdit][], I
decided to learn enough Mac programming to write a little program to do
the unlocking for me.

The app itself was pretty simple:

1.  Popup a File Open dialog so the iNES application can be located
2.  Unlock and delete the preferences file. This was annoying because
    you had to reenter all of your prefs the next time you launched the
    program. My goal for phase two was try to preserve the existing
    prefs and just remove whatever bit it was that locked the app.
3.  Open the resource fork of iNES and delete the offending resource. I
    was especially proud of the function that did this part because it
    was called **URiNES()**. You’re never too old for potty jokes,
    right?


My first Macintosh application! I was very product of my 3l33t h4x0r
skillz and, of course, wanted to show off.

I figured the best thing to do was to share the app with the guy who ran
the emulator site where I had been downloading iNES (and ROMs) from.
Little did I know that this same fellow was the guy who ***wrote and
maintained*** iNES!

As you can imagine, he was less than thrilled with my accomplish and I,
of course, felt like a giant moron.

In the end, I swore to him that I would never distribute my little crack
to anyone and I also purchased a licensed copy of iNES.

Given that this was almost 20 years ago and that version of iNES doesn’t
exist, I think it’s probably safe to share the source of my one and only
attempt at being a software cracker.

**UnPirate iNES**: [https://pastebin.com/YJQd916j][]

  [Myst]: https://en.wikipedia.org/wiki/Myst
  [image]: https://i.imgur.com/8bg5Y.png
  [Civilization]: https://en.wikipedia.org/wiki/Civilization_(video_game)
  [1]: https://i.imgur.com/cqRnV.jpg
  [Spectre]: https://en.wikipedia.org/wiki/Spectre_(video_game)
  [Lawnmower Man]: https://www.imdb.com/title/tt0104692/
  [2]: https://i.imgur.com/pyXhu.jpg
  [Marathon]: https://en.wikipedia.org/wiki/Marathon_(video_game)
  [3]: https://i.imgur.com/46vz0.jpg
  [Zen and the Art of Resource Editing]: https://www.amazon.com/Zen-Art-Resource-Editing-Resedit/dp/1568302444/ref=sr_1_2?ie=UTF8&qid=1331921782&sr=8-2
  [ResEdit]: https://en.wikipedia.org/wiki/ResEdit
  [https://pastebin.com/YJQd916j]: https://pastebin.com/YJQd916j
