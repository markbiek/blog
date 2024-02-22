Title: Adding types to react-editable-label
Date: 2024-02-22T21:41:06.102Z
Author: mark
Category: programming
Tags: npm,react,javascript,typescript
Slug: adding-types-to-react-editable-label

In 2018, I wanted to learn about writing and publishing npm packages.

I came up with the idea for a simple React component which toggles between a label and a text input and published [`v0.1.0` to npmjs.com](https://www.npmjs.com/package/react-editable-label/v/0.1.0).

Apparently that silly little component filled a niche for some people because it's been getting 1-2k downloads a week ever since.

I've iterated on it over the years, doing things like changing from a class-based component to using React hooks, etc.

And now, finally, I've added a basic type definition file so the component is easier to use in a Typescript project.

I'd initially tried adding a type definition to [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) because I didn't want to deal with converting the whole build process over to Typescript. Big kudos to the DefinitelyTyped folks for showing me how easy it was to add a type definition and leave the rest of the package basically untouched.

Here's [react-editable-label v1.4.0](https://www.npmjs.com/package/react-editable-label), now with types!