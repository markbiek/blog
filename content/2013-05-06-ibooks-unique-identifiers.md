Title: So iBooks Have a Hidden Unique ID 
Date: 2013-05-06 15:45
Author: mark
Category: Programming
Tags: ibooks
Slug:  ibooks-unique-identifiers


We ran into an interesting problem at work the other day.

We'd created an iBook for a client a while back and were in the process of creating an updated one. The oddity was that, when you had both ibooks installed on the same iPad and you clicked on the old iBook, it always launched the newer iBook.

It turns out that, when you create a new project in iBooks Author, it creates a hidden unique identifier for the book.

We had copied the old iBooks Auther project to create the new iBook so the new book had the same hidden id.

#### So what do you do?

There are a couple of solutions.

If you don't have much content, it might be quickest to just create a new project and pull your content into it.

But if you've spent a lot of time updating your project, it may be a huge pain to recreate it.

In that case, just go to the *File* menu and click *Save as Template*. This, as you might guess, saves your current project as a template.

Then you can go and create a new iBooks Author project, chose the template you just saved as the new template and you should be good to go.
