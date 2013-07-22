Title: Picasa data API fun: Creating albums and uploading images
Date: 2012-04-02 07:00
Author: mark
Category: Programming
Tags: curl, googleapi, php, picasa
Slug: picasa-data-api-fun-creating-albums-and-uploading-images

Today, we’re going to have some fun with the [Picasa Data API][] by
learning how to create Picasa albums and upload photos to them.

We’re going to do everything with vanilla-PHP and cURL but it’s worth
mentioning that the [Zend Framework][] has a set of classes for doing
all of this stuff and more.

While it does look like Google is moving in the direction of using
[oAuth][] for authentication, they still support username/password
client logins which are, frankly, a *ton* easier to deal with.

I’ve written about [Google client logins][] before and the code I
mentioned previously will still work with the Picasa Data API.
Basically, we provide a username and password to Google. They respond
with an Auth token which we then pass as an HTTP header to all future
requests to the API.

Like pretty much all Google Data APIs, doing things with Picasa mostly
involves sending XML packets via HTTP POST. It’s just a matter of
crafting the appropriate XML for what you’re trying to do.

## Creating a Picasa Album

</p>
Here’s a simple example which creates an album called “Test album from
PHP". The below code assume we’re already authenticated and have a valid
Auth token. You’ll also notice that we need to have the userId of the
Picasa user we’re authenticated as.

<p>
~~~~ {.php name="code"}
    $authHeader = 'Authorization:  GoogleLogin auth="' . $authToken . '"';    $feedUrl = "https://picasaweb.google.com/data/feed/api/user/$userId";        $rawXml = "<entry xmlns='http://www.w3.org/2005/Atom'                    xmlns:media='http://search.yahoo.com/mrss/'                    xmlns:gphoto='http://schemas.google.com/photos/2007'>                  <title type='text'>Test album from PHP</title>                  <summary type='text'>This is a test album</summary>                  <gphoto:location>Louisville</gphoto:location>                  <gphoto:access>public</gphoto:access>                  <gphoto:timestamp>1152255600000</gphoto:timestamp>                  <category scheme='http://schemas.google.com/g/2005#kind'                    term='http://schemas.google.com/photos/2007#album'></category>                </entry>";        curl_setopt($ch, CURLOPT_URL, $feedUrl);      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);          $data = array($xml);        $options = array(                CURLOPT_SSL_VERIFYPEER=> false,                CURLOPT_POST=> true,                CURLOPT_RETURNTRANSFER=> true,                CURLOPT_HEADER=> true,                CURLOPT_FOLLOWLOCATION=> true,                CURLOPT_POSTFIELDS=> $rawXml,                CURLOPT_HTTPHEADER=> array('GData-Version:  2', $authHeader, 'Content-Type:  application/atom+xml')            );    curl_setopt_array($ch, $options);        $ret = curl_exec($ch);    curl_close($ch);
~~~~

</p>

## Uploading an image *without* metadata

</p>
Here’s an example that uploads an image to the album we created
previously. You’ll notice that we also have to specify an albumId in
addition to the userId. You can get album id by retrieving the list of
albums for a particular user or at the time when you create a new album.
Creating a new album returns an XML response with all kinds of detailed
information about the album.

In this case, we don’t need any XML, just the URL to the album we want
to load to.

Then it’s just a matter of getting the binary data of the image and
sending it via POST to the album URL.

**NOTE: Don’t try to Base64-encode the image data. Just POST it as-is.
Attempting to encode the image data will give you *Bad Request: Not an
image* errors.**

<p>
~~~~ {.php name="code"}
    $albumUrl = "https://picasaweb.google.com/data/feed/api/user/$userId/albumid/$albumId";    $imgName = $_SERVER['DOCUMENT_ROOT'] . '/picasa/cute_baby_kitten.jpg';        //Do a binary-read of the image file we want to upload.    $fileSize = filesize($imgName);    $fh = fopen($imgName, 'rb');    $imgData = fread($fh, $fileSize);    fclose($fh);        //The Slug header is optional and is used to specify the name of the image in the album    $header = array('GData-Version:  2', $authHeader, 'Content-Type: image/jpeg', 'Content-Length: ' . $fileSize, 'Slug: cute_baby_kitten.jpg');    $data = $imgData;        $ret = "";    $ch  = curl_init($albumUrl);    $options = array(            CURLOPT_SSL_VERIFYPEER=> false,            CURLOPT_POST=> true,            CURLOPT_RETURNTRANSFER=> true,            CURLOPT_HEADER=> true,            CURLOPT_FOLLOWLOCATION=> true,            CURLOPT_POSTFIELDS=> $data,            CURLOPT_HTTPHEADER=> $header        );    curl_setopt_array($ch, $options);    $ret = curl_exec($ch);    curl_close($ch);
~~~~

</p>

## Uploading an image *including* metadata

</p>
This is a little tricker.

The documentation shows an example request as looking like this

<p>
~~~~ {.php name="code"}
Content-Type: multipart/related; boundary="END_OF_PART"Content-Length: 423478347MIME-version: 1.0Media multipart posting--END_OF_PARTContent-Type: application/atom+xml  plz-to-love-realcat.jpg  Real cat wants attention too.      term="http://schemas.google.com/photos/2007#photo"/>--END_OF_PARTContent-Type: image/jpeg...binary image data...--END_OF_PART--
~~~~

</p>

Unfortunately, they don’t give any clear examples about how to actually
craft this kind of POST request.

Here’s the basics. This bit?

<p>
~~~~ {.php name="code"}
Content-Type: multipart/related; boundary="END_OF_PART"Content-Length: 423478347MIME-version: 1.0
~~~~

</p>
That’s your HTTP header. The string **END\_OF\_PART** is just how you
tell the server when one content section has ended and the next section
starts. It just needs to be a unique string.

The **Content-Length** is also tricky. I just assumed that it was
calculated by adding the length of the metadata XML and the image file
size. I spent a fair amount of time banging my on that until I found
this snippet from the [YouTube Data API][].

Here’s the key takeaway:

<p>
> </p>
> To calculate the proper Content-Length, you need to count the full
> string length of the POST request. However, in addition to the XML
> component and the file binary, a direct upload request also defines a
> boundary string that separates the different parts of the request.
> ***So the calculation of the Content-Length needs to account for the
> size of the XML and file binary as well as of the inserted boundary
> strings and newlines.***
>
> <p>

</p>

Here’s a code example of uploading an image including metadata.

<p>
~~~~ {.php name="code"}
    $albumUrl = "https://picasaweb.google.com/data/feed/api/user/$userId/albumid/$albumId";    $imgName = $_SERVER['DOCUMENT_ROOT'] . '/picasa/cute_baby_kitten.jpg';        $rawImgXml = '                  plz-to-love-realcat.jpg                  Real cat wants attention too.                                      term="http://schemas.google.com/photos/2007#photo"/>                ';            $fileSize = filesize($imgName);    $fh = fopen($imgName, 'rb');    $imgData = fread($fh, $fileSize);    fclose($fh);        $dataLength = strlen($rawImgXml) + $fileSize;    $data = "";    $data .= "\nMedia multipart posting\n";    $data .= "--P4CpLdIHZpYqNn7\n";    $data .= "Content-Type: application/atom+xml\n\n";    $data .= $rawImgXml . "\n";    $data .= "--P4CpLdIHZpYqNn7\n";    $data .= "Content-Type: image/jpeg\n\n";    $data .= $imgData . "\n";    $data .= "--P4CpLdIHZpYqNn7--";        $header = array('GData-Version:  2', $authHeader, 'Content-Type: multipart/related; boundary=P4CpLdIHZpYqNn7;', 'Content-Length: ' . strlen($data), 'MIME-version: 1.0');        $ret = "";    $ch  = curl_init($albumUrl);    $options = array(            CURLOPT_SSL_VERIFYPEER=> false,            CURLOPT_POST=> true,            CURLOPT_RETURNTRANSFER=> true,            CURLOPT_HEADER=> true,            CURLOPT_FOLLOWLOCATION=> true,            CURLOPT_POSTFIELDS=> $data,            CURLOPT_HTTPHEADER=> $header        );    curl_setopt_array($ch, $options);    $ret = curl_exec($ch);    curl_close($ch);
~~~~

</p>

The request headers look like this:

<p>
~~~~ {.php name="code"}
Array(    [0] => GData-Version:  2    [1] => Authorization:  GoogleLogin auth="THISISAVALIDAUTHCODE"    [2] => Content-Type: multipart/related;boundary=P4CpLdIHZpYqNn7    [3] => Content-Length: 179951    [4] => MIME-version: 1.0)
~~~~

</p>

And the actual request body ends up looking like this:

<p>
~~~~ {.php name="code"}
Media multipart posting--P4CpLdIHZpYqNn7Content-Type: application/atom+xml              plz-to-love-realcat.jpg              Real cat wants attention too.                              term="http://schemas.google.com/photos/2007#photo"/>            --P4CpLdIHZpYqNn7Content-Type: image/jpegIMAGE DATA GOES HERE--P4CpLdIHZpYqNn7--
~~~~

</p>

Then, if all goes well, you’ll end up with something like this:

![image][]

There are [lots of neat things][] you can do with the Picasa data API.

Hopefully the above will be enough to get you rolling with them.

  [Picasa Data API]: http://code.google.com/apis/picasaweb/overview.html
  [Zend Framework]: http://framework.zend.com/manual/en/zend.gdata.photos.html
  [oAuth]: http://oauth.net/
  [Google client logins]: http://mark.biek.org/blog/2009/01/google-client-logins/
  [YouTube Data API]: https://developers.google.com/youtube/2.0/developers_guide_protocol_testing
  [image]: http://i.imgur.com/2UgaW.png
  [lots of neat things]: http://code.google.com/apis/picasaweb/docs/2.0/developers_guide_protocol.html
