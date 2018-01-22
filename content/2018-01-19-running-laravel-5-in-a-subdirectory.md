Title: Running Laravel 5 in a Subdirectory
Date: 2018-01-19 22:55
Author: mark
Category: Development
Tags: laravel, php
Slug: running-laravel-5-in-a-subdirectory

Running Laravel 5 in a subdirectory (instead of a subdomain or top-level domain) is easy but there's one gotcha.

### Step 1: Apache Config
Make sure to alias your subdirectory to the public directory of your Laravel project.

Let's say my site is going to be at http://mydomain.com/laravel-site. My Apache config would look like this:

```
Alias /laravel-site /path/to/laravel/public
<Directory /path/to/laravel/public>
    AllowOverride All
    Require all granted
</Directory>
```

### Step 2: Laravel `.htaccess` file
This was that part I got stuck on. The `/` route was fine but all other routes threw an **Internal Server Error** (which turned out to be a redirect loop).

To fix this, add the following to your `public/.htaccess` file:

```
RewriteBase /laravel-site
```
