import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; // using local and session storage so when you refresh the page , you will not use your states
import logger from 'redux-logger'; // is a middleware for logging actions
import thunk from 'redux-thunk'; // is a middleware for async event handler

import rootReducer from './root-reducer'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store)

export default { store, persistor };