import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import bovines from "./bovines";
import bovineTypes from "./bovineTypes";
import forms from "./forms";
import ui from "./ui";

const reducer = combineReducers({
  bovines: bovines,
  bovineTypes: bovineTypes,
  forms:forms,
  ui: ui,
});

const middleware = [thunk];

const initialState = {};
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
