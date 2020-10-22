Title: Learning about TypeScript interfaces
Date: 2020-10-22 20:49
Author: mark
Category: programming
Tags: javascript,typescript
Slug: learning-about-typescript-interfaces

We did our first major [work project](https://via.studio) using TypeScript and it's been pretty great. So great, I've decided to use it on my latest side-project as an additional learning opportunity.

One thing that confused me a bit at first was the difference between [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) and simple types.

For example, let's say I have a simple type like this
```
type Record = {
	name: string;
	value: string;
	num: number;
};
```

That's pretty straightfoward. I can declare a variable like this
```
const record: Record = {
	name: 'foo',
	value: 'bar',
	num: 100
};
```
and I'll get helpful errors if I set an invalid property or value.

The problem now is that I can't reference any properties of `record` by index!
```
for (const k in record) {
	if (record.hasOwnProperty(k)) {
		console.log(record[k]);
	}
}
```
The above will give me a TS error like `No index signature with a parameter of type 'string' was found on type Record`.

This is where Interfaces come in handy. With an Interface, I can explicitly type how an object can be indexed.
```
interface IRecord {
	[index: string]: number | string;
}
```

This simple interface says that I can index my object using a string (and nothing else! indexing by numeric index will throw an error). It also says possible return values can be numbers or strings (since those are the possible types of my current properties).

It's a good start, but I still don't have anything preventing me from assigning random properties or properties of invalid types on my object.

Luckily, Interfaces let you specify properties just like the simple `type` I defined in the beginning.
```
interface IRecord {
	[index: string]: number | string;

	name: string;
	value: string;
	num: number;
}
```

Now I can define my record object as `const record: IRecord`, my object properties are typed, _and_ I can index the object by string.
