Title: Laravel PDOException - General error: 2031
Date: 2019-10-15 12:15
Author: mark
Category: programming
Tags: laravel,php,pdo,mysql
Slug: pdoexception-general-error-2031

The Laravel `DB` Facade has some nice helper functions for doing things like database inserts/updates etc.

The `insert` call looks something like this:
```
DB::insert('insert into users (id, name) values (?, ?)', [1, 'Dayle']);
```

You specify a list of fields, placeholders for values, then an array of the actual values.

Laravel passes this down to the PDO layer and it ultimately becomes a PDO prepared-statement so you don't have to worry about SQL injection errors.

Now let's say you have something like this
```
$record = [
    "id" => 1,
    "name" => "Dayle",
];

DB::insert('insert into users (id, name) values (?, ?)', $record);
```

This is going to throw a `PDOException`. More specifically, a **PDOException - General error: 2031**.

A 2031 error means that binding the values to the placeholders in the PDO prepared-statement failed.

In this case, it's because the function can't handle an array with values _and_ keys.

The fix is
```
DB::insert('insert into users (id, name) values (?, ?)', array_values($record));
```
