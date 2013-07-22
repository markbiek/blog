Title: Backing up your Google Docs
Date: 2009-03-05 18:53
Author: mark
Category: Programming
Tags: googleapi, googledocs, python
Slug: backing-up-your-google-docs

I've gradually become a big fan of [Google Docs][] over the last few
months. My process for writing most of these posts has been to write the
first drafts on Google Docs, then copy things over to WordPress and
clean up any lingering formatting issues. I still wouldn't consider it
to be a full-fledged replacement for Microsoft Office (which is also how
I feel about Open Office, a discussion for another day) but it meets my
basic needs.

Being to able to access everything from any computer is also a nice
improvement to my old process. I used to compose posts in gVim, keep the
revisions in Subversion, and then copy over to WordPress. This ended up
being pretty cumbersome when switching from machine to machine.

The biggest problem I have with Google Docs is that I don't entirely
trust it yet. It's a black blox and the inner workings are only visible
to a third-party. What would happen if Google Docs blew up or they
decided to start charging for it or there was just some random glitch
and all of my data disappeared? I don't ever want to be in a situation
where the only copy of my data is in a place that I don't have full
control over.

The easiest way to take care of that is to always have a copy of my data
somewhere else, ideally back at my house where it can be included in my
existing offsite backup [strategy][]. Google Docs does have the ability
to save a document as a file to a variety of formats (just right-click
on it in the items list) but, as we all should know by now, **manual
backups don't work.** I want something that will just sit in the
background and download all of my Google Docs stuff automatically
without ever having to think about it.

And it turns out that it's pretty easy to write something to do just
that, thanks to the [Google Documents List Data API][]. All of the code
snippets are in Python (because I need some Python practice) but it all
boils down to calling different URLs so a PHP version should be pretty
easy to come up with.

### Step 1: Authentication

</p>

I've talked about [authenticating against a Google account][] using PHP.
Here's a simple little snippet to get the Auth code using Python
instead:

<p>
~~~~ {.python name="code"}
def getAuthInfo( email, password, source, service = 'writely', accountType = 'GOOGLE'):    loginUrl = 'https://www.google.com/accounts/ClientLogin'    loginData = {            'accountType': accountType,            'Email': email,            'Passwd': password,            'service': service,            'source': source,            'session': 1            }    req = urllib2.Request( loginUrl , urllib.urlencode(loginData))    res = urllib2.urlopen(req)    data = res.read()    authInfo = {}    for item in data.split():        fields = item.split('=')        authInfo[fields[0]] = fields[1]    return authInfo
~~~~

</p>

The *service* parameter tells Google which service you're authenticating
against. The default here is **writely** which is the Document List
service. The *source* parameter is just a string uniquely identifying
your app. The return value is a dictionary of the different response
values. The one you're generally interested in is *Auth*.

### Step 2: Getting the list of documents

</p>
You can retrieve [a list of documents][] by sending an **authenticated
request** to

**http://docs.google.com/feeds/documents/private/full**

A request is authenticated by including the auth value retrieved in Step
1 as part of the HTTP header. The actual format of the header looks like
this:

**Authorization: GoogleLogin auth=*AuthValue***

and here's the Python code for actually retrieving the list:

<p>
~~~~ {.python name="code"}
def getDocList(auth):    docListUrl = 'https://docs.google.com/feeds/documents/private/full'    header = {'Authorization': 'GoogleLogin auth=' + auth}    req = urllib2.Request( docListUrl, None, header)    res = urllib2.urlopen(req)    data = res.read()    return data
~~~~

</p>

You can see how the HTTP header is just a Python dictionary that we pass
to the URL.

The response to this API call is a big block of XML containing a list of
**entry** elements for each document. An <entry\> element looks like
this:

<p>
~~~~ {.xml name="code"}
    type="text/html" />      test.user    test.user@gmail.com      scheme="http://schemas.google.com/g/2005#kind"  term="http://schemas.google.com/docs/2007#document" />    scheme="http://schemas.google.com/g/2005/labels"  term="http://schemas.google.com/g/2005/labels#starred" />  http://docs.google.com/feeds/documents/private/full/document%3Adocument_id    type="text/html" />    rel="self" type="application/atom+xml" />  Test Document  2007-07-03T18:02:50.338Z
~~~~

</p>

The **label** attribute of the first **<category\>** child element
contains the type of the document. This is important because different
URLs are required for downloading Docs vs. Presentations vs.
Spreadsheets.

This is a simple function for retrieving the document list:

<p>
~~~~ {.python name="code"}
def getDocList(auth):    docListUrl = 'https://docs.google.com/feeds/documents/private/full'    header = {'Authorization': 'GoogleLogin auth=' + auth}    req = urllib2.Request( docListUrl, None, header)    res = urllib2.urlopen(req)    data = res.read()    return data
~~~~

</p>

This code snippet that shows authenticating, getting the document list,
and looping over each entry in the list. This version is extracting the
document id from the URL in the **<id\>** element. I need to check to
see if the **gd:etag** attribute of the entry is also the document id
because that would be a much cleaner way of getting the id.

This code also grabs the document type (document, presentation, or
spreadsheet) and takes the document title and cleans it up so it's
suitable to use as an output filename.

<p>
~~~~ {.python name="code"}
    authInfo = getAuthInfo( 'username@gmail.com', 'password', 'My Backup Script', 'writely')    docListXML = getDocList( authInfo['Auth'])    docList = minidom.parseString(docListXML)    for entry in docList.getElementsByTagName('entry'):        ids = entry.getElementsByTagName('id')        categories = entry.getElementsByTagName('category')        titles = entry.getElementsByTagName('title')        docIDLink = ids[0].firstChild.nodeValue        fields = docIDLink.split('%3A')        docID = fields[-1]        title = titles[0].firstChild.nodeValue        cleanTitle = re.sub('[^aA-zZ0-9 ]', '', title)        categoryLabel = categories[0].attributes['label'].value        downloadDoc(docID, categoryLabel, cleanTitle)
~~~~

</p>

### Step 3: Downloading each document

</p>

There are three different URLs to use for the three different types of
documents.

-   Documents:
    </p>
    <p>
    *http://docs.google.com/feeds/download/documents/Export?docID=**example\_document\_id**&exportFormat=**example\_format***
-   Presentations:
    </p>
    *http://docs.google.com/feeds/download/presentations/Export?docID=**example\_document\_id**&exportFormat=**example\_format***

    <p>
-   Spreadsheets:
    </p>
    *http://spreadsheets.google.com/feeds/download/spreadsheets/Export?key=**example\_spreadsheet\_id**&fmcmd=**example\_format***

    <p>

</p>

There are also a number of different export formats for each type of
document.

-   [Document and Presentation export formats][]
-   [Spreadsheet export formats][]

</p>

Actually downloading the file is just a matter of sending an
authenticated GET request to the appropriate URL and here's a function
to do it:

<p>
~~~~ {.python name="code"}
def downloadDoc(docID, categoryLabel, cleanTitle, auth):    if categoryLabel == 'document':        docUrl = 'http://docs.google.com/feeds/download/documents/Export?docID=' + docID + '&exportFormat=doc'        ext = '.doc'    elif categoryLabel == 'presentation':        docUrl = 'http://docs.google.com/feeds/download/presentations/Export?docID=' + docID + '&exportFormat=ppt'        ext = '.ppt'    elif categoryLabel == 'spreadsheet':        docUrl = 'http://spreadsheets.google.com/feeds/download/spreadsheets/Export?key=' + docID + '&fmcmd=4'        ext = '.xls'        print "Warning:  Downloading spreadsheets doesn't work yet."        return    else:        print 'Error:  Unknown category label (' + categoryLabel + ')'    filename = cleanTitle + ext    print 'Saving "' + filename + '"'    header = {'Authorization': 'GoogleLogin auth=' + auth}    req = urllib2.Request( docUrl, None, header)    res = urllib2.urlopen(req)    file = open(filename, 'w')    file.write(res.read())    file.close()
~~~~

</p>

You just pass the function a document id, categoryLabel (document,
presentation, or spreadsheet), and an output filename. This version
defaults to Microsoft Word format for documents, Powerpoint for
presentations, and Excel for spreadsheets.

This gives us the basic pieces for writing a very simple script to
download all of the files from a Google Documents account. I've got it
setup to run as a nightly cronjob. It's not what I would consider
"production-quality" code but it's more than enough to give me some
peace of mind.

**Wishlist for the next version**

-   Download spreadsheets
-   Get folder list from Google Docs and put downloaded files into
    appropriate folders
-   Don't download files that haven't changed since the last download

</p>

  [Google Docs]: 
  [strategy]: http://mark.biek.org/blog/2009/01/your-data-is-your-life-why-arent-you-protecting-it/
  [Google Documents List Data API]: http://code.google.com/apis/documents/docs/2.0/developers_guide_protocol.html
  [authenticating against a Google account]: http://mark.biek.org/blog/2009/01/google-client-logins/
  [a list of documents]: http://code.google.com/apis/documents/docs/2.0/developers_guide_protocol.html#ListDocs
  [Document and Presentation export formats]: http://code.google.com/apis/documents/docs/2.0/developers_guide_protocol.html#DownloadingDocsAndPresentations
  [Spreadsheet export formats]: http://code.google.com/apis/documents/docs/2.0/developers_guide_protocol.html#DownloadingSpreadsheets
