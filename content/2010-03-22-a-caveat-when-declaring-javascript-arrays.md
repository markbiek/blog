Title: A Caveat When Declaring Javascript Arrays
Date: 2010-03-22 07:00
Author: mark
Category: Geek, Programming
Tags: arrays, javascript
Slug: a-caveat-when-declaring-javascript-arrays

A friend at work was having a bizarre Javascript array problem
yesterday. The solution seems perfectly obvious now but took a minute to
figure out.

He was writing a small page the involved doing a bunch of calculations
based on some options. Various numeric values to be used in those
calculations were stored in a set of arrays, sort of like this:

<p>
~~~~ {.javascript name="code"}
var foo = new Array(4001, 1234, 5678);var bar = new Array(5921);
~~~~

</p>

While **foo** was behaving nicely

<p>
~~~~ {.javascript name="code"}
[4001, 1234, 5678]
~~~~

</p>

**bar** kept showing up like this:

<p>
~~~~ {.javascript name="code"}
[undefined, undefined, undefined, undefined, 5917 more...]
~~~~

</p>

Have you figured out the problem yet?

There are lots of different ways to declare a [Javascript Array
object][]

<p>
~~~~ {.javascript name="code"}
var a = new Array(1,2,3,4); //This contains the values 1,2,3,4var a = new Array();a[0] = 1;a[1] = 2; //This array now has the values 1,2var a = [1,2,3,4]; //Literal notation, this is the ideal way to declare an array.var a = new Array(5);  //This is an empty array with 5 elements
~~~~

</p>

See that last one? Our code for **bar** up above doesn't realize we want
to put the **value** 5921 into element 0 of the array. It thinks we
wanted to create an empty array with 5921 elements!

Changing the code to this fixed the problem:

<p>
~~~~ {.javascript name="code"}
var bar = new Array(5921,0);
~~~~

</p>

  [Javascript Array object]: http://www.w3schools.com/JS/js_obj_array.asp
