Title: SQL Management Studio 2008 says Saving changes is not permitted.
Date: 2010-06-21 10:34
Author: mark
Category: Geek, Programming
Tags: sql-server
Slug: sql-management-studio-2008-says-saving-changes-is-not-permitted

Does SQL Server Management Studio 2008 constantly tell you your table
changes can’t be saved?

***“Saving changes is not permitted. The changes that you have made
require the following tables to be dropped and re-created. You have
either made changes to a table that can't be re-created or enabled the
option Prevent saving changes that require the table to be
re-created.”***

Good news! You can turn that shit OFF.

Go to “Tools:Options”, click on “Designers”, click on “Table and
Database Designers”, UNCHECK “Prevent saving changes that require table
re-creation”

![image][]

  [image]: https://farm2.static.flickr.com/1363/4721404562_2b9bb78f6f.jpg
