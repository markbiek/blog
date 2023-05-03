Title: Let's Talk About AI
Date: 2023-05-03 14:13:18
Author: mark
Category: Programming
Tags: software-development,learning,ai
Slug: lets-talk-about-ai

### Let's talk about AI
Obviously AI chat bots (like ChatGPT, Bing AI, Google Bard, etc) are the hotness for 2023. There's a lot of discussion about the ways AI is going to affect work, education, and society at large. 

Will it help bridge the divides created by the Internet and social media? Or will it just make things worse? Are jobs going to disappear because of AI? If so, which jobs? Will software development become a thing of the past? How will AI transform education (or not)?

### AI in Education
The article [ChatGPT Can't Kill Anything Worth Preserving](https://biblioracle.substack.com/p/chatgpt-cant-kill-anything-worth) is my favorite take on ChatGPT in education. Please go and read this article, then go back and read it again.

The short version is, if your students can do entire assignments you've given them using ChatGPT, you're assigning crappy assignments. That said, we want to be careful and intentional about _how_ we let AI do things for us.

While I find Paul Graham to be hit or miss (love his [stuff on writing](http://paulgraham.com/writing44.html)), I definitely think this [Twitter thread](https://twitter.com/paulg/status/1655925905527537666) brings up a lot of important points about AI and writing.

If you don't want to read the whole thread, just read this quote:

> I'm not warning about the switch to AI in the hope of averting it, but to warn the few people who care enough to save themselves, or their kids. Learn to use AI. It's a powerful technology, and you should know how to use it. But also learn how to write.

I think ChatGPT and its ilk have the power to radically transform education for the better. I don't know of a single teenager who adores school anymore. Maybe these new tools can take away the busy-work they get buried in and let them get back to the joy and process of learning.

The question is, how can we fit new tools like AI into a broken and underfunded education system? My fear is that these tools will only be used by the schools with the most money. In the US, that means that private schools will reap the benefits long before public schools and only widen the education gap.

### Bing Search
Microsoft [announced](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/) a new AI-powered version of Bing and the initial reviews of it are a bit...unhinged.

- [Bing: "I will not harm you unless you harm me first"](https://simonwillison.net/2023/Feb/15/bing/).
- [Bing AI Can't be Trusted](https://dkb.blog/p/bing-ai-cant-be-trusted)

The short version is that Bing just makes stuff up. It takes all of this information from different sources and uses to answer questions with total nonsense. To be fair, ChatGPT can and does do the same thing. But ChatGPT isn't posing as **A SEARCH ENGINE**.

On the surface, some of Bing AI's behavior is funny but the thought of people using it to, say, [get financial information](https://dkb.blog/i/102643499/gap-financial-statement-summary) (or political details or anything of important) is terrifying. 

Most of the people using this are going to take the information from different AI-powered systems as absolute fact. As AI generated video gets better and better, this has far reaching and dangerous consequences for news media. In the end, my biggest fear is that this just becomes another avenue (or maybe THE avenue) for dangerous, false information to spread online.

It's not all doom and gloom though. When used properly, things like ChatGPT can definitely be a productivity multiplier.

## Recent things I've used ChatGPT for
I don't think that AI is going to do away with software development. But I _do_ think that software developers who know how to leverage AI are going to have an advantage in the job market. Just like good Internet searches are a skill, so is writing good ChatGPT prompts. 

Here are a handful of things, personal and professional, that ChatGPT was super helpful with.

### A dice roller
It's slow-ish but, in a pinch, you can ask ChatGPT to roll dice for you.

> 🧍 Can you be a dice roller?
> 🤖 Yes, I can be a virtual dice roller. What kind of dice would you like me to roll for you?
> 🧍 3d8
> 🤖 Certainly! Here are your 3 rolls of an 8-sided die:
> 🤖 Roll 1: 6
> 🤖 Roll 2: 2
> 🤖 Roll 3: 8

I won't try to speak to how good the randomness is. It's probably insufficient for anything security-related but should be fine for a game.

### Automation script using simple-git and Inquirer.js.
I needed to write an automation script using [simple-git](https://github.com/simple-git-js/simple-git) (for git operations) and [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) (for nice user prompts).

> 🧍 Can you read the documentation for the libraries https://github.com/simple-git-js/simple-git and https://github.com/SBoudrias/Inquirer.js?
> 🤖 Yes, I can read the documentation for those libraries. Would you like me to provide you with a summary or answer any specific questions?
> 🧍 I have specific questions.
> 🤖 Please go ahead and ask your questions.
> 🧍 How would I use simple-git to check the git status of the current directory?

The first response was accurate (and useful) because it broke down the steps of creating a new simple-git instance and calling `git.status`. The only problem was that it used Promises and callbacks.

So then I asked
> 🧍 Can you rewrite that using async/await?
> 🤖 Sure! Here's how you can use async/await to check the git status of the current directory using the simple-git library:

```
const simpleGit = require('simple-git');

async function getStatus() {
  try {
    const git = simpleGit();
    const status = await git.status();
    console.log(status);
  } catch (err) {
    console.error(err);
  }
}

getStatus();
```

I kept periodically asking ChatGPT to provide code snippets of various actions using the two libraries. It often forgot that I wanted `async/await` code or that I was using ESM (`import whatever from 'whatever'`) instead of CommonJS (`const whatever = require('whatever')`) but I either asked it to rewrite the code or just tweaked it myself.

There were a number of cases where I didn't like the code it generated and refactored it or wrote it differently. Either way, it still saved me a ton of time trying to figure out how to use the libraries.

### Comparing raw tables of data.
I had two spreadsheets of pricing data for different currencies that I need to compare and double-check. I was concerned about duplicate rows and mismatched values. As an added bonus, I didn't even have to format the data. I just copied straight from Google Sheets into ChatGPT.

In reality, these spreadsheets were quite large but I can demonstrate how ChatGPT helped using a smaller dataset.

> 🧍 I'm going to give you a table of currencies and prices
> 
> 🧍 currency,price
> 🧍 AUD,100
> 🧍 EUR,200
> 🧍 USD,300
>
> 🤖 Thank you for providing me with the table of currencies and prices. Is there anything specific you would like me to do with this information, or do you have any questions regarding currencies and exchange rates?
> 
> 🧍 I'm going to give you another table. Can you tell me if all the prices for each currency match the first table?
> 
> 🧍 currency,price
> 🧍 USD 400
> 🧍 USD 300
> 🧍 EUR 200
> 🧍 AUD 100
>
> 🤖 Sure. Here's a comparison of the two tables. As we can see, the prices for AUD and EUR match in both tables, but the prices for USD differ. In the first table, the price for USD is 300, whereas in the second table, there are two prices for USD, 300 and 400.

### Writing TypeScript stuff.
My TypeScript knowledge is OK but not great. I've found a number of cases where ChatGPT gave me better answers than a regular Internet search.

> 🧍 Let's say I have this type
> 🧍 export type MaximumFootnotes = '1' | '2' | '3' | '4' | '5';
> 🧍 How can I make a new object type that only allows keys that are the values in MaximumFootnotes but doesn't require all of them?
> 
> 🤖 Here's an example of how you can define a new object type MyFootnotes that allows keys that are values in MaximumFootnotes, but doesn't require all of them:
```
export type MaximumFootnotes = '1' | '2' | '3' | '4' | '5';

type MyFootnotes = {
  [key in MaximumFootnotes]?: string;
};
```

### Generating repeated blocks of code.
This is something that Github CoPilot does well with sometimes. My only complaint there is it often takes a while for Github Copilot to figure out what I'm doing.

As an experiment, I tried using ChatGPT to do it in the following manner

> 🧍 I'm going to give you a list of Javascript constants. For each constant, give me code with the following structure and use the comment at the end of the line as the return value for the getTitle function
```
export [ MY_CONSTANT ]: {
	getConstant: () => MY_CONSTANT,
	getTitle: () => translate('TITLE'),
}
```
> 🤖 Sure, I'd be happy to help you with that. Please provide me with the list of Javascript constants.
```
export const FOO = 'foo'; // This is foo
export const BAR = 'bar'; // This is bar
export const BAZ = 'baz'; // This is baz
```
> 🤖 Here is the code structure you requested for the given constants:
```
export [ FOO ]: {
	getConstant: () => FOO,
	getTitle: () => translate('This is foo'),
}
export [ BAR ]: {
	getConstant: () => BAR,
	getTitle: () => translate('This is bar'),
}
export [ BAZ ]: {
	getConstant: () => BAZ,
	getTitle: () => translate('This is baz'),
}
```
> 🧍 Now give me the Javascript import statement for all of the constants.
>
> 🤖 Sure, here's the import statement for all the constants:
```
import {
	FOO,
	BAR,
	BAZ
} from './constants';
```

### Generating a triage schedule.
We needed a schedule for my team where each person was in charge of triaging incoming issues for two weeks.

> 🧍 I'm going to give you a comma-separated list of names. Please put the list in random order starting with Mark and ending with Alice?
> Mark, Alice, Beth, Charlie, David, Eddie
>
> 🤖 Sure, here are the names in a randomized order starting with Mark and ending with Alice:
> 🤖 Mark, Beth, David, Eddie, Charlie, Alice.
>
> 🧍 Using that order, give me a 6 month schedule where each person is in charge for two week.
>
> 🤖 Sure, here is a 6-month schedule starting with Mark and ending with Alice, where each person is in charge for two weeks:
> 🤖 Mar 27 - Apr 9: Mark
> 🤖 Apr 10 - Apr 23: Beth
> 🤖 Apr 24 - May 7: David
> 🤖 May 8 - May 21: Eddie
> 🤖 May 22 - Jun 4: Charlie
> 🤖 Jun 5 - Jun 18: Alice
> 🤖 Jun 19 - Jul 2: Mark
> 🤖 Jul 3 - Jul 16: Beth
> 🤖 Jul 17 - Jul 30: David
> 🤖 Jul 31 - Aug 13: Eddie
> 🤖 Aug 14 - Aug 27: Charlie
> 🤖 Aug 28 - Sep 10: Beth

### SQL queries.
I have a personal project that's a web-based image gallery. Images can be assigned any number of tags. I've been working on a feature that lets you query all images that have one or more tags (eg `/tags/pets+cute`) and was feeling lazy coming up with the SQL query.

> 🧍 Write a sql query which shows all images that have all of the specified tag ids.
>
> 🤖 To find all images that have all of the specified tag IDs, you can use the following query:
```
SELECT i.*
FROM images i
JOIN image_tags it ON i.id = it.image_id
WHERE it.tag_id IN (tag_id_1, tag_id_2, ..., tag_id_n)
GROUP BY i.id
HAVING COUNT(*) = n
```