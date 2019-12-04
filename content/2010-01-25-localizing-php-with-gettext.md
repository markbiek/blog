Title: Localizing PHP with gettext
Date: 2010-01-25 08:00
Author: mark
Category: Geek, Programming
Tags: gettext, localization, php
Slug: localizing-php-with-gettext

Today, we're going to talk about the basics of localizing (creating
versions in multiple languages) a PHP site using the [Gettext][]
extension.

In theory, the steps are pretty simple.

1.  Wrap each block of text that's going to be translated in
    **gettext("This is my string")** (You can use **\_()** as a shortcut
    for gettext())
2.  Create translation tables for each additional language. There's a
    one-to-one correspondence in the translation tables so "This is my
    string" will be mapped to a different string in each language.
3.  Setup which language your site is using at any given time.
4.  PHP handles the rest!



In practice, it's a little more confusing than that.

**Step 1: Create your translation tables**

There are two parts to the translation files:

1.  The PO (.po) file. This is a plain text file which contains some
    project & charset info, then a list of PHP files, the strings in
    those files, and the translations of those strings.
2.  The MO (.mo) file. This is a binary file that is essentially a
    "compiled" version of the PO file. This is the file that actually
    gets read by PHP to figure out which string to display.



It's possible to create the PO and MO files using the [xgettext][] and
[msgfmt][] command-line tools.

However there's a very nice GUI app called [POEdit][] which runs on
Windows, Linux, and OSX. It's free and makes working with these files
much easier so that's the method I'm going to cover.

The first thing you want to do is create an area for your locale files
to be stored. I recommend something like the following where folders are
named according to their standard locale names. In fact, on Ubuntu, this
didn't work unless the name of folder containing the PO and MO files
exactly matched the locale name listed in **/etc/locale.aliases** (minus
the charset info). On Ubuntu, you may have to install the language packs
for the languages you're going to be using.

I had to manually install the language packs for German, Spanish, and
Chinese for this example:


~~~~ {name="code"}
sudo apt-get install language-pack-desudo apt-get install language-pack-essudo apt-get install language-pack-zh
~~~~



Then let's create the following directory layout. I've been putting the
**locale** folder in the same path as my PHP project but it technically
doesn't matter.


~~~~ {name="code"}
locale  |   de_DE     |      LC_MESSAGES  |   es_US     |     LC_MESSAGES  |   zh_CN     |     LC_MESSAGES
~~~~



Now fire up POEdit and create a new catalog.

![New catalog menu][]

Enter some relevant information about your project. The most important
things here are the language and country this translation is going to be
for.

![Project Settings][]

Set the **Base path** to the directory where your PHP files live, then
add **"."** to the list of paths to scan for files.

![Project Path Settings][]

Then save the file as **messages.po** (you'll see why the name is
important down the road) to the LC\_MESSAGES directory you created for
this particular language.

![Save .po file][]

Now click the "Update Catalog" button to tell POEdit to scan your PHP
files for strings wrapped in **gettext()**, **\_()**, or any other
functions you may have added to the Keywords section of the project
settings.

![Scan PHP Files][]

This will display a list of strings that will be added to the PO file.

![Update Summary][]

Once the strings have been loaded, it's simply a matter of entering the
translations and saving to generate the MO file.

![Define translation tables][]

**Step 2: Tell PHP how to load the translation information**

There are several things happening here.

First we check to see if the locale is specified as the query string. If
not, we default to English. Then we specify the path to the locale
directory and set up the translation "domain" ($domain = 'messages';
tells PHP to look for MO files named **messages.po**).


~~~~ {.php name="code"}
//Make sure we specify a charset of utf-8 or lots of foreign characters (Chinese in particular) won't show up properlyheader('Content-type: text/html; charset=utf-8');$locale = ($_GET['locale']) ? $_GET['locale'] : 'en_US';$localePath = DOCROOT . '/locale';$domain = 'messages';//Set the language to whichever locale we're usingputenv("LC_ALL=$locale.utf8");setlocale(LC_ALL, "$locale.utf8");//Specify the location and charset of the translation tablesbindtextdomain($domain, $localePath) ;bind_textdomain_codeset($domain, 'utf8');//Select the translation domaintextdomain($domain);echo _("Page Title");
~~~~



As long as "Page Title" exists in the translation table, the translated
string should be output instead of "Page Title".

For simple cases where English is the default, I think it's reasonable
to just put the English text in the \_("") call (like \_("Welcome to my
page!")). In the product case where I'm going to be using this, there's
going to be a huge amount of content in big chunks so I opted to treat
each string as a named indentifier (like \_("Page TItle")) and then
create a translation table for english.

**Caveats**

Here's a short list of things that threw me a bit, some of which were
mentioned previously:

-   I've only tried this with PHP 5.2+ and Apache. However the code
    worked perfectly on Ubuntu+Apache as well as Windows+Apache
-   You need to restart Apache anytime your PO and MO files change. This
    because gettext caches the translation tables and won't reload them
    without a webserver restart.
-   Ubuntu needed to have language-packs installed for each language I
    implemented.
-   Ubuntu also needed to have the locale names match the names in
    **/etc/locale.aliases**



  [Gettext]: http://php.net/manual/en/book.gettext.php
  [xgettext]: http://www.gnu.org/software/hello/manual/gettext/xgettext-Invocation.html
  [msgfmt]: http://www.gnu.org/software/hello/manual/gettext/msgfmt-Invocation.html#msgfmt-Invocation
  [POEdit]: http://www.poedit.net/
  [New catalog menu]: http://farm5.static.flickr.com/4054/4290782805_2fd45133e3_o.png
  [Project Settings]: http://farm3.static.flickr.com/2768/4290782809_018eab6b51_o.png
  [Project Path Settings]: http://farm5.static.flickr.com/4023/4290782813_dd92397260_o.png
  [Save .po file]: http://farm3.static.flickr.com/2697/4290782811_37556bfba3_o.png
  [Scan PHP Files]: http://farm5.static.flickr.com/4007/4293877582_0c4e8cc464_o.png
  [Update Summary]: http://farm5.static.flickr.com/4025/4290782819_92c02aa129_o.png
  [Define translation tables]: http://farm3.static.flickr.com/2696/4290782823_4495ee2a28_o.png
