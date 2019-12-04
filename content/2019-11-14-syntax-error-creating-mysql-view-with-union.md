Title: Syntax error creating MySQL view with UNION
Date: 2019-11-14 14:44
Author: mark
Category: programming,mysql,sql
Tags: 
Slug: syntax-error-creating-mysql-view-with-union

Normally, when you create a MySQL view, it looks something like this:
```
CREATE VIEW foo AS (
  select * from bar
)
```

However, there's a bug in MySQL where you get syntax errors when declaring a view containing `UNION` or `UNION ALL` like this:
```
CREATE VIEW foo AS (
    select count(*) from foo
    union all
    select count(*) from bar
)
```

Congrats, you've run into [MySQL #21614](https://bugs.mysql.com/bug.php?id=21614) which was opened in 2006!

The fix is removing the `(` around the view query, like so:
```
CREATE VIEW foo AS
    select count(*) from foo
    union all
    select count(*) from bar
```
