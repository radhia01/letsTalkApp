import {
  GETGROUPS,
  ADDGROUP,
  JOINGROUP,
  LEAVEGROUP,
  ADDMESSAGETOGROUP,
  GETGROUPSMESSAGES,
} from "../actions/types";
export const getGroups = () => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/groups", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: GETGROUPS,
        payload: response,
      });
    });
};

export const addGroup = (groupname) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/addgroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      groupname,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: ADDGROUP,
        payload: response,
      });
    });
};
export const joinGroup = (iduse, idgroup) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/joingroup", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      iduse,
      idgroup,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: JOINGROUP,
        payload: response,
      });
    });
};
export const leaveGroup = (iduse, idgroup) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/leavegroup", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      iduse,
      idgroup,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: LEAVEGROUP,
        payload: response,
      });
    });
};

export const getGroupsMessages = () => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/groupsmsg", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: GETGROUPSMESSAGES,
        payload: response,
      });
    });
};
export const addMessageToGroup = (data) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/addmsgroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      iduse: data.iduse,
      idgroup: data.idgroup,
      message: data.message,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: ADDMESSAGETOGROUP,
        payload: response,
      });
    });
};
