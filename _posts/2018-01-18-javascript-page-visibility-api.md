Title: Javascript Page Visibility API
Date: 2018-01-18 19:34
Author: mark
Category: Development
Tags: til,javascript
Slug: javascript-page-visibility-api

One of our designers showed us a fun little page that changed the title bar to different messages depending on if tab showing the page was visible or not.

I was curious how it was done and it turns out to be super simple.

### The ugly, old-fashioned way
The `document` object has a method called `hasFocus()` that tells you if that browser tab is visible or not.

My first attempt called `hasFocus()` on a timer and set the page title appropriately. This worked but there was a little delay when switching back and forth.

```
setInterval(() => {
    if (document.hasFocus()) {
        document.title = 'Page is visible!';
    } else {
        document.title = 'Page is hidden :(';
    }
}, 200);
```

### The correct way
Turns out all modern browsers have a Javascript API for [Page Visibility](https://caniuse.com/#feat=pagevisibility) that lets you respond to page visibility changes in real time.

This is great because your page will instantly receive notifications as it's hidden or unhidden.

```
let  hidden;
let visibilityChange;

if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

document.addEventListener(visibilityChange, () => {
    if (document[hidden]) {
        document.title = 'Wait. Come back!';
    } else {
        document.title = 'Thanks for visiting this page!';
    }
}, false);
```

My co-worker helpfully pointed out that, in addition to Page Visibility, there are a vast number of other [browser APIs](https://developer.mozilla.org/en-US/docs/Web/API) available. Time to do some reading!
