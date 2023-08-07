Title: Getting the caption of an image attached to a WordPress post
Date: 2009-11-18 21:28
Author: mark
Category: Geek, Programming
Tags: php, wordpress
Slug: getting-the-caption-of-an-image-attached-to-a-post

I've been building a site at work that uses WordPress for the back-end.
Since the site is for a very specific purpose, most of the heavy lifting
happens through a heavily customized theme which means I'm getting knee
deep in WordPress [template tags][] (and, most likely, abusing them in
all sorts of horrific ways).

Most tasks involving template tags are pretty straightforward but there
was one thing that was a bit tricky for me to figure out.

*Getting the caption of an image attached to a post*

This seemed easy on the surface but ended up taking some research to
figure out.

Most people who've used WordPress have used the improved interface for
inserting an image (or [gallery][]) into a post. The interesting thing
is that those image attachments are actually stored as posts. Each image
attachment has an entry in the **wp\_posts** table with the
*parent\_post* field set to the ID of the containing post.

I may have missed it but I couldn't find a decent explanation of the
above anywhere. But the nice thing is that, once you have a handle to
the containing post, you can use the [get\_posts()][] template tag to
get at the image attachments.

Now, in my case, I have several posts in a category called "Pictures".
Each post contains a gallery [shortcode][] item which has a number of
image attachments.

In this example, we're getting a single, random post from the "Pictures"
category (category ID 9).


~~~~ {.php name="code"}
                     $picPosts = get_posts('numberposts=1&orderby=rand&category=9');                     $picPost = $picPosts[0];
~~~~



This gives us a post object ($picPost) which we can use to get at the
image attachments. The following code will get a single, random image
attachment (remember, that attachment is still just a post!) that has
$picPost as its parent.


~~~~ {.php name="code"}
                    $args = array(                                'post_type'=> 'attachment',                                'numberposts'=> 1,                                'post_status'=> null,                                'post_parent'=> $picPost->ID,                                'orderby'=> 'rand'                                );                    $attachments = get_posts($args);                    $attachment = $attachments[0];
~~~~



Once $attachment is set, we have an object that will give us the image
caption (stored in **$attachment-\>post\_excerpt**) or the image
description (**$attachment-\>post\_content**).

This strategy lets me have a gallery section of the site that links
nicely together (using [previous\_post\_link][] and [next\_post\_link][]
on each page that has a post using the gallery shortcode) and I can
easily pull a random image attachment out to display on the front page.

  [template tags]: https://codex.wordpress.org/Template_Tags
  [gallery]: https://codex.wordpress.org/Gallery_Shortcode
  [get\_posts()]: https://codex.wordpress.org/Template_Tags/get_posts
  [shortcode]: https://codex.wordpress.org/Shortcode_API
  [previous\_post\_link]: https://codex.wordpress.org/Template_Tags/previous_post_link
  [next\_post\_link]: https://codex.wordpress.org/Template_Tags/next_post_link
