Title: Advice from a software-development old head
Date: 2022-07-14 11:06
Author: mark
Category: Programming
Tags: software-development,learning,advice
Slug: advice-from-an-old-head

After 25 years working as a software developer, I've been thinking a lot about the things that have been the most important over the course of my career. The interesting pattern I've noticed is that most of these things aren't unique to software development at all. You could easily apply them to just about anything.

# Curiosity is your friend

- Always wonder about things.
- Wonder how things work.
- Wonder _why_ they work the way they do. 
- Explore! Try to see things that other people aren't seeing.

# Never stop learning

- Fall in love with learning new things. 
- Fall in love with learning more about things you already know.
- Get good at the process of learning so you can learn more things faster!

# Communication is key

- We don't do work in a vacuum. Being able to communicate your ideas to others is paramount.
- Learn to writing clearly and simply. 
  - The [Automattic Style Guide](https://fieldguide.automattic.com/the-automattic-style-guide/) is a good compilation of resources.
- > "Programs are meant to be read by humans and only incidentally for computers to execute." - Donald Knuth

# Master your tools

- Learn the ins and outs and full capabilities of your tools. Nothing makes work faster than efficient tool use.
  - [Visual Studio Code docs](https://code.visualstudio.com/docs)
  - [Vim help](https://vimhelp.org/)
- Collect keyboard shortcuts for all the programs you use. Make it a game where you lose points when you touch the mouse. Write the shortcuts on post-its stuck to your monitor to help you remember.
  - [AlfredApp](https://www.alfredapp.com/)
  - [OSX shortcuts](https://support.apple.com/en-us/HT201236)
- Get good at the command-line. At a minimum, get comfortable manipulating files and strings from the cli.
  - [Beginner's guide to the cli](https://ubuntu.com/tutorials/command-line-for-beginners#1-overview)

# Get good at searching

There's to much stuff to remember so you're going to spend a lot of time trying to find what you need.

## Searching for information

Get good at searching the Internet. 

- You need to be able to track down the source of error messages. 
- There will be things you don't know how to do and other people have already done them. Learn how to find those details!

## Searching Code

How do you know where the code you need to change lives? You have to search for it!

- Your editor probably has all kinds of fancy search tools. Learn how to use them.
- Learn cli search tools (`grep`, `ack`, `ripgrep`, etc). There are lots of them.
  - [ack](https://beyondgrep.com/)
- Learn enough regex to make your searches more efficient.
  - [Regex tutorial](https://regextutorial.org/)
- Learn how to trace your way through code. Maybe you need to change the functionality of a button and you don't know where the code is. Start by finding where the button markup is, then trace your way back up through the code.