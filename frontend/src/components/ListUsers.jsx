import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import { BsCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CgSmileSad } from "react-icons/cg";
import Header from "./Header";
import Alert from "./Alert";
import {
  deleteMessage,
  getUserMessage,
  getUsers,
  sendMessage,
  sendInvitation,
  setMessageToViewed,
  getInvitations,
} from "../redux/actions/user";
import {
  addGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  getGroupsMessages,
  addMessageToGroup,
} from "../redux/actions/group";
const Listusers = () => {
  // connect to store
  const dispatch = useDispatch();
  const { usermessages, users, invitations } = useSelector(
    (state) => state.user
  );
  const { groups, messagesgroups } = useSelector((state) => state.group);
  // get item from localStorage
  const iduse =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"))._id;
  const userData = JSON.parse(localStorage.getItem("user"));
  // states
  const [grouptoshow, setgrouptoshow] = useState([]);
  const [iduser, setiduser] = useState(null);
  const [message, setmessage] = useState();
  const [alertMessage, setalertMessage] = useState("");
  const [showg, setshowg] = useState(false);
  const [usertosearch, setusertosearch] = useState("");
  const [filter, setfilter] = useState(users);
  const [invitationSent, setinvitationSent] = useState([]);
  const [user, setuser] = useState([]);
  const [usertoshow, setusertoshow] = useState({
    user: {},
  });
  const [show, setshow] = useState(true);
  const [group, setgroup] = useState(false);
  const [groupname, setgroupname] = useState();

  const [newmessage, setnewmessage] = useState(true);
  //

  // send message in a group
  const addmessagetoGroup = async (e, idgroup) => {
    e.preventDefault();
    const data = { idgroup, iduse, message };
    dispatch(addMessageToGroup(data));
    setmessage("");
  };

  // send message
  const sendmessage = async (e, id_receiver) => {
    e.preventDefault();
    const data = { id_receiver, iduse, message };

    dispatch(sendMessage(data));

    setmessage("");
  };
  // // deletemessage
  const deletems = async (e, idmessage) => {
    e.preventDefault();
    dispatch(deleteMessage(idmessage));
  };

  //showuser
  const showUser = async (idus) => {
    const iduser1 = iduse;
    setiduser(idus);
    const iduser2 = idus;
    const userData = users.filter((element) => element._id === idus);
    dispatch(setMessageToViewed(iduser1, iduser2));
    setuser(userData);
    setshow(true);
    setnewmessage(false);
  };

  // send invitation
  const sendinvitation = async (idfriend) => {
    dispatch(sendInvitation(iduse, idfriend));
    setalertMessage("Your invitation has been sent .");
  };
  // addtolistfriends
  const addgroupname = () => {
    setgroup(!group);
  };
  // add new group
  const addgrp = async () => {
    dispatch(addGroup(groupname));
  };
  const hover = (id) => {
    document.getElementById(id).style.visibility = "visible";
  };
  // show group
  const showgroup = (idg) => {
    const gr = groups.filter((e) => e._id === idg);
    setshowg(true);
    setshow(false);
    setgrouptoshow(gr);
  };
  // join group
  const joingroup = async (idgroup) => {
    dispatch(joinGroup(iduse, idgroup));
  };
  // leave group
  const Leavegrp = async (idgroup) => {
    dispatch(leaveGroup(iduse, idgroup));
  };

  useEffect(() => {
    dispatch(getUserMessage());
    dispatch(getGroups());
    dispatch(getGroupsMessages());
    dispatch(getInvitations());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, users]);
  useEffect(() => {
    dispatch(getInvitations());
  }, [invitations]);
  return (
    <div className="homepage">
      <div>
        <Header />
      </div>
      <div className="d-flex col-md-12 ">
        {/* list users  part 1 */}
        <div className="col-md-2  mt-4 listus   shadow">
          <input
            type="text"
            className="form-control m-2 search_input"
            placeholder=" search a user"
            defaultValue=""
            onChange={(event) => setusertosearch(event.target.value)}
          />
          <div className="col mt-4 mb-4 ">
            {users
              .filter((user) => user._id !== iduse)
              .filter((el) =>
                el.username.toUpperCase().includes(usertosearch.toUpperCase())
              )
              .map((ele) => {
                return (
                  <div className="row user " key={ele._id}>
                    {" "}
                    <button
                      className="btn user_btn btn-outline-dark mt-2 "
                      onClick={() => showUser(ele._id)}
                    >
                      <img src={ele.img} alt="" className="userimg avatar" />
                      <BsCircleFill
                        className="m-1  icon"
                        style={{
                          color: ele.actif === true ? "green" : "#e56d00",
                        }}
                        onMouseOver={() =>
                          (document.getElementById(
                            ele.username
                          ).style.visibility = "visible")
                        }
                        onMouseLeave={() =>
                          (document.getElementById(
                            ele.username
                          ).style.visibility = "hidden")
                        }
                      />
                      <div className="name">{ele.username.substr(0, 10)}</div>

                      {newmessage &&
                      usermessages.reduce(
                        (acc, current) =>
                          current.id_sender === ele._id &&
                          current.id_receiver === iduse &&
                          current.vue === false
                            ? (acc = acc + 1)
                            : acc,
                        0
                      ) > 0 ? (
                        <p className="newmessage">
                          {usermessages.reduce(
                            (acc, current) =>
                              current.id_sender === ele._id &&
                              current.id_receiver === iduse &&
                              current.vue === false
                                ? (acc = acc + 1)
                                : acc,
                            0
                          )}
                          new message(s)
                        </p>
                      ) : null}

                      <div
                        className="bg-black text-white mt-3 onlineicon"
                        id={ele.username}
                      >
                        <h6>{ele.actif === true ? "  online" : " offline"}</h6>
                      </div>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        {/* ShowUser part 2  */}
        <div className="col-md-7 m-4 part2 ">
          {show === true ? (
            <div className="userDiscuss">
              {user.map((element) => (
                <>
                  <div
                    className="card col-md-4 mt-2  offset-md-4 bg-light"
                    key={element._id}
                  >
                    <div className="card-header justify-content-center d-flex">
                      {" "}
                      <img alt="" src={element.img} className="avatar" />
                      <h5 style={{ marginLeft: "10px" }}>{element.username}</h5>
                    </div>

                    <div className="card-body text-center ">
                      <div className="">{element.email}</div>
                      {userData.invitations.find(
                        (el) =>
                          el.idfriend === element._id && el.accepted === false
                      ) ? (
                        <label className="form-label">
                          Sent you an invitation
                        </label>
                      ) : element.friendsList.find(
                          (e) => e.idfriend === iduse
                        ) ? (
                        <h6>
                          {" "}
                          Friend <TiTick />
                        </h6>
                      ) : element.invitations.find(
                          (e) => e.idfriend === iduse && e.accepted === false
                        ) ? (
                        <>
                          <label className="form-label">Invitation sent</label>
                        </>
                      ) : (
                        <input
                          type="button"
                          className="btn  add_friend_btn btn-outline-dark mt-1  fw-bold"
                          onClick={() => sendinvitation(element._id)}
                          defaultValue=" Add to Friends List"
                        />
                      )}

                      {/* {invitations.find((e) => e.userid === element._id) ? (
                        invitations
                          .find((e) => e.userid === element._id)
                          .invitations.find(
                            (el) =>
                              el.idfriend === iduse && el.accepted === true
                          ) ? (
                          <h6>
                            {" "}
                            Friend <TiTick />
                          </h6>
                        ) : invitations
                            .find((e) => e.userid === element._id)
                            .invitations.find(
                              (el) =>
                                el.idfriend === iduse && el.accepted === false
                            ) ? (
                          <label className="form-label">Invitation sent</label>
                        ) : (
                          <input
                            type="button"
                            className="btn add_friend_btn btn-outline-dark mt-1 fw-bold"
                            onClick={() => sendinvitation(element._id)}
                            defaultValue=" Add to Friends List"
                          />
                        )
                      ) : invitations
                          .find((e) => e.userid === iduse)
                          .invitations.find(
                            (inv) =>
                              inv.idfriend === element._id && inv.accepted === false
                          ) ? (
                        <>
                          <label className="form-label">
                            Sent you an invitation.
                          </label>
                        </>
                      ) : (
                        <input
                          type="button"
                          className="btn add_friend_btn btn-outline-dark mt-1 fw-bold"
                          onClick={() => sendinvitation(element._id)}
                          defaultValue=" Add to Friends List"
                        />
                      )} */}
                    </div>
                  </div>

                  {/* show messages */}
                  <div className="col message  ">
                    {usermessages &&
                      usermessages.map((el) => {
                        return el.id_receiver === element._id &&
                          el.id_sender === iduse ? (
                          <div className="d-flex">
                            <div
                              className="row m-3  usermessage shadow "
                              onMouseOver={() =>
                                (document.getElementById(
                                  el._id
                                ).style.visibility = "visible")
                              }
                              onMouseLeave={() =>
                                (document.getElementById(
                                  el.msg
                                ).style.visibility = "hidden")
                              }
                              style={{}}
                            >
                              <div className="col">
                                <h5 className="mt-2">{el.message} </h5>
                              </div>
                              <div
                                className=" col-md-3 d-flex"
                                id={el._id}
                                style={{
                                  visibility: "hidden",
                                  marginTop: "10px",
                                }}
                              >
                                <AiFillDelete
                                  className="m-2"
                                  onClick={(e) => deletems(e, el._id)}
                                  style={{ width: "100px" }}
                                />
                              </div>
                            </div>
                            <div className="row mt-3">
                              <p className="p-2">
                                {el.vue === false ? (
                                  <TiTickOutline style={{ fontSize: "20px" }} />
                                ) : (
                                  <TiTick style={{ fontSize: "20px" }} />
                                )}
                              </p>
                            </div>
                          </div>
                        ) : el.id_sender === element._id &&
                          el.id_receiver === iduse ? (
                          <div className="row message2">
                            <div className="col-md-3  text-black">
                              {users
                                .filter((e) => e._id === el.id_sender)
                                .map((el) => {
                                  return (
                                    <h6 className="mt-3 ">{el.username}</h6>
                                  );
                                })}
                            </div>
                            <div className="col  shadow sender_msg ">
                              {" "}
                              <h5 className="mt-2">{el.message}</h5>
                            </div>
                          </div>
                        ) : null;
                      })}
                  </div>
                  {/* send message to friend */}
                  <form onSubmit={(e) => sendmessage(e, element._id)}>
                    <div className="  d-flex send_div">
                      <input
                        id="form"
                        type="text"
                        class="form-control send_input"
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                        name="msg"
                      />
                      <button
                        class="btn send_btn"
                        value="SEND"
                        style={{ marginLeft: "10px" }}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ))}
            </div>
          ) : showg === true && show === false ? (
            // group card description part 3
            <div className="groupDiscuss ">
              {grouptoshow[0].members.find((e) => e.iduser === iduse) ? (
                grouptoshow.map((el) => {
                  return (
                    <div className="col-md-8">
                      <div className="col-md-6  offset-md-4 mt-4">
                        <div className="card">
                          <div className="card-header    text-center fs-4">
                            <h5 className="">
                              {" "}
                              <span className="fw-bold"> {el.name} </span>Group
                            </h5>
                          </div>
                          <div className="card-body  ">
                            <h6>members: </h6>
                            <hr className="dropdown-divider  " />
                            <div className="row members">
                              {el.members.map((member) => {
                                return (
                                  <>
                                    {users
                                      .filter(
                                        (element) =>
                                          element._id === member.iduser
                                      )
                                      .map((user) => {
                                        return (
                                          <div className="col-md-3">
                                            <div>
                                              <img
                                                alt=""
                                                src={user.img}
                                                className="avatar"
                                                onMouseOver={() =>
                                                  (document.getElementById(
                                                    user._id
                                                  ).style.visibility =
                                                    "visible")
                                                }
                                                onMouseLeave={() =>
                                                  (document.getElementById(
                                                    user._id
                                                  ).style.visibility = "hidden")
                                                }
                                              />
                                            </div>
                                            <div
                                              id={user._id}
                                              style={{ visibility: "hidden" }}
                                            >
                                              <p
                                                style={{
                                                  fontSize: "10px",
                                                  fontWeight: "500",
                                                }}
                                              >
                                                {user.username}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  group discussion */}
                      <div className="   message_group  ">
                        {messagesgroups
                          .filter((group) => group.id_group === el._id)
                          .map((el) => {
                            return (
                              <div className="d-flex">
                                <div className="col mb-4">
                                  <>
                                    {users
                                      .filter(
                                        (user) => user._id === el.id_sender
                                      )
                                      .map((element) => {
                                        return (
                                          <div className="row mb-4">
                                            <div className="col-md-2"></div>
                                            {element._id === iduse ? (
                                              <div className="col-md-4">
                                                {" "}
                                                <h6>Vous</h6>
                                              </div>
                                            ) : (
                                              <div className="col-md-4">
                                                {" "}
                                                <h6>{element.username}</h6>
                                              </div>
                                            )}
                                            <div className="row">
                                              <div className="col-md-2">
                                                <img
                                                  alt=""
                                                  src={element.img}
                                                  className="avatar2"
                                                />
                                              </div>
                                              <div className="col-md-8 p-2 shadow groupmsg">
                                                {" "}
                                                <h5>{el.message}</h5>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      {/* send message to group */}
                      <form onSubmit={(e) => addmessagetoGroup(e, el._id)}>
                        <div className=" group_send_div  d-flex">
                          <input
                            id="messsage"
                            type="text"
                            class="form-control"
                            value={message}
                            onChange={(e) => setmessage(e.target.value)}
                            name="msg"
                          />
                          <button
                            class="btn send_btn "
                            value="SEND"
                            style={{ marginLeft: "10px" }}
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  );
                })
              ) : (
                <h4
                  className="text-center m-4 "
                  style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
                >
                  Sorry <CgSmileSad />
                  .....you must join the group to show discussion{" "}
                </h4>
              )}
            </div>
          ) : null}
        </div>
        {/* groups list */}
        <div className="  col-md-2 mt-4  groupList shadow bg-white">
          <h3
            className="text-center m-1"
            style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
          >
            Groups
          </h3>
          <hr style={{ height: "3px", color: "black" }}></hr>
          <div>
            {groups &&
              groups.map((e) => {
                return (
                  <>
                    <div className="d-flex m-2">
                      <button
                        onClick={() => showgroup(e._id)}
                        onMouseOver={() => hover(e.name)}
                        onMouseLeave={() =>
                          (document.getElementById(e.name).style.visibility =
                            "hidden")
                        }
                        className="  btn btn-dark  text-center avatar  border-2"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      >
                        <i
                          className={`fa-solid fa-${e.name
                            .toLowerCase()
                            .slice(0, 1)} `}
                          style={{ fontSize: "25px" }}
                        ></i>
                      </button>
                      <div
                        className="col shadow  p-2 bg-black"
                        id={e.name}
                        style={{
                          width: "60px",
                          height: "40px",
                          visibility: "hidden",
                          borderRadius: "10px",
                        }}
                      >
                        <h6 className="text-white">{e.name.slice(0, 7)}</h6>
                      </div>
                      {e.members.find((user) => user.iduser === iduse) ? (
                        <input
                          type="button"
                          className="join_btn btn-dark text-white mt-1"
                          value="Leave"
                          onClick={() => Leavegrp(e._id)}
                          style={{
                            width: "60px",
                            height: "40px",
                            fontSize: "15px",
                            marginLeft: "15px",
                            visibility: "visible",
                            position: "",
                          }}
                        />
                      ) : (
                        <input
                          type="button"
                          className="join_btn btn-dark text-white mt-1"
                          defaultValue="Join"
                          id={e._id}
                          onClick={() => joingroup(e._id)}
                          style={{
                            width: "60px",
                            height: "40px",
                            fontSize: "15px",
                            marginLeft: "17px",
                            visibility: "visible",
                            position: "",
                          }}
                        />
                      )}
                    </div>
                  </>
                );
              })}
          </div>
          <div
            className="d-flex justify-content-center  "
            style={{ position: "absolute", bottom: "5px" }}
          >
            <button className="add_group_btn   btn-outline-dark border-0">
              {" "}
              <AiOutlinePlusCircle
                onClick={() => addgroupname()}
                style={{
                  width: "20px",
                  height: "50px",
                  color: "green",
                }}
              />
              Add new group
            </button>
          </div>
          {group === true ? (
            <div className="d-flex m-2">
              <input
                className=""
                type="text"
                onChange={(e) => setgroupname(e.target.value)}
                value={groupname}
                id="groupname"
                style={{ width: "70%", border: "2px solid black" }}
                placeholder="add a group name "
              />
              <button
                className="add_btn btn btn-outline-dark"
                onClick={addgrp}
                style={{ marginLeft: "10px", border: "2px solid black" }}
              >
                Add
              </button>
            </div>
          ) : null}
        </div>
        <div className="d-flex justify-content-center ">
          {alertMessage && <Alert message={alertMessage} />}
        </div>
      </div>
    </div>
  );
};

export default Listusers;
