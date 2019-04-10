Title: Issues with redux-saga's takeEvery and the Redux DevTools extension
Date: 2018-10-24 14:56
Author: mark
Category: Geek
Tags: react,redux,redux-saga,redux-devtools
Slug: issues-with-reduxsagas-takeevery-and-the-redux-devtools-extension

I ran into a strange issue with redux-saga and the Redx DevTools browser extension.

I had a simple saga like this
```
export function* watchSetThing() {
    yield takeEvery('SET_THING', handleDoStuff);
}
```

but, when I manually dispatched a `SET_THING` action from the Redux DevTools extension, `handleDoStuff` was never called.

I was initially creating my store like this
```
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
);
```

The reason I was having trouble is because the sagaMiddleware and the Redux DevTools extension aren't properly connected. My `takeEvery` call doesn't know that dispatches from the DevTools extension are happening.

I had to change my store to look like this instead
```
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
```

and then everything worked properly.
