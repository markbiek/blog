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
            ('<img src="//static.biek.org/blog/img/twitter-128-black.png" alt="@antelopelovefan" />', 'https://twitter.com/antelopelovefan'),
            ('<img src="//static.biek.org/blog/img/stackoverflow-128-black.png" alt="Stackoverflow Careers" />', 'http://careers.stackoverflow.com/markbiek'),
            ('<img src="//static.biek.org/blog/img/github-128-black.png" alt="GitHub" />', 'https://github.com/markbiek?tab=repositories'),
            ('<img src="//static.biek.org/blog/img/instagram-128-black.png" alt="Instagram" />', 'http://instagram.com/markbiek/'),
            ('<span class="oi oi-lock-locked" title="lock-locked" aria-hidden="true"></span>', 'http://mark.biek.org/pub.asc'),
        )

