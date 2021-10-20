Title: Noticing an odd difference between different implementations of JSON.stringify
Date: 2013-07-15 11:34:00
Author: mark
Category: Programming
Tags: javascript,json
Slug: odd-diference-between-json-stringify-implementations

The other day, I ran into a very strange problem with JSON.stringify[^1].

Let's say I have a fairly nested JS object like this and I need to JSON-encode it:

    var foo = { 
        "totA": -1,
        "totB": -1,
        "totC": "13,052.00",
        "totHours": 154,
        "groups": [
            {"id": 1,
            "name": "Name A",
            "billingCodes": [
                {"bc": "25", "type": "hours", "hours": "5", "amount": "$25.00"}
            ]}
        ] 
    };

If I JSON-encode it using the native browser `JSON.stringify` (tested in Chrome, Firefox, IE9/10), I get back a JSON string that looks like this (which is what I expect):

[Native JSON.stringify JSFiddle example](http://jsfiddle.net/antelopelovefan/G62zj/3/)

    {
        "totA": -1,
        "totB": -1,
        "totC": "13,052.00",
        "totHours": 154,
        "groups": [
            {
                "id": 1,
                "name": "Name A",
                "billingCodes": [
                    {
                        "bc": "25",
                        "type": "hours",
                        "hours": "5",
                        "amount": "$25.00"
                    }
                ]
            }
        ]
    }
    
The weirdness comes in if I try to do the same thing on a page that's using either [PrototypeJS <= 1.6](http://prototypejs.org/).

In that case, `JSON.stringify` on the _same_ object gives me back the following JSON:

[ProtypeJS JSON.stringify JSFiddle example](http://jsfiddle.net/antelopelovefan/Ky3tv/1/)

    {
        "totA": -1,
        "totB": -1,
        "totC": "13,052.00",
        "totHours": 154,
        "groups": "[{\"id\": 1, \"name\": \"Name A\", \"billingCodes\": [{\"bc\": \"25\", \"type\": \"hours\", \"hours\": \"5\", \"amount\": \"$25.00\"}]}]"
    }
    
Obviously, the above is a problem because it doesn't JSON-decode to the same object that was originally passed to `JSON.stringify`.

After asking the fine people on [StackOverflow](http://stackoverflow.com) I found out several interesting things.

### The idea of `.toJSON()` methods
Both json2.js and native JSON.stringify calls check to see if the object being encoded already has a `.toJSON()` method and uses that method instead of encoding the object according to the [JSON spec](http://www.json.org/).

### This was an issue specific to PrototypeJS <= 1.6
There's a bug in one of the PrototypeJS `.toJSON()` functions that crops up with objects nested inside arrays. PrototypeJS 1.7 has since fixed this issue.

### The easiest workaround is just to whack the PrototypeJS `.toJSON()` functions[^2]

    if(window.Prototype) {
        delete Object.prototype.toJSON;
        delete Array.prototype.toJSON;
        delete Hash.prototype.toJSON;
        delete String.prototype.toJSON;
    }


[^1]: Taken from the following StackOverflow questions. [http://stackoverflow.com/questions/17618791/noticing-an-odd-difference-between-different-implementations-of-json-stringify](http://stackoverflow.com/questions/17618791/noticing-an-odd-difference-between-different-implementations-of-json-stringify) and [http://stackoverflow.com/questions/710586/json-stringify-bizarreness](http://stackoverflow.com/questions/710586/json-stringify-bizarreness)

[^2]: [http://stackoverflow.com/a/3148441/305](http://stackoverflow.com/a/3148441/305)
