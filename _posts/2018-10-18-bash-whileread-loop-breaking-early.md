Title: Bash while-read loop breaking early
Date: 2018-10-18 15:13
Author: mark
Category: Geek
Tags: bash,linux
Slug: bash-whileread-loop-breaking-early

I've been working on a script which loops over a list of sites and runs a java program on each site name.

The basic script looked like this:

```
cat /list/of/sites | while read s
do
    java -jar thing.jar $s
done
```

The problem was the while loop would break after the first execution.

After some digging, I found [this Stackoverflow post](https://stackoverflow.com/a/35208546/305) which talked about how some commands hijack STDIN which messes up a while-read loop like the above. In that specific case, they were using ssh so and `ssh -n` took care of it.

In my case, we needed to rewrite the while loop like this:

```
while read s
do
    echo "" | java -jar thing.jar $s
done < /list/of/sites
```

The combination of reading the file at the end of the loop and the empty `echo` takes care of it.
