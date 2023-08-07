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


This applies a callback function to every element of an array and
returns the resulting array.


```
array **array\_map** ( callback $callback , array $arr1 [, array $...  ] )
```


For example: Applying the [trim][] function to every element of an
array.


~~~~ {.php name="code"}
$a = array(' a ', '   b', '   c   ');$a = array_map('trim', $a);print_r($a);
~~~~



### [array\_flip][]


This exchanges all keys with their associated values.

```
 array **array\_flip** ( array $trans )
```



~~~~ {.php name="code"}
$a = array( 'foo' => 1, 'bar' => 2, 'baz' => 3);$b = array_flip($a);print_r($b);
~~~~



```
Array
(
	[1] =\> foo
	[2] =\> bar
	[3] =\> baz
)
```



### [usort][]


This sorts an array by value but uses a custom function for the
comparison which is handy if you have an array of objects and you want
to sort by some property within those objects. According to the PHP
docs, "The comparison function must return an integer less than, equal
to, or greater than zero if the first argument is considered to be
respectively less than, equal to, or greater than the second."

```
bool **usort** ( array &$array , callback $cmp\_function )
```

(To do the same thing by keys instead of values, use [uksort][])


~~~~ {.php name="code"}
function cmp_func($a, $b) {
	if( $a->val < $b->val ) {
		return -1;
	} elseif ( $a->val == $b->val ) {
		return 0;
	} elseif ( $a->val > $b->val ) {
		return 1;
	}
}

class Foo { 
	public $val;
	
	public function __construct($val) {
		$this->val = $val;
	}
}

$a = array();
$a[] = new Foo(3);
$a[] = new Foo(2);
$a[] = new Foo(1);
echo '' . print_r($a, true) . '';

usort($a, 'cmp\_func');
echo ' ' . print_r($a, true) . ' ';
~~~~

### [array\_slice][]


Extracts a section of an array.

```
array **array\_slice** ( array $array , int $offset [, int $length [, bool $preserve\_keys= false ]] )
```


~~~~ {.php name="code"}
$a = array( 'a', 'b', 'c', 'd');
$b = array_slice($a, 2);
echo '' . print_r($b,true) . ' ';
~~~~

```
> Array
> (
> [1] =\> c
> [2] =\> d
> )
```
### [array\_sum][]


This returns the sum of the values in an array.

```
number **array\_sum** ( array $array )
```


~~~~ {.php name="code"}
$a = array(1,2,3,4);
echo array_sum($a);
~~~~



### [list][]


Assign values from an array to individual variables.

```
void **list** ( mixed $varname [, mixed $... ] )
```


~~~~ {.php name="code"}
$a = array( 'a', 'b', 'c');
list($val1, $val2, $val3) = $a;
echo "$val1, $val2, $val3";

// a, b, c
~~~~

  [array functions]: https://us2.php.net/manual/en/book.array.php
  [array\_map]: https://is.php.net/manual/en/function.array-map.php
  [trim]: https://us3.php.net/manual/en/function.trim.php
  [array\_flip]: https://is.php.net/manual/en/function.array-flip.php
  [usort]: https://is.php.net/manual/en/function.usort.php
  [uksort]: https://is.php.net/manual/en/function.uksort.php
  [array\_slice]: https://is.php.net/manual/en/function.array-slice.php
  [array\_sum]: https://is.php.net/manual/en/function.array-sum.php
  [list]: https://is.php.net/manual/en/function.list.php
