Title: Basics of QR Codes
Date: 2010-07-27 07:00
Author: mark
Category: Geek
Tags: barcode, qrcode
Slug: basics-of-qr-codes

Ever see one of these and wondered what the hell it is?

![http://mark.biek.org/blog/][]

It’s a [QR Code][]! (One of the more common two-dimensional (or matrix)
barcode types. Benefits of the format include fast decoding speed, holds
more data than traditional barcodes, and [error correction][].)

While a variety of software packages exist for generating QR codes, one
of the easiest was to generate one is through the [Google Charts API][].

The QR code at the top of this post is generated using just that, via
the following URL:


~~~~ {.html name="code"}
http://chart.apis.google.com/chart?chs=100x100&cht=qr&chl=http://mark.biek.org/blog&chld=L|1&choe=UTF-8
~~~~



You can see that the information being encoded is simply a link to this
blog (http://mark.biek.org/blog).

QR Codes support encoding of digits **0-9**, letters **A-Z**, and the
characters **space $ % \* + - . / :**

There are also different versions of the QR Code standard ranging from
1-40. Each increasing level allows for more data to be encoded but also
limits which devices will be able to decode it. Levels 1-4 are the most
commonly supported, especially on mobile devices. The [Google Charts
API][] documentation has a nice table of how many characters are allowed
at each version for the different levels of error correction.

For example, here’s the breakdown for Version 4:

-   EC level **L** *(allows 7% data loss)* holds **187 digits** or **114
    Alphanumeric** characters.
-   EC level **M** *(allows 15% data loss)* holds **149 digits** or **90
    Alphanumeric** characters.
-   EC level **Q** *(allows 25% data loss)* holds **111 digits** or **67
    Alphanumeric** characters.
-   EC level **H** *(allows 30% data loss)* holds **82 digits** or **50
    Alphanumeric** characters.



It's worth mentioning that the Google Charts API will pick the version
for you, based on the amount of data you're encoding so all you have to
worry about specifying is pixel size and error correction level.

There are interesting possibilities for using QR Codes (like these
[Calvin Klein][] billboards) but, unfortunately, the last-mile is a bit
of a problem.

There are barcode scanning programs for most mobile phones (lots of them
for iPhone and Android) but you are reliant entirely on the scanning
program for what happens when the QR Code is scanned.
Double-unfortunately, there are no real standards yet for handling
encoded data.

What little, unofficial, standardization of encoded data is described in
this wiki article entitled [BarcodeContents][].

Most/many scanners handle support for the obvious things like
**http://**, **mailto:**, and even **sms:**, but there’s no real
guarentee. Plus, since it’s not built into the device (requiring a
download from whichever App store you’re using), the person with the
phone has to take some additional steps to be able to do anything.

The end result is that you can't control how smooth the end-user
experience is, although it will definitely be neat for the people who
can use it successfully.

  [http://mark.biek.org/blog/]: http://chart.apis.google.com/chart?chs=100x100&cht=qr&chl=http://mark.biek.org/blog&chld=L%7C1&choe=UTF-8
  [QR Code]: http://en.wikipedia.org/wiki/QR_Code
  [error correction]: http://en.wikipedia.org/wiki/Reed–Solomon_error_correction
  [Google Charts API]: http://code.google.com/apis/chart/docs/gallery/qr_codes.html
  [Calvin Klein]: http://mashable.com/2010/07/13/calvin-klein-qr-code-billboard/
  [BarcodeContents]: http://code.google.com/p/zxing/wiki/BarcodeContents
