Title: Basics of the PHP PCRE functions
Date: 2009-05-20 00:22
Author: mark
Category: Programming
Tags: pcre, php, regex
Slug: basics-of-the-php-pcre-functions

I'm only going to talk about the three I use the most but, there are a
number of useful [PCRE functions][] in PHP.

## [preg\_match][]


int **preg\_match** ( string *$pattern* , string *$subject* [, array
*&$matches* [, int *$flags* [, int *$offset* ]]] )

preg\_match returns 0 for no match or 1 if a match was found. It's
important to note that preg\_match stops searching after the first
match. Use [preg\_match\_all][] if you need all matches within a string.

You can get back any backreferences by passing an empty array as the
*$matches* argument.

Here's a simple example that we use to parse a string like 'variable =
value' into pieces:


~~~~ {.php name="code"}
$regex = '/^\s*(.*?)\s*=\s*(.*?)\s*$/';$subject = 'variable = value';$matches = array();if( preg_match($regex, $subject, $matches) ) {    echo '<pre>' . print_r($matches, true) . '</pre>';}
~~~~


which outputs this:


    Array(    [0] => variable = value    [1] => variable    [2] => value)



Another handy trick is to use extended regular expressions
(*/pattern/x*) which lets you space the pattern across multiple lines
and even include comments:


~~~~ {.php name="code"}
$regex = '/^          \s*(.*?)\s*  #Match group 1 contains the value on the left side of the =, excluding any whitespace          =          \s*(.*?)\s*  #Match group 2 contains the value on the right side.          $/x';
~~~~



## [preg\_replace][]


mixed **preg\_replace** ( mixed *$pattern* , mixed *$replacement* ,
mixed *$subject* [, int *$limit= -1* [, int *&$count* ]] )

Most of the time [str\_replace][] is sufficient (and faster!) but
preg\_replace has some great uses as well. In its most basic form, you
pass it a regular expression and a replacement value and it replaces all
matches.

Using the regex and subject in the previous example, let's see how we
can use preg\_replace to reverse the values on either side of the =. If
we start with 'variable = value', we want to end up with 'value =
variable'.


~~~~ {.php name="code"}
$regex = '/^\s*(.*?)\s*=\s*(.*?)\s*$/';$subject = 'variable = value';echo preg_replace($regex, '$2 = $1', $subject);
~~~~



Our regular expression creates two [backreferences][], one for each
value on either side of the = side. We can refer to these by number ($1
and $2) in the replacement string which makes it very easy to reverse
them.

## [preg\_split][]


array **preg\_split** ( string *$pattern* , string *$subject* [, int
*$limit= -1* [, int *$flags= 0* ]] )

Again [explode][] or [str\_split][] will be more efficient if you don't
actually need regular expressions to split your string.

Here's an example that splits a sentence into words using whitespace,
commas, or periods as the delimiter:


~~~~ {.php name="code"}
$subject = 'The quick, brown, fox.  jumped over, the lazy dog.';$data = preg_split( '/[\s,.]+/', $subject);echo '<pre>'' . print_r($data, true) . '</pre>';
~~~~


which outputs this


    Array(    [0] => The    [1] => quick    [2] => brown    [3] => fox    [4] => jumped    [5] => over    [6] => the    [7] => lazy    [8] => dog    [9] => )



If you're looking for tutorials and documentation on lots of different
flavors of regular expressions, I highly recommend
[Regular-Expressions.info][].

  [PCRE functions]: http://us.php.net/manual/en/ref.pcre.php
  [preg\_match]: http://us.php.net/manual/en/function.preg-match.php
  [preg\_match\_all]: http://us.php.net/manual/en/function.preg-match-all.php
  [preg\_replace]: http://us.php.net/manual/en/function.preg-replace.php
  [str\_replace]: http://us3.php.net/manual/en/function.str-replace.php
  [backreferences]: http://www.regular-expressions.info/brackets.html
  [preg\_split]: http://us.php.net/manual/en/function.preg-split.php
  [explode]: http://us.php.net/manual/en/function.explode.php
  [str\_split]: http://us.php.net/manual/en/function.str-split.php
  [Regular-Expressions.info]: http://www.regular-expressions.info/
