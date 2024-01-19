import rootreducers from "./reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const store = createStore(rootreducers, applyMiddleware(thunk));
export default store;
