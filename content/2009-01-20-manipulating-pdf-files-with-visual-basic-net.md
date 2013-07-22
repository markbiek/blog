Title: Manipulating PDF files with Visual Basic .NET
Date: 2009-01-20 20:54
Author: mark
Category: Programming
Tags: pdf, vb.net
Slug: manipulating-pdf-files-with-visual-basic-net

There have been a number of times where I've needed to export each page
of a large PDF to its own file. There appear to be lots of commercial
products that do this but they're expensive and more powerful than I
really need. After much unsuccessful searching for a free utility, I
gave up and decided to write my own using the **Adobe Acrobat 8.0 Type
Library**. I may be wrong but I believe you only get access to the type
library with the full version of Acrobat. I haven't checked to see if it
comes with Adobe Reader.

The only thing even remotely tricky about this program is the need for
an existing PDF file to insert pages into. I couldn't figure out how to
create an empty PDF from scratch so I just have a file called
*blank.pdf* which has a single blank page. Each page gets inserted into
the blank file, then saved under a new name.

Here's the basic flow of the program:

1.  Open the file containg the pages we want to extract.
2.  Loop through all of the pages.
3.  For each page, open the blank PDF file.
4.  Insert the current page from the input file into the blank file.
5.  Delete the blank page from the blank file.
6.  Save the blank file under a new name.

</p>

The main object is the **AcroPDDoc** object.

<p>
~~~~ {.vb.net name="code"}
        Dim origDoc As New Acrobat.AcroPDDoc        Dim blankDoc As New Acrobat.AcroPDDoc        Dim i As Integer, numPages As Integer        Dim outFile As String, inFile as String        inFile = "infile.pdf"        If origDoc.Open(inFile) Then            numPages = origDoc.GetNumPages()            For i = 0 To numPages - 1                outFile = "output.pdf"                blankDoc.Open(Application.StartupPath() & "\blank.pdf")                blankDoc.InsertPages(-1, origDoc, i, 1, False)                blankDoc.DeletePages(blankDoc.GetNumPages() - 1, blankDoc.GetNumPages() - 1)                blankDoc.Save(Acrobat.PDSaveFlags.PDSaveFull, outFile)                blankDoc.Close()            Next            origDoc.Close()        Else            MsgBox("Could not open " & inFile, MsgBoxStyle.Critical)        End If
~~~~

</p>

The type library is pretty easy to understand. Here's a very brief
summary of the methods I ended up using. There's a lot of functionality
that I didn't touch that lets you do all kinds of exciting things with
PDF files.

-   **GetNumPages()** Returns the number of pages in the current file.
-   **InsertPages( InsertAfterPage, SourceDocument, SourcePage,
    NumberOfPagesToInsert, Options)** Takes a page (or page range) from
    a document and inserts the page(s) into the calling document.
-   **DeletePages( StartPage, EndPage)** Deletes a page (or page range)
    from a document.
-   **Save( SaveOptions, OutputFile)**. Saves a file.

</p>

