import {
  LOGIN,
  LOGOUT,
  RESETMESSAGE,
  SIGNIN,
  GETUSERS,
  SENDMESSAGE,
  GETUSERMESSAGES,
  DELETEMESSAGE,
  SENDINVITATION,
  ACCEPTINVIT,
  DELETEINVIT,
  UPDATEPASSWORD,
  DELETEFRIEND,
  EDITPROFILE,
  RESETERROR,
  DELETEACCOUNT,
  SETMESSAGETOVIEWED,
  GETINVITATIONS,
} from "../actions/types";

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  await fetch("https://let-s-talk-backend-silk.vercel.app/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch({
        type: LOGIN,
        payload: response,
      });
    })
    .catch((error) => console.error(error));
};
export const Reset_message = () => (dispatch) => {
  dispatch({
    type: RESETMESSAGE,
  });
};
export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};
export const signin = (user) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
    }),
  })
    .then((response) => response.json())
    .then((response) =>
      dispatch({
        type: SIGNIN,
        payload: response,
      })
    )
    .catch((error) => console.error(error));
};

export const getUsers = () => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: GETUSERS,
        payload: response,
      });
    });
};
export const getInvitations = () => async (dispatch) => {
  await fetch("http://localhost:3001/invitations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: GETINVITATIONS,
        payload: response,
      });
    });
};
export const sendMessage = (data) => async (dispatch) => {
  console.log(data);
  await fetch("https://let-s-talk-backend-silk.vercel.app/addmessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      iduse: data.iduse,
      id_receiver: data.id_receiver,
      message: data.message,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: SENDMESSAGE,
        payload: response,
      });
    });
};
export const getUserMessage = () => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: GETUSERMESSAGES,
        payload: response,
      });
    });
};

export const deleteMessage = (idmessage) => async (dispatch) => {
  await fetch(
    `https://let-s-talk-backend-silk.vercel.app/deletemessage/${idmessage}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: DELETEMESSAGE,
        payload: response,
      });
    });
};

export const sendInvitation = (iduse, idfriend) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/sentinvit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      iduse,
      idfriend,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: SENDINVITATION,
        payload: response,
      });
    });
};

export const acceptInvit = (iduse, idfriend) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/acceptinvit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      idfriend,
      iduse,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch({
        type: ACCEPTINVIT,
        payload: response,
      });
    });
};
export const acceptInvit2 = (iduse, idfriend) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/acceptinvit2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      idfriend,
      iduse,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACCEPTINVIT,
        payload: response,
      });
    });
};

export const deletefriend = (idfriend, iduser) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/removefriend", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      idfriend,
      iduser,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch({
        type: DELETEFRIEND,
        payload: response,
      });
    });
};
export const editProfile =
  (iduse, username, email, phone) => async (dispatch) => {
    await fetch("https://let-s-talk-backend-silk.vercel.app/updateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        iduse,
        username,
        email,
        phone,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch({
          type: EDITPROFILE,
          payload: response,
        });
      });
  };
export const updatePassword =
  (userid, password, lastpassword) => async (dispatch) => {
    await fetch("https://let-s-talk-backend-silk.vercel.app/updatepassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        userid,
        password,
        lastpassword,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        dispatch({
          type: UPDATEPASSWORD,
          payload: response,
        });
      });
  };
export const resetMessage = () => async (dispatch) => {
  dispatch({
    type: RESETMESSAGE,
  });
};
export const resetError = () => async (dispatch) => {
  dispatch({
    type: RESETERROR,
  });
};
export const deleteAccount = (password, id) => async (dispatch) => {
  await fetch("https://let-s-talk-backend-silk.vercel.app/deleteuser", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      password,
      id,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: DELETEACCOUNT,
        payload: response,
      });
    });
};
export const setMessageToViewed = (iduser1, iduser2) => async (dispatch) => {
  await fetch("http://localhost:3001/setviewed", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-xsrf-token": localStorage.getItem("TK"),
    },
    body: JSON.stringify({
      iduser1,
      iduser2,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: SETMESSAGETOVIEWED,
        payload: response,
      });
    });
};
