Title: Making a Typescript property dependent on the value of another property
Date: 2021-09-29 20:42
Author: mark
Category: Programming
Tags: typescript,javascript
Slug: making-a-typescript-property-dependent-on-the-value-of-another-property

I recently ran into a situation where I wanted Typescript to require a certain property, only if the _value_ of a different property was a specific value.

With some help from a [coworker](https://github.com/acrobertson) and some additional reading, I found a solution that uses a combination of [Union](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) and [Intersection](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) types.

Let's say I have a couple of contrived objects like this
```
let a = {
	title: 'A title';
	type: 'value';
	value: 'This is a value';
};

let b = {
	title: 'Another title';
	type: 'nothing';
};
```

What I want is for the property `value` to only be required when `type == 'value'`.

To start, I declare a base type which contains the properties I always want to have:
```
type Base = {
	title: string;
	type: 'value' | 'nothing';
}
```

Then I can declare intersection types for each possible value of the `type` property:
```
type ValueType = Base & {
	type: 'value';
	value: string;
};

type NothingType = Base & {
	type: 'nothing';
	value: never;
}
```

For `ValueType`, we inherit all of the type properties of the `Base` type but require a string `value` property when `type == 'value'`;

For `NothingType`, we also inherit everything from `Base` but specify that the `value` property should never exist.

Then we create a union type that we'll use on the actual objects we declare:
```
type MyType = ValueType | NothingType;
```

Here are examples of objects that pass all of our type checks:
```
let good1: MyType = {
	title: 'This is a good object',
	type: 'value',
	value: 'a value'
};

let good2: MyType = {
	title: 'This is a good object',
	type: 'nothing',
};
```

And here are some objects that throw type errors:
```
let bad1: MyType = {
	title: 'This is a good object',
	type: 'value',
	// Here, we're missing the `value` property
};

let bad2: MyType = {
	title: 'This is a good object',
	type: 'nothing',
	value: 'another value'
	// Here, we shouldn't have a `value` property at all
};
```

[Typescript playground example](https://www.typescriptlang.org/play?#code/C4TwDgpgBAQghgZ2gXigbwFAEhgEtgA2EAXFAsAE64B2A5gNzaiSkDkAbnAQK4StQAfKK2oB7YAAsatVowC+GDM2gA1LrwAq4FLETQAZOiba2nHn0ZYzvUuSp15jJdqgA5cVLpbIUVPCRQhpg4JsJiktKy2NYkUNQQ7BAU8orKUACyIN46aubZgm4e0tlORMBQtKKiACakmfmowXiEsawaUghQuJ1wFVXVUKIARgBWEADGwKwANMYswjEz0eqtvYsYcqUQ5UNw1QCMdVkujUz4RGzt3V09fTWDoxNTsyHzHCtLm4plULvVAExHBpGHDnVpXTrXXqVe7DMaTJavVrhTwyF4xNhwFFJKDrTZAA)

## Update
The aforementioned [coworker](https://github.com/acrobertson) also showed me a nice way to do the same as the above using Interfaces which gives you slightly nicer error messages.

[Typescript playground example](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgEJwM4oN4CgCQYwYANhAFzIZhSgDmA3AWAJ4AOFyA5AG5wkBXCF2QAfbiAD2YABb0uTAL65coSLEQoAavyEAVdiggAPSCAAmGNJhzNDlXruFN8fQZ2q0QjXMtXhoeCRkADlpOW8DDmQTM0trLGQ8QntuNyEFAnTOEAgeaCUVVmiAWRYolABeZB13CrFQ8PoKplwyMGQ6SUlzSjL66uSiUk4uPTkrYCs4Tu7zZEkAIwArCAQwLgAaOw4HbK2spwcZ-d9WtogOxbhzAEY+8sNkQeZiMgdxqeQvma6ehZWaw22xSuzSTgOila7WQ13MACYHgMkq8Rh8Jt9prN-ktVusDqDRlJZPIQdljsSZNBkKcoUA)
