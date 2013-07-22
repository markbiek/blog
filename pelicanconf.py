#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = u'Mark Biek'
SITENAME = u'Antelope Love Fan'
SITEURL = 'http://mark.biek.org/blog'
ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}/'

FEED = 'feeds/all.atom.xml'
FEED_ATOM = 'feeds/all.atom.xml'

RELATIVE_URLS = False
DEFAULT_PAGINATION = 5

TIMEZONE = 'America/Kentucky/Louisville'
DEFAULT_LANG = u'en'
#DISQUS_SITENAME = 'antelopelovefan'
GOOGLE_ANALYTICS = 'UA-6890403-1'

FILES_TO_COPY = (('extra/.htaccess', '.htaccess'),)
THEME = "pelican-themes/mnmlist"

# Blogroll
LINKS =  ()

# Social widget
SOCIAL = (
            ('@antelopelovefan', 'https://twitter.com/antelopelovefan'),
            ('@explodingvim', 'https://twitter.com/explodingvim'),
            ('Resume', 'http://careers.stackoverflow.com/markbiek'),
            ('StackOverflow', 'http://stackoverflow.com/users/305/mark-biek'),
            ('Github', 'https://github.com/markbiek?tab=repositories'),
            ('PGP', 'http://mark.biek.org/pub.asc'),
        )

