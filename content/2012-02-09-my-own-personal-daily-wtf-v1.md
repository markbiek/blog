Title: My Own Personal Daily WTF v1
Date: 2012-02-09 14:31
Author: mark
Category: Programming
Tags: wtf
Slug: my-own-personal-daily-wtf-v1

I’m sure most developers out there are familiar with [The Daily WTF][].
I’m also sure most developers are aware of the [dirty little secret][]
that we *all* write bad code sometimes.

This is a chance to share some of my own personal horror stories.

It was 2000 and I was working at my second job after college. I was
mostly coding for the PalmOS but dabbled a bit in Classic ASP
(VBScript).

One day, I was given the task of writing a script to email several
hundred people using an off-the-shelf COM object for email tasks.

The pseudo-code of the script went something like this:

<p>
    dim emailListdim emailSender 'The 3rd-party componentemailSender.StartSession()for each person in emailList  emailSender.From = emailList.email  emailSender.Subject = "Whatever"  emailSender.Body = "Foo"  emailSender.SendnextemailSender.EndSession()

</p>
Pretty straightforward, right?

What I didn’t realize was that, during a single session, setting the
From address actually did an **append** rather than overwriting the
current value.

That meant that, the first time through the loop, the email went to the
first person. The second email went to the second person *and* the first
person. The third email went to the third person, second person, and
first person. And so on.

Luckily, I was on the list so I immediately noticed that I was getting
multiple emails. Unfortunately it ran through half the list before I was
able to get IIS stopped.

As you can imagine, we had a lot of really pissed of replies.

  [The Daily WTF]: http://thedailywtf.com/
  [dirty little secret]: http://worsethanfailure.com/Articles/Guest_Article_0x3a__Our_Dirty_Little_Secret.aspx
