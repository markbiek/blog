Title: Automatically blocking Twitter spam accounts
Date: 2009-08-16 21:02
Author: mark
Category: Geek, Programming
Tags: python, spam, twitter
Slug: automatically-blocking-twitter-spam-accounts

At this point, I'm sure that everyone has been followed by one of
[many][] [spam][] [Twitter][] accounts.

It's pretty obvious that these are bogus, if not by the lack of actual
content, then by the small number of followers compared to the massive
number of friends.

So let's use the Twitter API to write a little script that detects these
accounts and automatically blocks them.

The first thing to do is to get the [list of followers][] for your
Twitter account. All you have to do is send a GET request to
[https://twitter.com/statuses/followers.json][] (change the .json to .xml
to get XML back instead). The request should send, via Basic
Authentication, your Twitter username and password.

The above gives you a nice list of Twitter users with all sorts of
information, including their Twitter user ID, number of followers, and
number of friends. From there, it's simple to loop over the list and
check the ratio of followers to friends.

I found


> if (**Follower** / **Friends**) \* 100 < 5


to be a nice threshold.

Now that we've identified the bogus accounts, we can use the API call to
[block them][]. In this case, we do an HTTP POST to
[https://twitter.com/blocks/create/id.json][], passing the user ID to
block as the single POST value.

At the end of this post is a complete Python script that will do all of
the above. In the process of writing the script, I got to learn about
parsing Python script command-line arguments using [optparse][].

Using optparse makes handling command-line arguments dead simple.


~~~~ {.python name="code"}
    parser = OptionParser()    parser.add_option("-d", "--dry-run", action="store_true", dest="dryrun", help="Displays accounts that would be blocked.")    (options, args) = parser.parse_args()    if options.dryrun:      print "--dry-run or -d was found on the command-line."    else:      print "No --dry-run or -d found."
~~~~



The other nice thing is that optparse automatically handles **--help**
(or -h) and prints out a nice help message based on the help text passed
to the add\_option() method of optparse.

Here's the complete script which I hope you find useful. I'm releasing
it using under the [WTFPL][] license. No warranties, blah blah, not my
fault if it breaks you computer, squishes your kitten, etc.


~~~~ {.python name="code"}
#!/usr/bin/pythonimport urllibimport urllib2import base64import jsonimport sysfrom optparse import OptionParser#################################################################################username = ''password = ''verbose = Falsedef twitterRequest(url, username, password, values=None):    b64str = base64.encodestring( '%s:%s' % (username, password))[:-1]    header = {'Authorization': "Basic %s" % b64str}    if not values is None:        values = urllib.urlencode(values)    req = urllib2.Request( url, values, header)    res = urllib2.urlopen(req)    return json.loads(res.read())def blockExists(username, password):    try:        twitterRequest('https://twitter.com/blocks/exists/%(id)s.json' % {'id': follower['id']}, username, password)        return True    except urllib2.HTTPError, e:        return Falsedef blockUser(id, username, password):    if not blockExists(username, password):        twitterRequest('https://twitter.com/blocks/create/%(id)s.json' % {'id': follower['id']}, username, password, values={'id': id})def vMsg(msg):    if verbose:        print msg#################################################################################if __name__ == "__main__":    cliError = False    doBlock = False    parser = OptionParser()    parser.add_option("-d", "--dry-run", action="store_true", dest="dryrun", help="Displays accounts that would be blocked.")    parser.add_option("-b", "--block", action="store_true", dest="block", help="Blocks accounts that fall under the specified threshold")    parser.add_option("-v", "--verbose", action="store_true", dest="verbose", help="Print detailed status messages")    parser.add_option("-t", "--threshold", dest="threshold", help="The threshold accounts must fall under before they're blocked (default is 5)")    parser.add_option("-u", "--username", dest="username", help="Twitter username")    parser.add_option("-p", "--password", dest="password", help="Twitter password")    (options, args) = parser.parse_args()    #Handle command-line argument log to make sure this is a valid call    if options.threshold is None:        threshold = 5    else:        threshold = int(options.threshold)    if (options.dryrun is None and options.block is None) or (not options.dryrun is None and not options.block is None):        print "You must select either --dry-run or --block."        cliError = True    if options.username is None:        print "Username required."        cliError = True    if options.password is None:        print "Password required."        cliError = True    if cliError:        print ""        parser.print_help()        sys.exit(1)    username = options.username    password = options.password    verbose = options.verbose    doBlock = options.block    followers = twitterRequest('https://twitter.com/statuses/followers.json', username, password)    spamCount = 0        #All of the command-line stuff was OK so continue with the scanning & blocking    for follower in followers:        followers = float(follower['followers_count'])        friends = float(follower['friends_count'])        ratio = (followers / friends) * 100        if ratio < threshold:            spamCount = spamCount + 1            if doBlock:                prefix = "Blocking Account:\t"                blockUser(follower['id'], username, password)            else:                prefix = "Possible Spam Account:\t"            print prefix + str(follower['id']) + "\t\t" + follower['screen_name'] + "\t\t" + str(followers) + "\t\t" + str(friends) + "\t\t" + str(ratio)    if spamCount <= 0:        vMsg("No followers were flagged as potential spam accounts.")    sys.exit(0)
~~~~



  [many]: https://twitter.com/hardrockhi67635
  [spam]: https://twitter.com/RedBullGurha5
  [Twitter]: https://twitter.com/ShelbyGlenn97
  [list of followers]: https://apiwiki.twitter.com/Twitter-REST-API-Method:-statuses followers
  [https://twitter.com/statuses/followers.json]: https://twitter.com/statuses/followers.json
  [block them]: https://apiwiki.twitter.com/Twitter-REST-API-Method:-blocks create
  [https://twitter.com/blocks/create/id.json]: https://twitter.com/blocks/create/id.json
  [optparse]: https://docs.python.org/library/optparse.html
  [WTFPL]: https://sam.zoy.org/wtfpl/
