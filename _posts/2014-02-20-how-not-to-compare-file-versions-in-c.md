Title: How _not_ to compare file versions in C#
Date: 2014-02-20 21:46
Author: mark
Category: Geek
Tags: c#
Slug: how-not-to-compare-file-versions-in-c-sharp

I recently came across the following C# code in a project I inherited. It checks the version of the running executable against a file on the network to see if it needs an update.

    FileVersionInfo thisVersion = FileVersionInfo.GetVersionInfo(System.Windows.Forms.Application.ExecutablePath);
    FileVersionInfo networkVersion = FileVersionInfo.GetVersionInfo(NetworkFileLocation + "\\ProTouch Monitoring Tool.exe");

    
    v1 = int.Parse((thisVersion.FileVersion).Replace(".", ""));
    v2 = int.Parse((networkVersion.FileVersion).Replace(".", ""));
    
    if (v2 > v1)
    {
        //Update available
    }

    Version vThis = new Version(thisVersion.FileVersion);
    Version vNetwork = new Version(networkVersion.FileVersion);
    
    Console.WriteLine(vThis.CompareTo(vNetwork));
    
    return vThis.CompareTo(vNetwork) < 0;

Here's what this does:

1. Get the file version number of the files being compared as strings.
2. Remove the decimal points from the version string.
3. Convert the string into a integer.
4. Check to see if one integer is bigger than the other.

So let's say your version numbers are 1.3.5.42 and 1.3.5.45.

You end up comparing the integers 13542 and 13545. 13545 is obviously bigger so we have an update available.

But what happens when the latest version is 1.4.0.1?

We end up comparing 13542 and 1401. 1401 is obviously much smaller than 13542 so the code thinks we don't have an update available.

So what's the correct way to do it?

    FileVersionInfo thisVersion = FileVersionInfo.GetVersionInfo(System.Windows.Forms.Application.ExecutablePath);
    FileVersionInfo networkVersion = FileVersionInfo.GetVersionInfo(NetworkFileLocation + "\\ProTouch Monitoring Tool.exe");
    
    Version vThis = new Version(thisVersion.FileVersion);
    Version vNetwork = new Version(networkVersion.FileVersion);
    
    return vThis.CompareTo(vNetwork) < 0;

1. Get the file version numbers.
2. Create [Version class objects](https://msdn.microsoft.com/en-us/library/System.Version(v=vs.110).aspx) for each file.
3. Use [Version.CompareTo](https://msdn.microsoft.com/en-us/library/a5ts8tb6(v=vs.110).aspx) method to do the work for us.
