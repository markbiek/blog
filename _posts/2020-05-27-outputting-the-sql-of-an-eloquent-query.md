Title: Outputting the SQL of an Eloquent query
Date: 2020-05-27 20:32
Author: mark
Category: Geek
Tags: laravel,php,sql
Slug: outputting-the-sql-of-an-eloquent-query

Let's say you have a Laravel Eloquent query like this:
```
$things = Thing::where(DB::raw('LOWER(name)'), 'LIKE', 'foo')->get();
```

And then let's say you want to see the actual SQL that's being generated behind the scenes.

Laravel's Query Log to the rescue!

```
DB::enableQueryLog();
$things = Thing::where(DB::raw('LOWER(name)'), 'LIKE', 'foo')->get();
Log::debug(DB::getQueryLog());
```
