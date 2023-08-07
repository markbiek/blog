Title: Simple tabbed HTML navigation buttons
Date: 2009-11-13 10:19
Author: mark
Category: Geek, Programming
Tags: css, html
Slug: simple-tabbed-html-navigation-buttons

A colleague of mine (Charlie Dillon over at [fourthgate.org][]) recently
introduced me to a nice way create tab-like navigation buttons.

A simple example of the finished product looks like this.

<iframe src="https://mark.biek.org/blog/static/tabtest.php" width="500" height="40" scrolling="no" frameborder="0"></iframe>

#### Advantages



-   Works across all modern browsers (including IE6).
-   Link text is nicely centered.
-   The link fills up the entire button so you have a big clickable area
    and you can use **a:hover** for stying.
    
    
-   Uses very simple HTML and CSS and it's easy to style.



#### Disadvantages



-   It uses tables, which is handy because a lot of your
    sizing/stretching is handled automatically. However it makes it
    harder to use in a dropdown menu situation. In that case, you're
    better using a nested **<ul\>**.
-   The markup doesn't lend itself well to rounded corners.



Here's the HTML. Nothing shocking there.


~~~~ {.xhtml name="code"}
           <table cellpadding="0" cellspacing="0" border="0" class="tabs">                <tr>                    <td class="tab Selected"><a href="#">Home</a></td>                    <td class="tab"><a href="#">Store</a></td>                    <td class="tab"><a href="#">About</a></td>                    <td class="tab"><a href="#">Contact</a></td>                    <td class="tab"><a href="#">FAQ</a></td>                </tr>            </table>
~~~~



Now for the CSS

The first thing to do is give the **<table\>** a width and each
**<td\>** a height. I'm also centering the table on the page using
**margin-left** & **margin-right** and defining a class for when a tab
is selected.


~~~~ {.css name="code"}
            .tabs {                width:  500px;                margin-left:  auto;                margin-right:  auto;            }            .tabs .tab {                height:  30px;                background:  #FFB300;                text-align:  center;            }             .tabs .tab.Selected {                background:  #FFD573;            }
~~~~



Now for the fun part.


~~~~ {.css name="code"}
            .tabs .tab a {                display:  block;                font: normal normal bold 15px/30px Arial, sans-serif;                 color:  #000000;                text-decoration:  none;                text-transform:  uppercase;            }             .tabs .tab a:hover {                background:  #FFD573;            }
~~~~



There are a couple of interesting things happening here.

We're setting the **<a\>** tags to **display: block;** which lets them
fill up the entire **<td\>** that contains them.

Now notice the **15px/30px** part of the **font** style. We're setting
the **font-size** to 15px and the **line-height** to 30px which is the
*same height as the **<td\>***. This lets the text of the **<a\>** tag
float in the middle of the **<td\>** without using any margin or
padding.

That's all there is too it. Nothing too magical, but a nice effect.

  [fourthgate.org]: https://www.fourthgate.org/
