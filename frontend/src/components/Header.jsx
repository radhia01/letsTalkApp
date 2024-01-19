import React from "react";
import { useEffect } from "react";
import { FcInvite } from "react-icons/fc";
import { BsCircleFill } from "react-icons/bs";
import { BsFillCollectionFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers, acceptInvit, acceptInvit2 } from "../redux/actions/user";
const Header = (props) => {
  const iduse =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"))._id;
  // hooks
  const dispatch = useDispatch();
  const { users, success } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // get userid
  const user_id =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"))._id;
  // useHistory
  const history = useHistory();

  // states
  const [invitation, setinvitation] = useState(false);
  // functions
  const gotoprofile = () => {
    history.push(`/profile`);
  };
  const showinvitation = () => {
    setinvitation(!invitation);
  };

  const addfriend = async (idfriend) => {
    dispatch(acceptInvit(iduse, idfriend));
    if (success) {
      gotoprofile();
    }
  };

  return (
    <div className="header">
      <div
        className="col-md-12 bg-black d-flex p-2"
        style={{ position: "relative" }}
      >
        {users &&
          users
            .filter((ele) => ele._id === user_id)
            .map((e) => (
              <>
                <div key={e._id} className="col-md-5">
                  <h3
                    className="   text-white fs-1 "
                    style={{
                      fontFamily: "Lobster Two, cursive",
                    }}
                  >
                    Talk APP{" "}
                    <img
                      alt=""
                      src="https://icon-library.com/images/white-chat-icon/white-chat-icon-16.jpg"
                      style={{ width: "80px", height: "70px" }}
                    />
                  </h3>
                </div>
                <div className="d-flex   userpart  ">
                  <div
                    className=" col"
                    style={{ position: "relative", zIndex: "5" }}
                  >
                    {e.invitations
                      .filter((e) => e.accepted === false)
                      .reduce(
                        (acc, current) => (current.idfriend ? acc + 1 : acc),
                        0
                      ) !== 0 ? (
                      <button
                        className=" btn text-danger fw-bold  invitations"
                        onClick={() => showinvitation()}
                      >
                        <FcInvite />
                        {e.invitations
                          .filter((inv) => inv.accepted === false)
                          .reduce(
                            (acc, current) =>
                              current.idfriend ? acc + 1 : acc,
                            0
                          )}{" "}
                        new invitation(s)
                      </button>
                    ) : null}
                    <div
                      className="  bg-white mt-2 shadow  "
                      id="invitations"
                      style={{ position: "absolute", zIndex: "10" }}
                    >
                      {invitation &&
                        e.invitations.map((user) => {
                          return (
                            <div key={user.id} style={{ width: "200px" }}>
                              {users
                                .filter(
                                  (element) => element._id === user.idfriend
                                )
                                .map((friend) => {
                                  return (
                                    <div className="d-flex" key={friend._id}>
                                      {user.accepted === false ? (
                                        <>
                                          <img
                                            alt=""
                                            src={friend.img}
                                            className="avatar m-2"
                                          ></img>
                                          <p
                                            className="mt-3 fw-bold"
                                            style={{ fontSize: "10px" }}
                                          >
                                            {friend.username}
                                          </p>
                                          <button
                                            className="btn btn-primary m-2 confirm"
                                            onClick={() =>
                                              addfriend(friend._id)
                                            }
                                          >
                                            Confirm
                                          </button>
                                        </>
                                      ) : null}
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="d-flex m-1 ">
                    <img src={e.img} className="avatar  " alt="" />
                    <h6 className="fw-bold username m-1">
                      {e.username} <BsCircleFill style={{ color: "green" }} />{" "}
                    </h6>
                  </div>
                  <div
                    className=" text-success  mt-2"
                    style={{ visibility: "visible" }}
                  >
                    <h6>Online</h6>
                  </div>
                  <BsFillCollectionFill
                    className="profileicon"
                    onClick={() => gotoprofile()}
                  />
                </div>
              </>
            ))}
      </div>
    </div>
  );
};

export default Header;
