Title: Pixel level drawing with the canvas element
Date: 2012-01-16 11:46
Author: mark
Category: Programming
Tags: canvas, javascript
Slug: pixel-level-drawing-with-the-canvas-element

Today we’re going to learn how to manipulate the HTML <canvas\> element
at the pixel level.

To start, we need a canvas element:

    <canvas id="canvas" width="640" height="480">

    <p>Your browser doesn't support canvas.</p>

    </canvas>

Next get a handle to the canvas element and its 2d context.

    var canvas = document.getElementById('canvas');var ctx = canvas.getContext('2d');

Next, we create a ImageData element on the canvas that covers the entire
canvas. This is we’re actually going to be drawing our pixels on.

    var imgd = ctx.createImageData(canvas.width, canvas.height);

The ImageData element is basically just a big array. Each block of 4
array elements corresponds to a single pixel.

The array indices in each pixel block control the color and alpha
transparency as follows:

-   i = Red value
-   i+1 = Green value
-   i+2 = Blue value
-   i+3 = Alpha

And here&rsquo;s a simple function for drawing a single pixel given an x,y
value and r,g,b:

    var setPixel = function(imageData, point, r, g, b, a) {    a = typeof a == 'undefined' ? 255 : a;    i = (point.x + point.y * imageData.width) * 4;    imageData.data[i  ] = r;    imageData.data[i+1] = g;    imageData.data[i+2] = b;    imageData.data[i+3] = a;};

Let&rsquo;s say we wanted to draw a red pixel at 100,100. Given the ImageData
element we declared above, we’d call setPixel like this:

    setPixel(imgd, {x:100,y:100}, 255, 0, 0);

Notice we&rsquo;re not passing a value for the alpha transparency. The
setPixel defaults the alpha to fully opaque if a value is specified.

A more full-featured setPixel function can be found [here](https://gist.github.com/markbiek/1621650). This
version accepts HTML hex codes for colors and extends the Object
prototype so we call it directly on the ImageData element like this:

    imgd.setPixel({x:100,y:100}, ‘#f00’);

[Here&rsquo;s a sample](https://gist.github.com/markbiek/1149516) that draws a [Sierpinski triangle](http://en.wikipedia.org/wiki/Sierpinski_triangle) using the
[chaos game](http://en.wikipedia.org/wiki/Chaos_game)

  [image]: http://i.imgur.com/77DH6.jpg "ImageData element"
