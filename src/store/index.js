import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import bovines from "./bovines";
import brands from "./brands";
import transactions from "./transactions";

const reducer = combineReducers({
  bovines: bovines,
  brands: brands,
  transactions: transactions
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
