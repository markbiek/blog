Title: Converting a Unix timestamp to a real Postgres date
Date: 2011-01-10 07:30
Author: mark
Category: Geek, Programming
Tags: date, postgres, sql
Slug: converting-a-unix-timestamp-to-a-real-postgres-date

Let’s say you have a Postgres database with a table that looks like
this:

<table cellspacing="0" cellpadding="0" border="0">


<tr>


<th>
thing\_id
</th>
<th>
unix\_date
</th>


</tr>


<tr>
<td>
1
</td>
<td>
1253764800
</td>
</tr>


<tr>
<td>
2
</td>
<td>
1253804507
</td>
</tr>


<tr>
<td>
3
</td>
<td>
1253764810
</td>
</tr>


<tr>
<td>
4
</td>
<td>
1253764801
</td>
</tr>


</table>


See how **unix\_date** field is a [Unix timestamp][]?

Well what if we want to deal with it as an actual [Postgres date
type][]?

Turns out it’s pretty easy with the following SQL:


~~~~ {.sql name="code"}
SELECT*, TIMESTAMP 'epoch' + unix_date * INTERVAL '1 second' as real_dateFROM mytable
~~~~



  [Unix timestamp]: https://en.wikipedia.org/wiki/Unix_time
  [Postgres date type]: https://www.postgresql.org/docs/8.1/static/datatype-datetime.html
