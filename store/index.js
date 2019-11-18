import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import singleUser from "./singleUser";
import allUsers from "./alluser";
import allGroups from "./groups";
import allMessages from "./messages";

const rootReducer = combineReducers({
  singleUser,
  allUsers,
  allGroups,
  allMessages
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(rootReducer, middleware);
