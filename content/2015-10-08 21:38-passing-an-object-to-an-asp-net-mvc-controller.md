Title: Passing an object to an ASP.NET MVC Controller
Date: 2015-10-08 21:38
Author: mark
Category: 
Tags: 
Slug: passing-an-object-to-an-asp-net-mvc-controller

### Passing an object to an ASP'NET MVC Controller

Most of my (limited) work with ASP'NET MVC involved passing simple strings or integers to a Controller Action.

But it turns out it’s super easy to pass other, more complicated objects to an Action as well.

Let’s say we have a simple Person class:

public class Person
{
    public int Id { get; set;}
    public string FirstName { get; set;}
    public string LastName { get; set; }
}

And let’s say we have a simple HTML form:

@ using (Html'BeginForm("FormTest", "Person")
{
    <input type="text" name="Id" value="1" />
    <input type="text" name="FirstName" value="Bob" />
    <input type="text" name="LastName" value="Dobbs" />

    <input type="submit" name="Submit" value="Submit" />
}

We could set up a Controller Action to handle the form that looks like this:

public ActionResult FormTest( int id, string FirstName, string LastName)
{
}

But that’s a little verbose and would be annoying if we ever had to add more values.

And here’s where ASP'NET MVC tries to help you out.

As long as your form fields match the properties of a class object, MVC is smart enough to have an Action that takes a instance of that object as a parameter.

That means we can rewrite our Action as:

public ActionResult FormTest( Person p)
{
}

Side Note: This also works with ajax calls from Javascript. You just need the Javascript object you’re sending to have properties that match your class.

(Many thanks to my colleague [https://twitter'com/crybx](https://twitter.com/crybx) for showing me this trick)

