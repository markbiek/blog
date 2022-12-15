Title: Search  Replace with vim
Date: 2008-06-28 19:01
Author: mark
Category: Programming
Tags: regex, vim
Slug: search-replace-with-vim

I was presented with an 11,000 line text file a couple of days ago and
tasked with importing the contents of that file into a database.

Here's a little snippet of the file.

```
08-06-06 16:29:07,127.0.0.1,first call
08-06-06 16:30:24,127.0.0.1,first call
08-06-06 16:32:11,127.0.0.1,first call
08-06-06 16:34:38,127.0.0.1,first call
08-07-06 16:07:49,127.0.0.1,first call
08-07-06 16:10:46,127.0.0.1,first call
08-07-06 16:11:31,127.0.0.1,first call
08-07-06 16:30:20,127.0.0.1,first call
08-07-06 16:40:01,127.0.0.1,first call
08-07-06 16:40:14,127.0.0.1,first call
08-07-06 18:14:10,127.0.0.1,first call
08-07-06 22:21:12,127.0.0.1,first call
```

The biggest problem was that the date/time was in the wrong format. It
really needed to be in **YYYY-mm-dd HH:MM:SS** format so that MySQL
could treat it as a real date.

My first thought was to throw together a little Python script to parse
the file, line by line, and insert it into the database. But, the more I
thought about it, the more that approach started to seem like overkill.
My second thought was to use vim & a little bit of regex fun and just
turn the whole file into a gigantic INSERT sql statement.Â There will
probably turn out to be an even easier way that I don't know about.

Either way, that lead me to two things that I'd never done in vim
before. Doing a find/replace in vim using a regex more complicated than
`%s/foo/bar/g` and using **backreferences**.

My general knowledge of backreferences was spotty at best so I spent a
while just reading about those before figuring out the exact,
vim-specific, syntax and how it applied to my situation.

Which takes us to, how do we fix that date?

Let's start with the regex to just match the YY-MM-DD part of each line

```
^d{2}-d{2}-d{2}s+
```

(Here's the same thing split out line-by-line)

```
^d{2} (?#Match the 2-digit year)
-d{2} (?#Match the 2-digit month)
-d{2} (?#Match the 2-digit day)
s+ (?#Match the whitespace between the date & time)
```

That will match the part of the line beginning with 2 numbers followed
by a - followed by 2 more numbers followed by a - followed by 2 more
numbers followed by some sort of white space.

The thing that really threw me is that vim requires that you escape all
of the things like {, }, +, etc. So the regex then becomes

```
^d{2}-d{2}-d{2}s+
```

To actually reorder it, we need the backreferences which ends up being
pretty easy. Just put parentheses around each expression you're going to
refer back to later. And don't forget to escape those parens!

```
%s/^(d{2})-(d{2})-(d{2})s+/foo/gc
```

(Here's the same thing split out line-by-line)

```
^(d{2}) (?#Match the year and capture to backreference 1)
-(d{2}) (?#Match the month and capture to backreference 2)
-(d{2}) (?#Match the day and capture to backreference 3)
s+ (?#Match the whitespace between date & time.
```

That looks really ugly but it's exactly the same as before except for
the parens. And having those backreferences means we can use 1, 2, & 3
to refer to those three fields in the replace section.

In this case 1 is the Month, 2 is the Day, & 3 is the Year.

So to put it into YYYY-mm-dd format, we need to reorder things and make
the year 4 digits.

```
%s/^(d{2})-(d{2})-(d{2})s+/203-1-2 /gc
```

You can see below how it's going through and rearranging the dates. I
like to use the `gc` option when doing find/replaces so it prompts me
before each replace. That way I can double-check that it's doing what I
want before I tell it to do ahead and do the whole file.

The rest is pretty easy. We just need to quote each comma-delimited
field & put parentheses at the beginning and end of each line. People
with stronger regex-fu than me can probably do this in one step. I'm
going to do it in three because it's easier for me to conceptualize.

Put a (' at the beginning of each line

```
%s/^/('/g
```

Put a '), at the end of each line. That will leave a trailing comma at
the end of the file that needs to be removed.

```
%s/$/'),/g
```

Put commas around each of the fields.

```
%s/,/','/g
```

Then I just put the rest of the insert statement at the beginning of the
file and I'm done.

```
INSERT INTO `theTable`VALUES(`theDate`, `theIP`, `theText`)
```

The whole thing took about 15 minutes, including the time I spent
reading up on backreferences. That's probably the same amount of time it
would have taken me to throw together a little script to do the same
thing but I think the benefit comes from learning more about complex
find/replaces in vim.