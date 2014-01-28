Title: Auto-incrementing build numbers in Visual Studio 2012
Date: 2014-01-28 14:08
Author: mark
Category: Geek
Tags: vs-2012,c#
Slug: autoincrementing-build-numbers-in-visual-studio-2012

I've been using [ProjectBuildCounter](http://build.codeplex.com/) for doing auto-incrementing build numbers in Visual Studio.

It's pretty easy to use right out of the box and it has lots of [configuration options](https://www.youtube.com/watch?v=macLx-i6syA).

Basically, you just add a Pre-build or Post-build[^1] event that calls the ProjectBuildCounter.exe on the command-line and give it your project's `AssemblyInfo.cs` as an argument

    c:\bin\ProjectBuildCounter.exe "$(ProjectDir)Properties\AssemblyInfo.cs"

The only issue I had was it would increment the build number every time I did a *Debug* build when I'd really only like it to increment the build number when I do a *Release* build.


Turns out, that's pretty easy to.

Visual Studio build events have lots of different substitution macros (like `$(ProjectDir)`) and even some basic conditional logic.

So, to have the build number increment only when building from the *Release* configuration, you just have this:

    if $(ConfigurationName) == Release (
      c:\bin\ProjectBuildCounter.exe "$(ProjectDir)Properties\AssemblyInfo.cs"
    )

[^1]: Build events can be accessed by clicking on the _PROJECT_ menu, then clicking _Project Properties_, then clicking _Build Events_ 
