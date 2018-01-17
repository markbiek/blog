Title: Debugging remote ASP.NET apps is super easy!
Date: 2015-08-17 21:48
Author: antelopelovefan
Category: 
Tags: 
Slug: debugging-remote-asp-net-apps-is-super-easy

### Debugging remote ASP'NET apps is super easy!

I am not a super advanced .NET developer, although I’ve learned a ton in the last couple of years.

All of my current work projects have multiple deployment environments. I start development on my local machine, then deploy to a Sandbox area, the Development, then QA, and finally Production.

This isn’t usually a problem. I do my local dev, push changes out and everything is fine.

But then I ran into a weird issue that was only happening in the Sandbox environment.

In the past, I’d write out a log or debug messages but I figured there had to be a better way to do it. It turns out, there is and it’s super easy!

It’s called the Remote Debugging Monitor (aka msvsmon'exe) and it comes with Visual Studio Professional and above.

Step 1:

Run msvsmon'exe on the server where your application is running. On a machine with Visual Studio installed, it’s located in \Microsoft Visual Studio 12'0\Common7\IDE\Remote Debugger\.

The server I was dealing with didn’t have Studio so I just shared that folder on my local machine and ran it on the server from the share.

That will pop up a little window that looks like this:

<img src="https://cdn-images-2.medium.com/max/800/1*VWICkLt9hOgpYPAejiBODg.jpeg"  />

Step 2:

On your development machine, run Debug:Attach to Process, and enter the name of your server in Qualifier box. Then attach to the w3wp'exe (IIS) process.

<img src="https://cdn-images-2.medium.com/max/800/1*r8N7ZLYqHboosKW2csFXVA.jpeg"  />

Step 3:

Hit your website in a browser and debug normally.

<img src="https://cdn-images-2.medium.com/max/800/1*9d9yjNv3utm619cY1x0rqQ.gif"  />

