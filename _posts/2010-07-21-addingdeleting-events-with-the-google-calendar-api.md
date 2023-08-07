Title: Adding/Deleting Events with the Google Calendar API
Date: 2010-07-21 13:06
Author: mark
Category: Geek, Programming
Tags: calendar, google, googleapi, php
Slug: addingdeleting-events-with-the-google-calendar-api

I recently had a chance to fool around with the [Google Calendar API][],
specifically adding and deleting events.

I've talked in the past about using [Google Client Logins][] to access
the [Google Data API][] and we'll use that same ClientLogin code to
authenticate our requests to the Calendar API.

#### Authenticating


There are different ways to authenticate requests to Calendar depending
on the type of application you're writing. If you're writing a front-end
that a user is going to interact with, it's a good idea to use [AuthSub
proxy authentication][] which will redirect the user, let them login
with their Google Account, and send them back to your application.

In our case, we're writing PHP code that will modify the calendar behind
the scenes. For that scenario, we'll use [ClientLogin authentication][]
and use the class we [wrote last time][Google Client Logins]

In additional to needing a Google Account for authenticating, you'll
also need the **Calendar ID** if the calendar being used is *not* the
default calendar. The Calendar ID can be found near the bottom of the
page in the Settings for the calendar and is just a special, randomly
generated email address.

![image][]

#### Adding an Event


[Adding an event][] is pretty straightforward. It's just a matter of
sending an authenticated <entry\> XML packet via HTTP POST to the
calendar URL which is the following:


    https://www.google.com/calendar/feeds/userId/private/full


The userId is either your Google Account email address (if using the
default calendar) or the Calendar ID mentioned above (if using any other
calendar). You also need to make sure the Content-Type of the POST
request is **application/atom+xml**.

The event XML looks like this:


~~~~ {.php name="code"}
$xml = "            xmlns:gd='https://schemas.google.com/g/2005'>                      term='https://schemas.google.com/g/2005#event'>          {$params["title"]}          {$params["content"]}                      value='https://schemas.google.com/g/2005#event.opaque'>                                value='https://schemas.google.com/g/2005#event.confirmed'>                                          endTime='{$params["endTime"]}'>        ";
~~~~



A request is authenticated by including the **Authorization: GoogleLogin
auth="authToken"** header in the request. The authToken value comes back
with the initial ClientLogin request. If you're using my
**GoogleClientLogin** class, the authToken can be retrieved with the
**getAuth()** method.

One thing to watch for is the initial POST request may come back with an
HTTP 302 redirect. If it does, the redirect url will contain a
**gsessionid**. In that case, append the gesessionid to the calendar URL
and resend the exact same POST request.

If the entry is successfully added, you'll get back an XML response
containing the entry as well as HTTP headers with the **ETag** (more on
this in a minute) and the entry's **edit link** (more on that too).

#### Deleting an Event


Deleting an event is even easier. Just send an HTTP DELETE request to
the edit link you got back when you added the event. This can be pulled
from either the response XML when you add the event or from the response
"Location" header.

If want to make sure you don't delete an event that's been modified by
someone else, include the **If-Match: etag** header where etag is the
ETag returned when you added the event. If you don't care, just send
**If-Match: \***

#### Miscellaneous


I didn't know how to send an HTTP DELETE with PHP but it turns out to be
pretty simple. Just set the [curl][] option **CURLOPT\_CUSTOMREQUEST**
to ‘DELETE' and off you go.

Also, there are currently two versions of the Google Data Protocol. The
current is Version 2 and Version 1 is slowly being phased out. All of
the above refers to Version 2 and you want to make sure Google Calendar
knows that's the version you're using. To that end, make sure to include
the header **GData-Version: 2** with every request.

#### Code!


And, to illustrate all of the above, here's a class for encapsulating
some of this stuff.


~~~~ {.php name="code"}
class GoogleCalendar {    public $data;    public $xml;    public function __construct($login=null, $magicCookie="") {        $this->data = array();        if(!is_null($login)) {            $this->login = $login;        }        $this->magicCookie = $magicCookie;    }    //Return the authorization header used to authenticate all requests after the first one    protected function getAuthHeader() {        return 'Authorization:  GoogleLogin auth="' . $this->login->getAuth() . '"';    }    //If the calendar we are accessing is the default, the email address is the same as the email used to login.    //If the calendar is NOT the default, the email address can be found in the Calendar Settings     //and should be used as the altEmail    protected function getFeedEmail() {        return $this->altEmail ? $this->altEmail : $this->login->email;    }    //Adding an entry returns the ETag value as part of the HTTP header    //This function parses the header and attempts to find the ETag and return it    //$retFields should be the response exploded using \n as the delimeter    protected function getETagFromHeader($retFields) {        return $this->getHeaderFromRegex($retFields, "/^ETag:\s*(.*?)$/");    }    protected function getEditLinkFromHeader($retFields) {        return $this->getHeaderFromRegex($retFields, "/^Location:\s*(.*?)$/");    }    protected function getHeaderFromRegex($retFields, $regex) {        if(is_array($retFields)) {            foreach($retFields as $header) {                $matches = array();                if(preg_match("$regex", $header, $matches)) {                    return $matches[1];                }            }        }else {            throw new Exception("The header could not be found because the header array was invalid.");        }    }    //Adds an event to the calendar    public function addEvent($params) {        $url = "https://www.google.com/calendar/feeds/{$this->getFeedEmail()}/private/full";        //startTime should be a time() value so we can convert it into the correct format        $params["startTime"] = date("c", $params["startTime"]);        //If no end-time is specified, set the end-time to 1 hour after the start-time        if(!array_key_exists("endTime", $params)) {            $params["endTime"] = date("c", strtotime($params["startTime"])+60*60*1);        }        $xml = "                    xmlns:gd='https://schemas.google.com/g/2005'>                                      term='https://schemas.google.com/g/2005#event'>                  {$params["title"]}                  {$params["content"]}                                      value='https://schemas.google.com/g/2005#event.opaque'>                                                        value='https://schemas.google.com/g/2005#event.confirmed'>                                                                          endTime='{$params["endTime"]}'>                ";        //Do the initial POST to Google        $ret = $this->calPostRequest($url, $xml);        //If Google sends back a gsessionid, we need to make the request again        $matches = array();        if(preg_match('/gsessionid=(.*?)\s+/', $ret, $matches)) {            $url .= "?gsessionid={$matches[1]}";            $ret = $this->calPostRequest($url, $xml);        }        //Parse the XML response (which contains the newly added entry)        $retFields = explode("\n", $ret);        //print_r($retFields);        $entryXML = simplexml_load_string($retFields[count($retFields)-1]);        //Return an array containing the entry id (url) and the etag        return array(                "id"=> (string)$entryXML->id,                "etag"=> $this->getETagFromHeader($retFields),                "link"=> $this->getEditLinkFromHeader($retFields)                );    }    public function deleteEvent($url) {        return $this->calDeleteRequest($url);    }    public function calGetRequest($url) {        $curlOpts = array();        return $this->calCurlRequest($url, $curlOpts);    }    public function calPostRequest($url, $data) {        $curlOpts = array(            CURLOPT_POST=> true,            CURLOPT_POSTFIELDS=> $data,            CURLOPT_HEADER=> true,            CURLOPT_HTTPHEADER=> array('GData-Version:  2', $this->getAuthHeader(), 'Content-Type:  application/atom+xml')        );        return $this->calCurlRequest($url, $curlOpts);    }    public function calDeleteRequest($url) {        $curlOpts = array(            CURLOPT_CUSTOMREQUEST=> "DELETE",            CURLOPT_HTTPHEADER=> array('GData-Version:  2', $this->getAuthHeader(), 'If-Match:  *')        );        return $this->calCurlRequest($url, $curlOpts);    }    //This is a generic function for doing curl requests    //It expects a url and an array of CURLOPT values.  Certain defaults are set if not provided    private function calCurlRequest($url, $curlOpts) {        if(!array_key_exists(CURLOPT_FOLLOWLOCATION, $curlOpts)) {            $curlOpts[CURLOPT_FOLLOWLOCATION] = true;        }        if(!array_key_exists(CURLOPT_RETURNTRANSFER, $curlOpts)) {            $curlOpts[CURLOPT_RETURNTRANSFER] = true;        }        if(!array_key_exists(CURLOPT_HEADER, $curlOpts)) {            $curlOpts[CURLOPT_HEADER] = false;        }        if(!array_key_exists(CURLOPT_HTTPHEADER, $curlOpts)) {            $curlOpts[CURLOPT_HTTPHEADER] = array('GData-Version:  2', $this->getAuthHeader());        }        $ch = curl_init($url);        curl_setopt_array($ch, $curlOpts);        $ret = curl_exec($ch);        curl_close($ch);        return $ret;    }    public function __get($name) {        return $this->data[$name];    }    public function __set($name, $val) {        $this->data[$name] = $val;    }}
~~~~



Here's a simple example that adds an entry. The GoogleClientLogin class
can be found [here][Google Client Logins]:


~~~~ {.php name="code"}
define("APP_NAME", "MY APP");$email = "my.account@gmail.com";$password = "mypassword";$altEmail = "this_is_the_random_email_from_the_calendar_settings";$login = new GoogleClientLogin($email, $password, GoogleClientLogin::$CALENDAR_SERVICE, APP_NAME);$cal = new GoogleCalendar($login);$cal->altEmail = $altEmail;$entryData = $cal->addEvent(array(                "title"=> "Auto Test event",                "content"=> "This is a test event",                "where"=> "Test location",                "startTime"=> time()+60*60*24*1            ));print_r($entryData);
~~~~



  [Google Calendar API]: https://code.google.com/apis/calendar/data/2.0/developers_guide.html
  [Google Client Logins]: https://mark.biek.org/blog/2009/01/google-client-logins/
  [Google Data API]: https://code.google.com/apis/gdata/
  [AuthSub proxy authentication]: https://code.google.com/apis/calendar/data/2.0/developers_guide_protocol.html#AuthAuthSub
  [ClientLogin authentication]: https://code.google.com/apis/calendar/data/2.0/developers_guide_protocol.html#AuthClientLogin
  [image]: https://farm5.static.flickr.com/4097/4815721750_8bf4fcd62d_z.jpg
  [Adding an event]: https://code.google.com/apis/calendar/data/2.0/developers_guide_protocol.html#CreatingEvents
  [curl]: https://php.net/manual/en/book.curl.php
