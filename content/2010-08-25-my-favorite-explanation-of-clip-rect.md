Title: My Favorite Explanation of clip: rect();
Date: 2010-08-25 08:01
Author: mark
Category: Geek, Programming
Tags: css, html
Slug: my-favorite-explanation-of-clip-rect

I was having trouble yesterday, getting my head around how [clip:
rect();][] worked. I finally got it after this explanation (and
accompanying drawing) from [Ben Wilson][].

The basic format of clip() is:

<p>
~~~~ {.html name="code"}
  clip:  rect(top (1), right (2), bottom (3), left (4));
~~~~

</p>
*Note that IE doesn’t use commas to separate the arguments to rect:
rect(top right bottom left);*

Rect defines a rectangle that sits over the top of whatever element
you’re applying clip on and hides the rest of the element. The arguments
to define the rectangle all start from the top-left of the original
element.

![image][]

1.  Top: How far down from the top of the box to start
2.  Right: How far over to the right to start (NOT how far **from** the
    right)
3.  Bottom: How far down to the bottom to start (NOT how far **from**
    the bottom)
4.  Left: How far over to the left to start.

</p>

In the drawing above, we have a 100x100 box and we’re going to clip it
to 90x90 so the clip rect would be:

<p>
~~~~ {.css name="code"}
  clip:  rect(10px, 90px, 90px, 10px);
~~~~

</p>

  [clip: rect();]: http://www.w3schools.com/css/pr_pos_clip.asp
  [Ben Wilson]: http://thelocust.org/
  [image]: http://farm5.static.flickr.com/4079/4925293014_36e2aeb69c_o.jpg
