#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = u'Mark Biek'
SITENAME = u'Antelope Love Fan'
SITEURL = '//mark.biek.org/blog'
ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}/'

FEED = 'feeds/all.atom.xml'
FEED_ATOM = 'feeds/all.atom.xml'

RELATIVE_URLS = False
DEFAULT_PAGINATION = 5

TIMEZONE = 'America/Kentucky/Louisville'
DEFAULT_LANG = u'en'
DISQUS_SITENAME = 'markbiekorg'
GOOGLE_ANALYTICS = 'UA-6890403-1'

FILES_TO_COPY = (('extra/.htaccess', '.htaccess'),)
THEME = "pelican-themes/alftheme"

# Blogroll
LINKS =  ()

# Social widget
SOCIAL = (
            ('<i class="fa fa-twitter-square"></i>', 'https://twitter.com/antelopelovefan'),
            ('<i class="fa fa-file-text"></i>', 'http://careers.stackoverflow.com/markbiek'),
            ('<i class="fa fa-github-square"></i>', 'https://github.com/markbiek?tab=repositories'),
            ('<i class="fa fa-instagram"></i>', 'http://instagram.com/markbiek/'),
            ('<i class="fa fa-lock"></i>', 'http://mark.biek.org/pub.asc'),
        )

