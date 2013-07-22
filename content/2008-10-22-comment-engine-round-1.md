Title: Comment Engine:  Round 1
Date: 2008-10-22 09:15
Author: mark
Category: Programming
Tags: google-appengine, python
Slug: comment-engine-round-1

[Last week][], I mentioned that I was working on a comment engine which
uses the Google App Engine for the back end. While the plan is for it to
support multiple sites, its main purpose is to be used here on this
site.

</p>

After some on-and-off hacking over the weekend, I have something that
works reasonably well. The App Engine back-end seems to be working
perfectly. The front-end (which will sit on this site) is going to be
PHP & Javascript.

</p>

### Here's what works

</p>

-   Comments can be submitted and are saved to the Google Datastore.
    </p>

    -   The comment is submitted as JSON-encoded array.
    -   The array contains the following fields: author, email, comment,
        pagename, sitename, & sitekey.

-   Every comment is keyed with a site name, page name, & a unique id.
-   A unique identifier is required to submit a comment. This **should**
    prevent comments from being submitted from outside of the hosting
    page. We'll see how well this part works once it goes live.
-   Comments can be retrieved in the following way (all return values
    are in JSON format)
    </p>

    -   **/get/`<sitename`\>** returns all comments for an entire site.
    -   **/get/`<sitename`\>/`<pagename`\>** returns all comments for
        the specific page on a site.
    -   **/get/`<sitename`\>/`<pagename`\>/`<id`\>** returns a single
        comment for a page.

</p>

### What's left to do?

</p>

-   Need a way to moderate comments. Deleting comments is the most
    important. The problem is dealing with the authentication so that
    only authorized users can moderate.
-   Need a better way to support multiple sites & API keys. Right now,
    there's just one sitekey for this site and it's hard coded.

</p>

What I need to do is sit down and figure out the [Users API][], create
an admin page, and then just use my Gmail account to login.

</p>

### Let's see it in action

</p>

OK, if you're really that excited about it.

</p>

Here's an example url:

</p>

[http://antelopecomments.appspot.com/get/blog.antelopelovefan.com][]

</p>

Click on that link and, as of right now, you're going to see something
like this

</p>

<p>
    {"46540": {"comment": "This is a test comment", "pagename": "search-replace-with-vim", "sitename": "blog.antelopelovefan.com", "email": "tech@antelopelovefan.com", "author": "Mark Biek"}}

</p>

That's a JSON string that shows a single comment (id 46540) attached to
this site (blog.antelopelovefan.com) and the page
*search-replace-with-vim*.

</p>

I could also do this to just get back the *search-replace-with-vim* page
comments (although there aren't any other pages right now so this url
returns the same thing).

</p>

[http://antelopecomments.appspot.com/get/blog.antelopelovefan.com/search-replace-with-vim][]

</p>

And then I can do this if I just want that one comment with id 46540

</p>

[http://antelopecomments.appspot.com/get/blog.antelopelovefan.com/search-replace-with-vim/46540][]

</p>

I'm not doing anything with the above link yet but it'll come in handy
for permanent links to specific comments.

</p>

### So how does it get used?

</p>

It's funny because I think I wrote 3 times more PHP & Javascript code to
make use of the comment engine than I wrote Python code for the
back-end.

</p>

None of the PHP/JS stuff is very complicated.

</p>

-   I wrote a couple of classes which use **cURL** to do the appropriate
    GET & POST calls.
-   All of the JSON manipulation in PHP is handled via **json\_encode**
    and **json\_decode**.
-   The Javascript makes heavy use of **Prototype** and its Ajax
    library.
-   The form is protected using **[reCAPTCHA][]** which is completely
    free and dropped right in using their PHP library.

</p>

Most of what's remaining on the PHP side is reorganizing so I can easily
attach comments to other PHP-based sites.

</p>

So, if all goes well, I should be to have comments available on this
site soon.

</p>

  [Last week]: http://blog.antelopelovefan.com/foray-into-the-google-app-engine
  [Users API]: http://code.google.com/appengine/docs/users/
  [http://antelopecomments.appspot.com/get/blog.antelopelovefan.com]: http://antelopecomments.appspot.com/get/blog.antelopelovefan.com
  [http://antelopecomments.appspot.com/get/blog.antelopelovefan.com/search-replace-with-vim]:
    http://antelopecomments.appspot.com/get/blog.antelopelovefan.com/search-replace-with-vim
  [http://antelopecomments.appspot.com/get/blog.antelopelovefan.com/search-replace-with-vim/46540]:
    http://antelopecomments.appspot.com/get/blog.antelopelovefan.com/search-replace-with-vim/46540
  [reCAPTCHA]: http://recaptcha.net/
