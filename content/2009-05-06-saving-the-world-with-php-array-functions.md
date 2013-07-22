Title: Saving the world with PHP array functions
Date: 2009-05-06 15:27
Author: mark
Category: Programming
Tags: arrays, php
Slug: saving-the-world-with-php-array-functions

I'm not to going to cover all of the PHP [array functions][] but I
thought I'd go over a few. I see a lot of code examples online that
could be easily be shortened by taking advantage of these functions.

So here are a few interesting ones that might save you some work down
the road.

### [array\_map][]

</p>
This applies a callback function to every element of an array and
returns the resulting array.

<p>
> array **array\_map** ( callback $callback , array $arr1 [, array $...
> ] )

</p>

For example: Applying the [trim][] function to every element of an
array.

<p>
~~~~ {.php name="code"}
$a = array(' a ', '   b', '   c   ');$a = array_map('trim', $a);print_r($a);
~~~~

</p>

### [array\_flip][]

</p>
This exchanges all keys with their associated values.

<p>
> array **array\_flip** ( array $trans )

</p>

<p>
~~~~ {.php name="code"}
$a = array( 'foo' => 1, 'bar' => 2, 'baz' => 3);$b = array_flip($a);print_r($b);
~~~~

</p>
<p>
> </p>
>
> Array
>
> (
>
> [1] =\> foo
>
> [2] =\> bar
>
> [3] =\> baz
>
> )
>
> <p>

</p>

### [usort][]

</p>
This sorts an array by value but uses a custom function for the
comparison which is handy if you have an array of objects and you want
to sort by some property within those objects. According to the PHP
docs, "The comparison function must return an integer less than, equal
to, or greater than zero if the first argument is considered to be
respectively less than, equal to, or greater than the second."

<p>
> bool **usort** ( array &$array , callback $cmp\_function )

</p>
(To do the same thing by keys instead of values, use [uksort][])

<p>
~~~~ {.php name="code"}
function cmp_func($a, $b) {    if( $a->val < $b->val ) {        return -1;    }elseif( $a->val == $b->val ) {        return 0;    }elseif( $a->val > $b->val ) {        return 1;    }}class Foo {    public $val;    public function __construct($val) {        $this->val = $val;    }}$a = array();$a[] = new Foo(3);$a[] = new Foo(2);$a[] = new Foo(1);echo '' . print_r($a, true) . '
~~~~

';
</p>

usort($a, 'cmp\_func');

<p>
echo '
    ' . print_r($a, true) . '

';
</p>
<p>
</pre>
</p>

### [array\_slice][]

</p>
Extracts a section of an array.

<p>
> array **array\_slice** ( array $array , int $offset [, int $length [,
> bool $preserve\_keys= false ]] )

</p>
<p>
~~~~ {.php name="code"}
$a = array( 'a', 'b', 'c', 'd');$b = array_slice($a, 2);echo '' . print_r($b,true) . '
~~~~

';
</p>
<p>
</pre>
</p>
<p>
> </p>
>
> Array
>
> (
>
> [1] =\> c
>
> [2] =\> d
>
> )
>
> <p>

</p>

### [array\_sum][]

</p>
This returns the sum of the values in an array.

<p>
> number **array\_sum** ( array $array )

</p>
<p>
~~~~ {.php name="code"}
$a = array(1,2,3,4);echo array_sum($a);
~~~~

</p>

### [list][]

</p>
Assign values from an array to individual variables.

<p>
> void **list** ( mixed $varname [, mixed $... ] )

</p>
<p>
~~~~ {.php name="code"}
$a = array( 'a', 'b', 'c');list($val1, $val2, $val3) = $a;echo "$val1, $val2, $val3";
~~~~

</p>
<p>
> </p>
> a, b, c
>
> <p>

</p>

  [array functions]: http://us2.php.net/manual/en/book.array.php
  [array\_map]: http://is.php.net/manual/en/function.array-map.php
  [trim]: http://us3.php.net/manual/en/function.trim.php
  [array\_flip]: http://is.php.net/manual/en/function.array-flip.php
  [usort]: http://is.php.net/manual/en/function.usort.php
  [uksort]: http://is.php.net/manual/en/function.uksort.php
  [array\_slice]: http://is.php.net/manual/en/function.array-slice.php
  [array\_sum]: http://is.php.net/manual/en/function.array-sum.php
  [list]: http://is.php.net/manual/en/function.list.php
