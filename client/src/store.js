// redux store boiler plate

// import function called create store and apply middleware from redux
import { createStore, applyMiddleware } from 'redux';
// want to use the redux devtools so were going import this as well
import { composeWithDevTools } from 'redux-devtools-extension';
// import our middleware which is thunk
import thunk from 'redux-thunk';
// we'll have multiple reducers, but were going to combine them in a root reducer inside our reducers folders.. since were calling it
// index.js we don't need to specify the exact file, just reducers
import rootReducer from './reducers';

// our initialstate is set in our reducers, but we initialize it as an empty object here
const initialState = {};
// create a middleware variable for thunk
const middleware = [ thunk ];

// now we create the store, we start with the createStore function, the its going to take in the reducer
// then the initial state, then the devtools and the devtools is going to take in our middleware so were going to use the
// apply middleware function and then use the spread operator to take it in the middleware variable we declared
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
