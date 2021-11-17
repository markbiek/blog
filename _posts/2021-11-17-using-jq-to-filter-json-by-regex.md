Title: Using jq to filter JSON by regex
Date: 2021-11-17 11:04
Author: mark
Category: Programming
Tags: json, tools
Slug: using-jq-to-filter-json-by-regex

If you're not already familiar with using [jq](https://stedolan.github.io/jq/) to manipulate JSON on the command-line, go download it immediately. While it can be a little tricky to learn at first, it'll make your life so much easier.

For example, I recently learned how to filter a JSON result set using a regex to match the value of a particular object property.

Let's say I have a JSON payload that looks like this:

```
{
	"total": 4,
	"domains": [
		{
			"id": 100,
			"account": 999,
			"name": "alice.com",
			"created": "2021-01-01 00:00:00"
		},
		{
			"id": 101,
			"account": 999,
			"name": "bob.com",
			"created": "2021-01-01 00:00:00"
		},
		{
			"id": 102,
			"account": 999,
			"name": "charlie.com",
			"created": "2021-01-01 00:00:00"
		},
		{
			"id": 103,
			"account": 999,
			"name": "eve.com",
			"created": "2021-01-01 00:00:00"
		}
	]
}
```

It's super easy to get all of the domain objects using the jq filter `.domains[]` and it's also trivial to get at only specific fields of each domain object (eg `.domains[] | {id,name}`).

Now let's say we want to only get the domain object where the name is "charlie.com".

That's where the [select()](<https://stedolan.github.io/jq/manual/#select(boolean_expression)>) and [test()](<https://stedolan.github.io/jq/manual/#test(val),test(regex;flags)>) functions come in.

We can use the following filter to accomplish 👆️:

`.domains[] | {id,name} | select(.name | test("charlie"))`

`select` takes a boolean expression and, if that expression is true, returns that particular item. Everything else is filtered out.

The `test` function takes a regex (or simple string to match). In our particular case, `test` is checking against the `name` property of each object.

Now let's saw only want the `id` _value_ of the object that matches our test.

We simply change our filter to the below:

`.domains[] | {id,name} | select(.name | test("charlie")) | .id`
