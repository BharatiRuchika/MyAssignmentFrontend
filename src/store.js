import {createStore,applyMiddleware,combineReducers} from "redux";
import { createLogger } from "redux-logger";
import logger from "redux-logger";
import thunk from "redux-thunk";
import authReducer from "./components/Reducer/reducer"
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
    auth:authReducer
})
const middleware = [thunk];
const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)))
// const middleware = applyMiddleware(reduxPromiseMiddleware, thunk, logger);
export default store;