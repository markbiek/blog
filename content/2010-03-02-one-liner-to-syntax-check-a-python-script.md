Title: One-liner to syntax check a Python script
Date: 2010-03-02 16:49
Author: mark
Category: Geek, Programming
Tags: python
Slug: one-liner-to-syntax-check-a-python-script

It's always bothered me that PHP has **php -l** to do a quick syntax
check of a file and there wasn't an equivalent in Python.

And then I came across this gem of a one-liner:


~~~~ {.python name="code"}
python -c "compile(open('myapp.py').read(), 'myapp.py', 'exec')"
~~~~



Just change *myapp.py* to the name of your script and off you go.

Here's a little Bash script that make it easier to use:


~~~~ {.bash name="code"}
#!/bin/bashif [ -f $1 ]then    python -c "compile(open('$1').read(), '$1', 'exec')"else    echo "The file $1 was not found."    exit 1fiexit 0
~~~~



