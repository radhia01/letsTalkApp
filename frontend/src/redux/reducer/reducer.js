const states = {
  isAuthenticated: false,
  users: [],
  messages: [],
  login: [],
  FriendsList: [],
  groups: [],
};

const reducer = (state = states, action) => {
  switch (action.type) {
    case "authenticated":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
      };

    case "signIn":
      return {
        ...state,
        users: [...state.users, action.payload],
        

      };
    case "addmsg":
      const message = action.data;
      const rec = action.to;
      const send = action.from;
      const max = state.messages.reduce(
        (acc, current) => (current.id > acc ? current.id : acc),
        0
      );
      // const user = state.users.findIndex((e) => e.id === rec);
      // const newusers=[...state.users];
      // newusers[user].msnotread.push(send);
      return {
        ...state,

        messages: [
          ...state.messages,
          {
            id: max + 1,
            msg: message,
            from: send,
            to: rec,
            vue: false,
          },
        ],
      };

    case "addfriend":
      const idfriend = action.idf;
      const iduser = action.payload;

      return {
        ...state,

        FriendsList: [
          ...state.FriendsList,
          {
            friend1: iduser,
            friend2: idfriend,
          },
        ],
      };

    case "sendinvitation":
      const idsender = action.payload;
      const idreceiver = action.receiver;
      const useridd = state.users.findIndex(
        (element) => element.id === idreceiver
      );
      const newusers = [...state.users];
      newusers[useridd].invitations.push({ idf: idsender, accepted: false });
      return {
        ...state,
        users: newusers,
      };

    case "acceptinvitation":
      const idsender1 = action.payload;
      const idreceiver1 = action.receiver;
      const useri = state.users.findIndex(
        (element) => element.id === idreceiver1
      );
      const newusers2 = [...state.users];
      const invit = newusers2[useri].invitations.findIndex(
        (e) => e.idf === idsender1 && e.accepted === false
      );
      newusers2[useri].invitations[invit].accepted = true;
      // const friend2=state.users.findIndex(e=>e.id===idsender)
      // newusers2[friend2].invitations.put({idf:idreceiver,accepted:true})

      return {
        ...state,
        users: newusers2,
      };

    case "removefriend":
      const idf = action.idf;
      const idu = action.payload;

      return {
        ...state,
        FriendsList: state.FriendsList.filter(
          (e) => e.friend1 !== idu || e.friend2 !== idf
        ),
      };
    case "login":
      const login1 = action.val1;
      const login2 = action.val;
      return {
        ...state,
        login: [
          ...state.login,
          {
            username: login1,
            password: login2,
          },
        ],
      };
    case "online":
      const e = action.eml;
      const p = action.passw;
      const i = state.users.findIndex(
        (user) => user.email === e && user.password === p
      );
      const newarray4 = [...state.users];
      newarray4[i].actif = true;

      return {
        ...state,
        users: newarray4,
      };
    case "offline":
      const e1 = action.eml1;
      const p1 = action.passw1;
      const index = state.users.findIndex(
        (user) => user.email === e1 && user.password === p1
      );
      const newarray5 = [...state.users];
      newarray5[index].actif = false;

      return {
        ...state,
        users: newarray5,
      };
    case "editinf":
      const data1 = action.data1;
      const data2 = action.data2;
      const data3 = action.data3;
      const data4 = action.data4;
      const ind = state.users.findIndex((user) => user.id === data1);
      const newarray1 = [...state.users];
      newarray1[ind].username = data2;
      newarray1[ind].email = data3;
      newarray1[ind].phone = data4;
      return {
        ...state,
        users: newarray1,
      };
    case "editpass":
      const data5 = action.data5;
      const password = action.pass;
      const indx = state.users.findIndex((user) => user.id === data5);
      const newarray2 = [...state.users];
      newarray2[indx].password = password;

      return {
        ...state,
        users: newarray2,
      };
    case "editim":
      const newavatar = action.image;
      const userid = action.userid;
      const id = state.users.findIndex((user) => user.id === userid);
      const newarray3 = [...state.users];
      newarray3[id].img = newavatar;

      return {
        ...state,
        users: newarray3,
      };
    case "addg":
      const name = action.name;
      const maxidd = state.groups.reduce(
        (acc, current) => (current.id > acc ? current.id : acc),
        0
      );
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            id: maxidd + 1,
            name: name,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJC3Ge0OBuPXcXuC3V5V0S0n8Yh0IkHy9dpQ&usqp=CAU",
            members: [],
            messages: [],
          },
        ],
      };
    case "deletems":
      const idmessage = action.idmsg;
      return {
        ...state,
        messages: state.messages.filter((element) => element.id !== idmessage),
      };
    case "editms":
      const idmsg = action.payload;
      const newmsg = action.msg;
      const indexmsg = state.findindex((element) => element.id === idmsg);
      const newmessage = [...state.messages];
      newmessage[indexmsg].msg = newmsg;
      return {
        ...state,
        messages: newmessage,
      };

    case "addmember":
      const idmember = action.iduser;
      const idgroup = action.idgroup;
      const idgrp = state.groups.findIndex((e) => e.id === idgroup);
      const group = [...state.groups];
      group[idgrp].members.push(idmember);

      return {
        ...state,

        groups: group,
      };

    case "sendtogroup":
      const groupid = action.payload;
      const member = action.idmember;
      const messageMember = action.msg;
      const idgroupe = state.groups.findIndex((e) => e.id === groupid);
      const newtab = [...state.groups];
      newtab[idgroupe].messages.push({
        member: member,
        message: messageMember,
      });
      return {
        ...state,
        groups: newtab,
      };
    case "leavegroup":
      const idg = action.payload;
      const idm = action.idmem;
      const idgp = state.groups.findIndex((e) => e.id === idg);
      const grp = [...state.groups];
      const indexmemeber = grp[idgp].members.findIndex((id) => id === idm);
      grp[idgp].members.splice(indexmemeber, 1);

      return {
        ...state,
        groups: grp,
      };
    case "viewmessage":
      const newmessages = [...state.messages];
      const idmessages = action.payload;
      for (let i = 0; i < idmessages.length; i++) {
        const idd = idmessages[i];
        newmessages[idd].vue = true;
      }
      return {
        ...state,
        messages: newmessages,
      };
    default:
      return state;
  }
};
export default reducer;
