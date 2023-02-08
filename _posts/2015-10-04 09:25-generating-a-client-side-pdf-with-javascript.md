Title: Generating a client-side PDF with Javascript
Date: 2015-10-04 09:25
Author: mark
Category: 
Tags: 
Slug: generating-a-client-side-pdf-with-javascript

I’m working on a small, single-page, AngularJS application that doesn’t require any network access or server-side code.

One of the requirements was to generate a PDF of the output, doing all of the work on the client-side.

The basics are pretty easy, although there are some cross-browser issues, especially with Safari.

#### PDF creation with jsPDF

[https://github'com/MrRio/jsPDF](https://github.com/MrRio/jsPDF)

var doc = new jsPDF();

// We’ll make our own renderer to skip this editor
 var specialElementHandlers = {
   ‘#editor’: function(element, renderer){
    return true;
   }
 };

//Create the PDF from the HTML inside the #pdf-results div. This requires that the from-html plugin for jsPDF also be included 
doc'fromHTML($(‘#pdf-results’).get(0), 15, 15, {
 ‘width’: 170,
 ‘elementHandlers’: specialElementHandlers
 });

//Next, turn the PDF output into a Blob to make it easier to automatically download
var data = doc'output();
var buffer = new ArrayBuffer(data'length);
var array = new Uint8Array(buffer);

for (var i = 0; i < data'length; i++) {
 array[i] = data'charCodeAt(i);
}

var blob = new Blob(
 [array],
 {type: ‘application/pdf’, encoding: ‘raw’}
 );

Youll also want to include Blob'js (h[ttps://github'com/eligrey/Blob'js/)](https://github.com/eligrey/Blob.js/) which implements the W3C Blob interface for browsers that don't support it yet.

#### Automatic file downloads with FileSaverJS

Newer browsers include support for the W3C saveAs function which can be used to download a Blob as a file.

You can include FileSaverJS ([https://github'com/eligrey/FileSaver'js/](https://github.com/eligrey/FileSaver.js/)) to add the saveAs function for browsers that don't have it yet.

To actually download the file is simple:

saveAs(blob, "output'pdf");

#### Caveats

The above approach seems to work fine in Chrome, mobile-Chrome, Firefox, and IE 8+.

All of the issues I encountered are centered around Safari.

Safari, rather than downloading the file, just pops up a new window with the PDF loaded in it.

