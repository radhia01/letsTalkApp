export const addmessage = (msg, sender, receiver) => {
  return {
    type: "addmsg",
    data: msg,
    from:sender,
    to: receiver,
  };
};

export const addtolistfriend = (iduser,idfriend) => {
  return {
    type: "addfriend",
    payload:iduser,
    idf:idfriend,
  };
};
export const removeFriend = (idus, idfr) => {
  return {
    type: "removefriend",
    payload: idus,
    idf: idfr,
  };
};
export const login = (user,psw) => {
  return {
    type: "login",
    val1: user,
    val2: psw,
  };
};
export const editimage = (id,img) => {
  return {
    type: "editim",
    image: img,
    userid:id
  };
};
export const editinfo = (id,username,email,phone) => {
  return {
    type: "editinf",
    data1: id,
    data2:username,
    data3:email,
    data4:phone
  };
};
export const editpassword = (id,ps) => {
  return {
    type: "editpass",
    data5:id,
    pass:ps
  };
};
export const adduser = (username,email,password,phone,image) => {
  return {
    type: "signIn",
    username:username,
    email:email,
    password:password,
    phone:phone,
    image:image,
  };
};
export const addgroup = ( nameg) => {
  return {
    type: "addg",
   name:nameg,
   
  };
};

export const Online = (em,pass) => {
  return {
    type: "online",
     eml:em,
     passw:pass
  };
};
export const Offline = (em1, pass1) => {
  return {
    type: "offline",
    eml1: em1,
    passw1: pass1,
  };
};
export const deletemsg = (id) => {
  return {
    type: "deletems",
    idmsg:id
  };
};
export const editmsg = (id,newmsg) => {
  return {
    type: "editms",
    paylod: id,
    msg:newmsg
  };
};
export const addmember = (id,idg) => {
  return {
    type: "addmember",
    iduser: id,
    idgroup:idg
 
  };
};
export const sendMessageGroup = (idgroupe, idmember,message) => {
  return {
    type: "sendtogroup",
    payload: idgroupe,
    idmember:idmember,
    msg: message,
  };
};
export const Leavegroup = (idg, idm) => {
  return {
    type: "leavegroup",
    payload: idg,
    idmem: idm,
  };
};
export const Viewmessage = (idm) => {
  return {
    type: "viewmessage",
    payload: idm,
  
  };
};
export const sendInvit = (idsender,idreceiver) => {
  return {
    type: "sendinvitation",
    payload: idsender,
    receiver: idreceiver,
  };
};
export const acceptinvit = (idreceiver, idsender) => {
  return {
    type: "acceptinvitation",
    payload: idsender,
    receiver: idreceiver,
  };
};
export const deleteinvitation = (idsender,idreceiver) => {
  return {
    type: "deleteinvit",
    payload: idsender,
    receiver: idreceiver,
  };
};

export const Authentication = () => {
  return {
    type: "authenticated",  
  };
};
export const Logout = () => {
  return {
    type: "logout",
  };
};

