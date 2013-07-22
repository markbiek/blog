Title: Handy VBScript ASP syntax shortcut
Date: 2009-06-30 12:52
Author: mark
Category: Geek, Programming
Tags: asp, syntax, vbscript
Slug: handy-vbscript-asp-syntax-shortcut

How often have you done something like this in Classic ASP (VBScript)?

<p>
~~~~ {.vb name="code"}
dim myDictset myDict = Server.CreateObject("Scripting.Dictionary")
~~~~

</p>

Well, here's a nice little syntax shortcut that I've somehow managed to
miss for the last 10 years.

<p>
~~~~ {.vb name="code"}
dim myDict : set myDict = Server.CreateObject("Scripting.Dictionary")
~~~~

</p>

