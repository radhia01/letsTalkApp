import user from "./user";
import group from "./group";
import { combineReducers } from "redux";
const rootreducers = combineReducers({
  user,
  group,
});
export default rootreducers;
