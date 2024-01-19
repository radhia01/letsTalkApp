import {
  ADDGROUP,
  ADDMESSAGETOGROUP,
  GETGROUPS,
  GETGROUPSMESSAGES,
  JOINGROUP,
  LEAVEGROUP,
} from "../actions/types";
const initialState = {
  groups: [],
  messagesgroups: [],
};
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETGROUPS:
      return {
        ...state,
        groups: action.payload,
      };
    case ADDGROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case JOINGROUP:
      return {
        ...state,
        groups: state.groups.map((el) =>
          el._id === action.payload._id ? action.payload : el
        ),
      };
    case LEAVEGROUP:
      return {
        ...state,
        groups: state.groups.map((el) =>
          el._id === action.payload._id ? action.payload : el
        ),
      };
    case GETGROUPSMESSAGES:
      return {
        ...state,
        messagesgroups: action.payload,
      };
    case ADDMESSAGETOGROUP:
      return {
        ...state,
        messagesgroups: [state.messagesgroups, action.payload],
      };
    default:
      return state;
  }
};
export default groupReducer;
