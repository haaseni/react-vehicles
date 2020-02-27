import { createStore, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const composedEnhancers = compose(
  middlewareEnhancer,
  devToolsEnhancer()
)

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;