#!/usr/bin/python

import re
import os.path
import sys
from time import gmtime, strftime

if __name__ == "__main__":
    date = strftime("%Y-%m-%d %H:%M", gmtime())
    safe_date = strftime("%Y-%m-%d", gmtime())
    author = "mark"
    cat = "Geek"
    tags = []
    slug = ""

    raw_title = raw_input("Title: ")
    slug = re.sub(r'[^ 0-9a-z]', '', raw_title.lower())
    slug = slug.replace(' ', '-').replace('--', '-')
    fname = safe_date + "-" + slug + ".md"

    if os.path.exists(fname):
        print "ERROR: The draft file " + fname + " already exists."
        sys.exit(1)

    raw_date = raw_input("Date [" + date + "]: ")
    if len(raw_date) <= 0:
        raw_date = date

    raw_author = raw_input("Author [" + author + "]: ")
    if len(raw_author) <= 0:
        raw_author = author

    raw_cat = raw_input("Category [" + cat + "]: ")
    if len(raw_cat) <= 0:
        raw_cat = cat

    raw_tags = raw_input("Tags (tag,tag): ")
    tags = raw_tags.split(",")

    f = open(fname, 'a')

    f.write("Title: " + raw_title + "\n")
    f.write("Date: " + raw_date + "\n")
    f.write("Author: " + raw_author + "\n")
    f.write("Category: " + raw_cat + "\n")
    f.write("Tags: " + raw_tags + "\n")
    f.write("Slug: " + slug + "\n")
