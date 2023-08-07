Title: Regular expressions in VBA
Date: 2009-01-20 21:05
Author: mark
Category: Programming
Tags: regex, vba
Slug: regular-expressions-in-vba

I recently had to write a large amount of Microsoft Access VBA code to
parse a bunch of text reports and store those results into tables in
Access. I'm sure many of you out there are shuddering and/or sneering
about having to write Access VBA.

My feelings are n-fold:

1.  It was a paying gig and I got to do it from home.
2.  It was a nice break from writing PHP & Python.
3.  It was an interesting intellectual exercise and I got to learn
    something new.



Sounds like a pretty good deal, right?

The text I had to parse lent itself pretty nicely to a set of regular
expressions but I wasn't sure how that was done (or if it was even
possible) in VBA. Of course I didn't give VBA enough credit because 30
seconds of googling lead me to the [RegExp object][] which can be found
by adding a reference to the **Microsoft VBScript Regular Expressions**
library.

It's dead simple to use, especially if you have something like [![Regex
Buddy][]][] to help with building your regular expressions.

Here's an example that does some simple testing as well as grouped
matching including retrieving subgroups.

    Dim szLine As String    
    Dim regex As New RegExp    
    Dim colregmatch As MatchCollection    
    With regex        
        .MultiLine = False        
        .Global = True        
        .IgnoreCase = False    
    End With    
    szLine = "Analyzed range (from-to)   10  100"    
    regex.Pattern = "    Analyzed range"    
    If regex.Test(szLine) Then        
        regex.Pattern = ".*?([0-9]+).*?([0-9]+)"        
        Set colregmatch = regex.Execute(szLine)        
        'From        
        Debug.Print colregmatch.Item(0).submatches.Item(0)        
        'To        
        Debug.Print colregmatch.Item(0).submatches.Item(1)     
    End If

  [RegExp object]: https://msdn.microsoft.com/en-us/library/ms974570.aspx#scripting05_topic2
  [Regex Buddy]: https://farm4.static.flickr.com/3447/3228727140_280fa74bce.jpg?v=0
  [![Regex Buddy][]]: https://www.regexbuddy.com/
