Title: Basic Authentication with Titanium.Network.HTTPClient
Date: 2010-07-14 09:37
Author: mark
Category: Geek, Programming
Tags: appcelerator, httpclient, javascript, titanium
Slug: basic-authentication-with-titanium-network-httpclient

I've been trying, over the last couple of days, to figure out how to do
an HTTP request with [Basic Authentication][] using [Appcelerator
Titanium][].

It seemed like it should be pretty easy. Just create an [HTTPClient][]
object, pass it the username and password via [setBasicCredentials()][],
and off you go.

But it didn't work. I got **401 - Unauthorized** on every single site I
tried.

Finally, after way too much research, I discovered that
**setBasicCredentials** just doesn't work and you have to do Basic
Authentication by setting the headers yourself like this:


~~~~ {.javascript name="code"}
authstr = 'Basic ' +Titanium.Utils.base64encode(username+':'+password); xhr.setRequestHeader('Authorization', authstr);
~~~~



It's important to note that **setRequestHeader()** has to be called
*after* you've called **open()** but *before* you call **send()**

And here's a complete function for making HTTP requests.


~~~~ {.javascript name="code"}
var httpRequest = function(params) {    var xhr = Titanium.Network.createHTTPClient();    xhr.onload = function() {        if(params.hasOwnProperty('callback')) {            if(typeof params.callback == 'function') {                params.callback(this.responseText);            }else {                Ti.API.error('getXML:  Invalid callback function');            }        }    };    xhr.onerror = function() {        Ti.API.error(this.status + ' - ' + this.statusText);    };    xhr.open( params.hasOwnProperty('method') ? params.method : 'GET', params.url);    try {         if(params.hasOwnProperty('username') && params.hasOwnProperty('password')) {            authstr = 'Basic ' +Titanium.Utils.base64encode(params.username+':'+params.password);             xhr.setRequestHeader('Authorization', authstr);        }    }catch(e) {        Ti.API.error('Error in getXML:  ' + e.message);    }    xhr.send();};//Call it like thishttpRequest( {        url:  'https://api.del.icio.us/v1/tags/get',        username: 'username',        password:  'password',        callback:  function(resp) {            //TODO        }    });
~~~~



  [Basic Authentication]: http://en.wikipedia.org/wiki/Basic_access_authentication
  [Appcelerator Titanium]: http://www.appcelerator.com/
  [HTTPClient]: http://developer.appcelerator.com/apidoc/desktop/latest/Titanium.Network.HTTPClient-object.html
  [setBasicCredentials()]: http://developer.appcelerator.com/apidoc/desktop/latest/Titanium.Network.HTTPClient.setBasicCredentials-method.html
