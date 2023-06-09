import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import listingsReducer from "./listings";
import sessionReducer from "./session";
import favoritesReducer from "./favorites";
import usersReducer from "./users";
import modalReducer from "./modal";

const rootReducer = combineReducers({
    session: sessionReducer,
    listings: listingsReducer,
    favorites: favoritesReducer,
    users: usersReducer,
    modal: modalReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
const logger = require('redux-logger').default;
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preloadedState) => {
return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;