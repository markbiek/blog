Title: Launching vim from a PHP cli app and reading the output.
Date: 2022-02-25 10:56
Author: mark
Category: Programming
Tags: php
Slug: php-launch-vim-read-output

I've always wondered if it's possible to write a PHP command-line script that launches an editor, lets the user type something, then reads in whatever they type (like a git commit log message).

Turns out, it's pretty straightforward with the [Symfony Process](https://symfony.com/doc/current/components/process.html#using-php-streams-as-the-standard-input-of-a-process) component.

```
<?php

require_once __DIR__ . '/vendor/autoload.php';

use Symfony\Component\Process\Process;

// Create a temporary file so the user has something to type into
$edit_file = tempnam(sys_get_temp_dir(), "_log");

// Attempt to load the user's EDITOR from the environment. Default to vim otherwise.
$editor = getenv('EDITOR') !== false ? getenv('EDITOR') : 'vim';

// Launch the editor and open the temp file
// This will pause execution of our script until they save and close the editor.
$process = new Process(['vim', $edit_file]);
$process->setTty(true);
$process->run();

// Read back the data they entered.
$data = file_get_contents($edit_file);
echo "$data\n";

// Clean up after ourselves.
unlink($edit_file);
```