Title: Recreating Laravel Accessor attributes
Date: 2021-04-08 14:15
Author: mark
Category: Programming
Tags: laravel,php
Slug: recreating-laravel-accessor-attributes

[Laravel](https://laravel.com) models have a great feature called [Accessors](https://laravel.com/docs/8.x/eloquent-mutators#defining-an-accessor).

The basic idea is that you define a class method like this
```
public function getFullNameAttribute() {
	return "{$this->first_name} {$this->last_name}";
}
```

Then doing something like `$myClass->full_name` actually executes the `getFullNameAttribute` function.

Obviously Laravel's model class is much more full-featured and can do a lot more.

That said, it's pretty easy to mimic Laravel's Accessor functionality.

The first piece is a simple `Str` class which turns [snake-case](https://en.wikipedia.org/wiki/Snake_case) names into [camel-case](https://en.wikipedia.org/wiki/Camel_case) names. In a real Laravel application, you're better off using the [Laravel Helpers](https://laravel.com/docs/8.x/helpers).
<script src="https://gist.github.com/markbiek/5eebdd2318e78324d6432a1d54937ad2.js"></script>

Then we're going to implement a simple `Model` class
<script src="https://gist.github.com/markbiek/e28eba7aa861e3355e5054ffd88f1f24.js"></script>

Now we can create a simple `Person` class which extends our `Model`
<script src="https://gist.github.com/markbiek/9ad7c45d047367855b0af38c9e47f028.js"></script>

In this case, we have two public properties for first & last name and then we've defined a `full_name` accessor.

To tie it all together, we can use our new class like this
<script src="https://gist.github.com/markbiek/c56e11304cc6b7bdd4361faec7cf1c6c.js"></script>

The above script will output
```
First name: Mark
Last name: Biek
Full name: Mark Biek
```
