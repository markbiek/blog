Title: Demystifying Python Decorators
Date: 2009-06-30 21:25
Author: mark
Category: Geek, Programming
Tags: python
Slug: demystifying-python-decorators

I've been curious about Python decorators but, until tonight, couldn't
find an explanation that really made sense to me.


> 
> Python decorators modify functions, and in the case of *class
> decorators*, entire classes.
>
> 




> 
> Decorators allow you to inject or modify code in functions or
> classes.^[1][]^
>
> 



Here's the basic syntax for *using* a decorator function\>


~~~~ {.python name="code"}
@theDecoratordef myFunction():    print "Inside myFunction"
~~~~



Now I understood that the function **theDecorator** was somehow getting
called before **myFunction()** but I was completely lost beyond that.
What's actually happening is **theDecorator** is actually returning an
*entirely new function* which completely replaces **myFunction()**

In fact, the above syntax using the @ symbol is functionally equivalent
to this:


~~~~ {.python name="code"}
  myFunction = theDecorator(myFunction())
~~~~



So let's take a look at how a decorator function actually looks:


~~~~ {.python name="code"}
def theDecorator(f):    def new_f():        print "Calling ", f.__name__        f()        print "Done calling ", f.__name__    return new_f
~~~~



In the above case, we're replacing the decorated function **myFunction**
with a new function that prints out some messages and calls the original
**myFunction**

Given that definition of **theDecorator** and the decorated definition
of **myFunction**, calling **myFunction()** gives the following output:


> 
> Calling myFunction
>
> Inside myFunction
>
> Done calling myFunction
>
> 



This is, admittedly, a very simple example. For more details, check out
the article in the footnotes or this is great [article][] on decorators
with arguments.

<small>

1.  <a name="fn1">[Decorators I: Introduction to Python
    Decorators][]</a>


</small>

  [1]: #fn1
  [article]: https://www.artima.com/weblogs/viewpost.jsp?thread=240845
  [Decorators I: Introduction to Python Decorators]: https://www.artima.com/weblogs/viewpost.jsp?thread=240808
