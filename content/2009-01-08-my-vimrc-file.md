Title: My .vimrc file
Date: 2009-01-08 23:19
Author: mark
Category: Geek, Programming
Tags: vim, vimrc
Slug: my-vimrc-file

My .vimrc is still pretty small compare to some, but it's been growing
and has a few handy things in it.

Set the default font to Courier New (my personal favorite for
developing)

<p>
    set gfn=Courier_New:h10:cDEFAULT

</p>
On my Windows machines, turn on all Windows-specific features. This
block gets left out on Linux machines.

<p>
    set nocompatiblesource $VIMRUNTIME/mswin.vimbehave mswin

</p>

Show a status message telling me if I'm in *Insert* or *Replace* mode.

<p>
    set showmodeTurn on syntax highlighting

    syntax enable

</p>

Turn on automatic indenting. Also make sure that all indents use spaces
instead of tabs.

<p>
    filetype indent onset etset sw=4set smarttab

</p>

Set function keys to allow switching between Courier and Lucida fonts.
I've found a few cases where certain Unicode characters don't show up
properly in Courier.

<p>
    map <f2> :set gfn=Lucida_Console:h12:cDEFAULT<cr>map <f3> :set gfn=Courier_New:h10:cDEFAULT<cr>

</p>

Enable full Unicode support when opening files.

<p>
    if has("multi_byte")    " if not, we need to recompile  if &enc !~? '^u'      " if the locale 'encoding' starts with u or U                        " then Unicode is already set    if &tenc == ''      let &tenc = &enc  " save the keyboard charset    endif    set enc=utf-8       " to support Unicode fully, we need to be able                        " to represent all Unicode codepoints in memory  endif  set fencs=ucs-bom,utf-8,latin1  setg bomb             " default for new Unicode files  setg fenc=latin1      " default for files created from scratch  set encoding=utf8else  echomsg 'Warning: Multibyte support is not compiled-in.'endif

</p>

These are shortcuts that let me easily insert various HTML entities that
I have to type over and over. The default value for <Leader\> is **\\**
so, when I hit **\\R**, vim automatically inserts <sup\>&reg;</sup\>.

It took my a while to come up with this scheme. I experimented a bit
with using **iab** (which does an auto-replace on certain keywords) but
I found the method below to be more flexible and easier for me to
remember.

<p>
    map <Leader>R i<sup>&reg;</sup><Esc>map <Leader>C i<sup>&copy;</sup><Esc>map <Leader>T i<sup>TM</sup><Esc>map <Leader>& i&<Esc>map <Leader>L i&lt;<Esc>map <Leader>G i&gt;<Esc>map <Leader><SPACE> i&nbsp;<Esc>map <Leader>- i&ndash;<Esc>map <Leader>_ i&mdash;<Esc>

</p>

