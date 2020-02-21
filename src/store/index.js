import { createStore } from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension'
import rootReducer from "./reducer";

const store = createStore(rootReducer, /* preloadedState, */ devToolsEnhancer(
    // Specify custom devTools options
  ));

export default store;