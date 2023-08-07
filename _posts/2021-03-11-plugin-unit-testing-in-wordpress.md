Title: Plugin Unit Testing in WordPress
Date: 2021-03-11 20:13
Author: mark
Category: programming
Tags: wordpress,testing,phpunit
Slug: plugin-unit-testing-in-wordpress

I'll admit that I have been pretty hit-and-miss with testing on projects over the course of my career. That said, I've been trying to be a little more consistent about it.

For Laravel projects, it's real easy since [PHPUnit](https://phpunit.de/) integration is built into Laravel [right out of the box](https://laravel.com/docs/8.x/testing).

I also do a fair amount of WordPress and being able to unit test plugins and other functionality would be very handy.

While the setup is a little confusing at first, WordPress also comes with great tools for testing.

The official [WordPress testing documentation](https://make.wordpress.org/cli/handbook/misc/plugin-unit-tests/) is good and the [wp cli](https://developer.wordpress.org/cli/commands/scaffold/plugin-tests/) can be used to build out most of the test scaffolding for you.

I also found these resources to be helpful

* [Introduction to Unit Testing in WordPress](https://neliosoftware.com/blog/introduction-to-unit-testing-in-wordpress-phpunit/)
* [Unit Testing WordPress Plugins with PHPUnit](https://wpmudev.com/blog/unit-testing-wordpress-plugins-phpunit/)
* [Testing WordPress Plugins with WP-CLI and PHPUnit](https://www.kirstencassidy.com/testing-wordpress-plugins-wp-cli-phpunit/)

But there's one thing I don't like about how WordPress handles testing.

They operate under the assumption that there will be a separate test database that gets completely wiped and reset each time the tests are run. While I understand the point behind, that approach doesn't work for a lot of my use-cases.

There are several projects with very large databases and it's easier and makes more sense for me to run the unit tests against my local development copy.

To that end, I've started a Github project: [https://github.com/markbiek/wordpress-dev](https://github.com/markbiek/wordpress-dev) which is a clone of [https://develop.svn.wordpress.org/trunk/](https://develop.svn.wordpress.org/trunk/).

The only difference is, my version doesn't delete any data when the tests are run. We've just removed the contents of the `_delete_all_data` and `_delete_all_posts` functions in [functions.php](https://develop.svn.wordpress.org/trunk/tests/phpunit/includes/functions.php).

If you can, I'd recommend sticking with the official WordPress way of testing. But hopefully this will be useful to some other people.
