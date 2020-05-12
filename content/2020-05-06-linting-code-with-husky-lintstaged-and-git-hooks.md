Title: Linting code with husky, lint-staged and git hooks
Date: 2020-05-06 17:55
Author: mark
Category: Programming
Tags: tools,git,linting,javascript,php
Slug: linting-code-with-husky-lintstaged-and-git-hooks

At work, we've spent a lot of time trying to figure out the best way to handling linting Pull Requests.

We had some success with [mergeatron](https://github.com/SnapInteractive/mergeatron) + Jenkins for a long time, but eventually started to run into problems (like it crashing the server it was running on and being super slow).

We spent some time playing with [GitHub Actions](https://github.com/features/actions) which seem really interesting. Unfortunately, at the moment, it's still kind of the Wild West in the Actions Marketplace and the documentation for writing your own actions is spotty at-best.

We also played with different Continuous Integration tools like [TravisCI](https://travis-ci.org/) and [CircleCI](https://circleci.com/), both of which are very full featured but also expensive. They both seem like very heavy solutions for what we're trying to do.

We're a small team so all we really need is something that runs `eslint` and `phpcs` on any changed files in a commit.

And that's the exact use-fase for [typicode/husky](https://github.com/typicode/husky)! Combine that with [okonet/lint-staged](https://github.com/okonet/lint-staged) and you've got a super simple setup for doing basic linting on a project during commit and/or push.

Here's a sample project that can easily be added to a project of your own:

https://github.com/markbiek/husky-example

We're definitely not ruling out other tools, long-term. But the above should be a decent process for now
