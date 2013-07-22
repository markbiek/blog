Title: Copying ADODB Recordsets Across Databases
Date: 2010-05-25 06:30
Author: mark
Category: Geek, Programming
Tags: adodb, asp, vbscript, xml
Slug: copying-adodb-recordsets-across-databases

I currently help maintain a Classic ASP (VBscript) website. The setup is
pretty standard in that we have separate development and production
servers. However, while I have complete **programmatic** access to the
production database, I don't have any sort of administrative/management
console access.

This means that the dev & production data tends to drift over time and
there isn't a good way to sync them up. For a long time, I've been
trying to come up with a way where I can slurp all of the data out of
the production database and overwrite the dev database. I certainly
could've coded something up manually but there are quite a few tables
and I didn't want to have to change my export code everytime the
database scheme changed.

I was aware that it was trivial to convert an ADODB Recordset into XML
and I was finally able to figure out how to load that XML back into a
Recordset, then pipe it to a different database or table (provided the
new destination has the same structure).

#### Dumping a Recordset to XML

</p>
This is dead simple

<p>
~~~~ {.vb name="code"}
    dim objXML: Set objXML = Server.CreateObject("MSXML2.DOMDocument")    dim res, sql    sql = "SELECT * FROM mytable"    set res = ExecuteReader(sql) 'This function opens a connection and returns an ADODB.Recordset    With res                           Call .Save(objXML, 1)       Call .Close()    End With                                                                                Set res = nothing    response.contenttype = "text/xml"    response.write objXMl.xml
~~~~

</p>

First we create a **MSXML2.DOMDocument** object. Then We do a normal
database query to get a Recordset. Last, we pass the XML object to the
**Save()** method of the Recordset. In the example above, we go ahead
and print out the raw XML (which includes a Schema that matches the
definition of the database table).

The next step is to load that XML back into a recordset, then save the
data to a different table and/or database. **Remember, the structure of
the source and destination tables must be EXACTLY the same for this to
work.**

We'll do that with the following steps:

1.  Open a Recordset to our destination table (without actually doing a
    query). The query isn't necessary since we're going to dynamically
    add all of the fields and rows to the destination Recordset.
2.  Do some basic validation like "do source and destination tables have
    the same number of columns" and "do both tables have columns with
    the same names". To be extra thorough, you could also check to
    verify that fields types are the same but I'm not going to do that
    in this example.
3.  Add all of the fields from the source Recordset (the one loaded from
    the XML) to the destination Recordset.
4.  Add each row of data to the destination Recordset. Note that we need
    to do an [IDENTITY INSERT][] to make sure the ids stay consistent.

</p>

This is, obviously, going to be slow for large datasets. In that case, I
think the best way to sync things up is to get a database dump/backup
from production and restore it on dev.

<p>
~~~~ {.vb name="code"}
outConn.open testConnStr'This is an empty recordset that points to the destination database and tableoutRes.activeconnection = outConnoutRes.cursortype = adOpenDynamicoutRes.locktype = adLockOptimisticoutRes.source = "mytable"outRes.open'This is the source XML fileres.open server.mappath("output.xml")if res.fields.count <> outRes.fields.count then    response.write "Skipping updates because the number of fields didn't match."else    for i=0 to outRes.fields.count-1        if outRes.fields(i).name <> res.fields(i).name then            response.write "Field mismatch:  Expecting [" & outRes.fields(i).name & "] but found [" & res.fields(i).name & "]"        end if    next    while not res.eof        outConn.execute "SET IDENTITY_INSERT dbo.mytable ON"        outRes.addnew        for i=0 to outRes.fields.count-1            sfield = outRes.fields(i).name            sval = res(sfield)            outRes(sfield).value = sval        next        If outConn.Errors.Count > 0 Then            For Each Err In outConn.Errors                Response.Write("Error " & Err.SQLState & ": " & _                    Err.Description & " | " & Err.NativeError & "")            Next            outConn.Errors.Clear            outRes.CancelUpdate        End If        outRes.movefirst        res.movenext        numRows = numRows + 1        outRes.update        outConn.execute "SET IDENTITY_INSERT dbo.mytable OFF"    wendend ifres.close
~~~~

</p>

  [IDENTITY INSERT]: http://msdn.microsoft.com/en-us/library/aa259221(v=SQL.80).aspx
