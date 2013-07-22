Title: Fun with Vim movement commands
Date: 2010-06-09 13:33
Author: mark
Category: Geek, Programming
Tags: vim
Slug: fun-with-vim-movement-commands

If you've used [Vim][] at all, you're probably already familiar with the
basic character movement commands

**h** *(left)*, **j** *(down)*, **k** *(up)*, **l** *(right)*

or word movement commands

**w** *(forward)*, **W** *(same as w)*, **b** *(backward)*, **B** *(same
as b)*

You may or may not, however, have experienced the sheer joy of using

**f*x*** *(Find character forward on the current line)*, **F*x*** *(Same
as f but moves backwards)*

and

**t*x*** *(Find character forward BEFORE x on the current line)*,
**T*x*** *(Same as t but moves backwards)*

The above character searching commands are especially useful when
combined with the delete (**d**) command.

Let's say you have some text like the following and the cursor is at the
beginning of the line. Let's also say that we want to change "This is a
big bunch of text." to something else.

![First picture][]

Sure, we could move over there character-by-character (or even go to the
end of the line and move back) and the backspace a bunch of times. Or we
could use the mouse to highlight and cut. But there's a better way.

With just a couple of keystrokes (**f\>l**), we can move the first
character AFTER the "\>" that closes the first part of the <a\> tag.

![Second picture][]

Let's break that down:

1.  We move to the first occurrence of the **\>** character on the line
    (**f\>**).
2.  We move one character to the right (**l**)

</p>

Then we can quickly delete "This is a big bunch of text." by combining
**d** with **t** to delete everything up to BEFORE the next occurrence
of <.

Like so:

**dt<**

![Third picture][]

You can also leverage the power of doing a command multiple times. In
next example, we still want to change the link text but now the text is
surrounded by <span\> tags that we also want to delete.

![Fourth picture][]

To do this, we have to make a small change to our delete command (I'm
assuming the cursor is already in the correct place):

**d2t<**

See that **2**? That's repeating the **t** command twice. So we're
telling Vim to delete everything up to BEFORE the SECOND occurrence of
<. This ensures that the <span\> tag is also deleted.

These are just a few basic examples of movement commands, and combining
deletes with movements and repetition. There are lots of other commands
that I haven't covered and every one you learn will make you that much
faster.

  [Vim]: http://www.vim.org/
  [First picture]: http://farm5.static.flickr.com/4045/4685397401_2a933a3d0e.jpg
  [Second picture]: http://farm5.static.flickr.com/4047/4685397411_6c820e4994.jpg
  [Third picture]: http://farm5.static.flickr.com/4043/4685397415_8fdefe4014.jpg
  [Fourth picture]: http://farm5.static.flickr.com/4054/4685397485_8a282354a5.jpg
