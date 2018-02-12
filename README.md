# MSAL for Redux applications &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/msal-redux.svg?style=flat)](https://www.npmjs.com/package/msal-redux)

This package attempts to gracefully integrate the authentication flow from [MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js) into [Redux](https://redux.js.org/) applications.

## Installation

```sh
npm install msal-redux --save
```

*Note:* msal-redux requires `redux` and `redux-saga` as peer dependencies. Please install these in your project manually.

## Usage

### TypeScript

```typescript
import { IMsalState, msalReducer, msalSaga } from "msal-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

const clientId = "<your app id>";
const authority = "https://login.microsoftonline.com/<your tenant id>";

interface IState {
    auth: IMsalState;
}
const reducer = combineReducers<IState>({
    auth: msalReducer
});

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware),
)(createStore);
const store = createStoreWithMiddleware(reducer, {});

sagaMiddleware.run(msalSaga, clientId, authority, null);
```

### JavaScript

```javascript
import { msalReducer, msalSaga } from "msal-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

const clientId = "<your app id>";
const authority = "https://login.microsoftonline.com/<your tenant id>";

const reducer = combineReducers({
    auth: msalReducer
});

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware),
)(createStore);
const store = createStoreWithMiddleware(reducer, {});

sagaMiddleware.run(msalSaga, clientId, authority, null);
```

## Actions

> All actions are constants exported from the main module.

### Actions dispatched by the user

| Constant                     | Payload                                  | Description
|------------------------------|------------------------------------------|-------------
| `MSAL_SIGN_IN`               | `{ popup?: boolean; scopes?: string[] }` | Dispatch this action when you want to require a user to sign in to your application.
| `MSAL_SIGN_OUT`              | None                                     | Dispatch this action when you want a user to be signed out.

### Actions dispatched by the library

| Constant                     | Payload                                                 | Description
|------------------------------|---------------------------------------------------------|-------------
| `MSAL_ACCESS_TOKEN_RECEIVED` | `{ accessToken: string; scopes: string[]; user: User }` | Dispatched when the user is successfully signed in or the access token is refreshed.
| `MSAL_CALLBACK_PROCESSED`    | None                                                    | Dispatched after the callback from sign-in has been processed. Useful for removing the hash from the URL.
| `MSAL_SIGN_IN_FAILURE`       | `{ error: string }`                                     | Dispatched if a sign-in fails.

## License

Licensed under either of

 * Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any
additional terms or conditions.
