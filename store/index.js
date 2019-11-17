import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import singleUser from "./singleUser";
import allUsers from "./alluser";
import allGroups from "./groups";

const rootReducer = combineReducers({
  singleUser,
  allUsers,
  allGroups
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(rootReducer, middleware);
