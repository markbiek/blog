Title: React-Native "Could not get BatchedBridge"
Date: 2016-12-27 16:44
Author: mark
Category: Programming
Tags: android,react,react-native
Slug: reactnative-could-not-get-batchedbridge


Maybe you're like me. Maybe you've been working with [ReactJS](https://facebook.github.io/react/) for a while and you want to play with [React Native](https://facebook.github.io/react-native/).

You download all of the appropriate tools to try and get a Android "Hello World" app working.

You create your project with `react-native init HelloWorld` and you run it with `react-native run-android` and it dies.

<img src="https://static.biek.org/blog/img/batchedbridge.png" alt="Could not get BatchedBridge, make sure your bundle is packaged correctly." />

I don't know exactly what causes ☝️ but it's easy (albeit completely non-obvious) to fix. Luckily, you only have to follow these steps with a new project.

## Create the android assets directory
`mkdir android/app/src/main/assets`

## Manually start the React packager
`react-native start --reset-cache`

## Manually force a build of the android build
`curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"`

## Profit!
Now you should be able to do `react-native run-android` to launch your app.

## One more thing
If you get any errors about hot-reloading and not connecting to the development console, just run `adb reserve tcp:8081 tcp:8081` and then reload the app on the device.
