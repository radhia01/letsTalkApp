import {
  LOGIN,
  RESETMESSAGE,
  SIGNIN,
  GETUSERS,
  SENDMESSAGE,
  GETUSERMESSAGES,
  DELETEMESSAGE,
  SENDINVITATION,
  ACCEPTINVIT,
  ACCEPTINVIT2,
  DELETEFRIEND,
  LOGOUT,
  EDITPROFILE,
  UPDATEPASSWORD,
  RESETERROR,
  DELETEACCOUNT,
  SETMESSAGETOVIEWED,
  GETINVITATIONS,
} from "../actions/types";
const initialState = {
  users: [],
  success: false,
  token: null,
  error: null,
  usermessages: [],
  successUpdate: false,
  message: null,
  removeAccount: false,
  invitationsList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      if (action.payload.success) {
        return {
          ...state,
          success: action.payload.success,
          token: action.payload.token,

          user: action.payload.user,
        };
      } else
        return {
          ...state,
          error: action.payload.error,
        };

    case LOGOUT:
      return {
        ...state,
        success: false,
        token: null,
        user: null,
      };

    case SIGNIN:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        success: action.payload.success,
        error: action.payload.error,
      };
    case RESETMESSAGE:
      return {
        ...state,
        message: null,
      };
    case RESETERROR:
      return {
        ...state,
        error: null,
      };

    case GETUSERS:
      return {
        ...state,
        users: action.payload,
      };
    case GETINVITATIONS:
      return {
        ...state,
        invitations: action.payload,
      };
    case GETUSERMESSAGES:
      return {
        ...state,
        usermessages: action.payload,
      };
    case DELETEMESSAGE:
      return {
        ...state,
        usermessages: state.usermessages.filter(
          (el) => el._id !== action.payload
        ),
      };
    case SENDINVITATION:
      const updatedInvitations = state.invitations.map((el) => {
        if (el.userid === action.payload.idfriend) {
          // Si l'utilisateur existe, ajoute une nouvelle invitation
          return {
            ...el,
            invitations: [
              ...el.invitations,
              { idfriend: action.payload.iduser, accepted: false },
            ],
          };
        } else {
          return {
            userid: action.payload.idfriend,
            invitations: [{ idfriend: action.payload.iduser, accepted: false }],
          };
        }
      });

      return {
        ...state,
        invitations: updatedInvitations,
      };
    case SENDMESSAGE:
      return {
        ...state,
        usermessages: [...state.usermessages, action.payload],
      };
    case ACCEPTINVIT:
      return {
        ...state,
        success: action.payload.success,
        users: state.users.map((user) => {
          if (user._id === action.payload.iduser) {
            return action.payload.user;
          } else if (user._id === action.payload.idfriend) {
            return {
              ...user,
              friendsList: [
                ...user.friendsList,
                { idfriend: action.payload.iduser },
              ],
            };
          }
          return user;
        }),
      };
    case ACCEPTINVIT2:
      return {
        ...state,
        users: state.users.filter((el) =>
          el._id === action.payload._id ? action.payload : el
        ),
      };
    case DELETEFRIEND:
      return {
        ...state,
        users: state.users.map((user) => {
          if (
            user._id === action.payload.iduser ||
            user._id === action.payload.idfriend
          ) {
            return {
              ...user,
              friendsList: user.friendsList.filter(
                (friend) =>
                  friend.idfriend !== action.payload.idfriend &&
                  friend.iduser !== action.payload.iduser
              ),
            };
          }
          return user;
        }),
      };
    case EDITPROFILE:
      if (action.payload.success) {
        return {
          ...state,
          successUpdate: action.payload.successUpdate,
          users: state.users.filter((user) =>
            user._id === action.payload._id ? action.payload : user
          ),
          message: action.payload.message,
        };
      } else
        return {
          ...state,
          error: action.payload.error,
        };

    case UPDATEPASSWORD:
      if (action.payload.error) {
        return {
          ...state,
          error: action.payload.error,
        };
      } else
        return {
          ...state,
          message: action.payload.message,
          users: state.users.filter((element) =>
            element._id === action.payload.user._id ? action.payload : element
          ),
        };
    case DELETEACCOUNT:
      if (action.payload.success) {
        return {
          ...state,
          removeAccount: true,
          success: false,
        };
      } else {
        return {
          ...state,
          error: action.payload.error,
        };
      }
    case SETMESSAGETOVIEWED:
      return {
        ...state,
        usermessages: state.usermessages.map((message) => {
          if (
            message.id_receiver === action.payload.iduser ||
            message.id_receiver === action.payload.iduser2
          ) {
            return {
              ...message,
              vue: true,
            };
          }
          return message;
        }),
      };
    default:
      return state;
  }
};
export default userReducer;
