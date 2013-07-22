Title: Handling Windows API Callbacks in VB .NET
Date: 2010-10-05 10:43
Author: mark
Category: Geek, Programming
Tags: vb.net, windowsapi
Slug: handling-windows-api-callbacks-in-vb-net

I’ve been working on a VB .NET app to capture video from a webcam. The
app started off using a for-pay ActiveX control that I was never
particularly happy with. It was expensive, didn’t work very well, and
was a pain to distribute.

Imagine my great surprise when I learned that all of the video-capture
functionality I needed was available through the Windows API
(specifically [avicap32.dll][]). Apparently, [DirectShow][] can also be
used but my needs are pretty basic and DirectShow seemed like overkill.

I’ll go into some of the details of actually capturing video in a later
post. For now, I want to talk about handling Windows API Callbacks.
There are a number of events that the video capture API can fire
(real-time status messages, etc) and the only way to handle those events
is by registering a callback.

For a very thorough description of what’s actually going on, take a look
at [Implementing Callback Notifications Using Delegates (Ted
Pattison)][]. I’m just to cover the basic code to get something working.

In this example, we’re going to set up a callback to handle video
capture status messages. This is done by sending a
[WM\_CAP\_SET\_CALLBACK\_STATUS][] message to the capture hWnd along
with a pointer to the callback function. In VB .NET, this is handled
using a function Delegate.

### Define the delegate

</p>
The callback function we’re implementing is [capStatusCallback()][] so
our delegate will look like this:

<p>
~~~~ {.vb name="code"}
Public Delegate Sub capStatusCallback(ByVal hwnd As Integer, ByVal nID As Integer, ByVal lpsz As String)
~~~~

</p>

### Define the function to pass the appropriate message

</p>
Most Windows API windowing functions involve sending various messages to
window handles. This is true even for the video capture functions.

You’ve probably seen code like this for defining the [SendMessage][]
function

<p>
~~~~ {.vb name="code"}
Public Declare Function SendMessage Lib "user32" Alias "SendMessageA" _       (ByVal hwnd As Integer, ByVal Msg As Integer, _        ByVal wParam As Integer, _        ByVal lParam As Object) As Integer
~~~~

</p>

In this case, our function will look exactly like the above except the
last parameter will be the capStatusCallback delegate type instead of an
Object.

<p>
~~~~ {.vb name="code"}
Public Declare Function SendStatusCallbackMessage Lib "user32" Alias "SendMessageA" _       (ByVal hwnd As Integer, ByVal Msg As Integer, _        ByVal wParam As Integer, _        ByVal lParam As capStatusCallback) As Integer
~~~~

</p>

### Define the callback function to be called

</p>
This is a regular VB function that has the same signature as the
delegate we defined above.

<p>
~~~~ {.vb name="code"}
Public Sub HandleStatusCallBack(ByVal hwnd As Integer, ByVal nID As Integer, ByVal lpsz As String)        debug.print(lpsz)End Sub
~~~~

</p>

### Register the callback

</p>
The final step is to send the message that actually registers the
callback with the window.

<p>
~~~~ {.vb name="code"}
SendStatusCallbackMessage(hWnd, WM_CAP_SET_CALLBACK_STATUS, 0, AddressOf HandleStatusCallBack)
~~~~

</p>

We’re send the appropriate message (WM\_CAP\_SET\_CALLBACK\_STATUS) to
the window along with the address of the function to be called.

There’s a lot of extra stuff happening behind the scenes in terms of
actually wiring up your callback function to the Windows API but you
don’t necessarily have to understand it to use it.

  [avicap32.dll]: http://www.devx.com/dotnet/Article/30375/1763
  [DirectShow]: http://msdn.microsoft.com/en-us/library/dd373406(v=VS.85).aspx
  [Implementing Callback Notifications Using Delegates (Ted Pattison)]: http://msdn.microsoft.com/en-us/magazine/cc188909.aspx
  [WM\_CAP\_SET\_CALLBACK\_STATUS]: http://msdn.microsoft.com/en-us/library/dd743922(VS.85).aspx
  [capStatusCallback()]: http://msdn.microsoft.com/en-us/library/dd756940(v=VS.85).aspx
  [SendMessage]: http://msdn.microsoft.com/en-us/library/ms644950(VS.85).aspx
