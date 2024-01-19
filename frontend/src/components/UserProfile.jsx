import React from "react";
import { TiDelete } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import EditProfile from "./EditProfile";
import EditPicture from "./EditPicture";

import { useHistory } from "react-router-dom";
import Editpass from "./Editpass";
import { useEffect } from "react";
import { getUsers, logout } from "../redux/actions/user";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { deletefriend, deleteAccount, resetError } from "../redux/actions/user";

const Userprofile = () => {
  const iduser =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"))._id;
  const { users, error, removeAccount } = useSelector((state) => state.user);
  const user = users.find((el) => el._id === iduser);
  // const user =
  //   localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  //  useHistory
  const history = useHistory();
  //  states

  const [show, setshow] = useState(false);
  const [editpic, seteditpic] = useState(false);
  const [idfriend, setidfriend] = useState(null);
  const [editpassword, seteditpassword] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [deteleacc, setdeleteacc] = useState(false);
  const [password, setpassword] = useState();

  // functions
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch, password]);
  useEffect(() => {}, [user]);

  const Edit = () => {
    setshow(!show);
    seteditpassword(false);
  };
  const Editpicture = () => {
    seteditpic(!editpic);
  };
  const removefriendfromlist = async (id) => {
    setconfirmDelete(true);
    setidfriend(id);
  };
  const deleteUser = () => {
    dispatch(deletefriend(idfriend, iduser));
    setconfirmDelete(false);
  };
  const closeModal = () => {
    history.push("/");
  };

  const EditPassword = () => {
    seteditpassword(true);
    setshow(false);
    setdeleteacc(false);
  };
  const SignOut = () => {
    dispatch(logout());
    history.push("/");
  };
  const deleteaccount = async (e) => {
    e.preventDefault();
    const id = user._id;
    dispatch(deleteAccount(password, id));
  };
  const deleteacc = () => {
    setdeleteacc(true);
    seteditpassword(false);
    setshow(false);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, users]);
  const updatePassword = (e) => {
    setpassword(e.target.value);
  };
  useEffect(() => {
    if (removeAccount) {
      alert("hey");
      history.push("/register");
    }
  }, [removeAccount]);

  // useEffect(() => {
  //   setuser(JSON.parse(localStorage.getItem("user")));
  // }, [user]);
  const closeDeleteModal = () => {
    setconfirmDelete(false);
  };

  return (
    <div className="d-flex  profile  bg-white">
      <div className="close">
        <button className=" btn close_btn" onClick={closeModal}>
          close
        </button>
      </div>
      <div className="col-md-4   " style={{ marginTop: "50px" }}>
        {editpic && <EditPicture id={iduser} />}
      </div>
      <div className=" col-md-4 ">
        <div className=" card   m-5 shadow  ">
          <h5 className="text-center">My Account</h5>
          <div
            className="card-header text-center"
            style={{ backgroundColor: "#FF64FF" }}
          >
            <img src={user.img} alt=" userimage" className="useravatar" />
            <h5>{user.username}</h5>
            <button
              className="btn btn-outline-dark fw-bold"
              onClick={() => Editpicture()}
              style={{
                marginLeft: "10px",
                fontSize: "10px",
                height: "40px",
              }}
            >
              <AiFillEdit />
              Edit Profile Picture
            </button>
          </div>
          <div className="card-body " style={{ backgroundColor: "#F2F2F2" }}>
            <div className="d-flex">
              <h6>Email :{user.email}</h6>
            </div>
            <hr className="dropdown-divider" />
            <h6>Friends List</h6>
            <div>
              <div className="row">
                {user &&
                  user.friendsList.map((element) => {
                    return (
                      <>
                        {users &&
                          users
                            .filter((ele) => ele._id === element.idfriend)
                            .map((user) => {
                              return (
                                <>
                                  <div
                                    className="col-md-11 m-1 d-flex  shadow friend"
                                    key={user.id}
                                  >
                                    <div className="col-md-3 m-2">
                                      <button
                                        className="btn btn-outline-dark  "
                                        style={{ border: "none" }}
                                      >
                                        {" "}
                                        <img
                                          alt="user img"
                                          src={user.img}
                                          className="avatar2"
                                        />
                                      </button>
                                    </div>
                                    <div className="col-md-5 mt-4 ">
                                      <h6
                                        id={user.username}
                                        style={{
                                          fontSize: "15px",
                                          visibility: "visible",
                                        }}
                                      >
                                        {user.username}
                                      </h6>
                                    </div>
                                    <button className=" btn remove_btn  mt-4">
                                      <TiDelete
                                        className="delete_icon"
                                        style={{}}
                                        onClick={() =>
                                          removefriendfromlist(user._id)
                                        }
                                      />
                                    </button>
                                  </div>
                                </>
                              );
                            })}
                      </>
                    );
                  })}
              </div>
            </div>

            <hr className="dropdown-divider" />
            <div className="d-flex m-4">
              <button
                className="btn btn-outline-dark fw-bold"
                onClick={() => Edit()}
                style={{
                  marginLeft: "10px",
                  fontSize: "10px",
                  height: "40px",
                }}
              >
                <AiFillEdit />
                Edit Profile Info
              </button>
              <button
                className="btn btn-outline-dark fw-bold"
                onClick={() => EditPassword()}
                style={{
                  marginLeft: "10px",
                  fontSize: "10px",
                  height: "40px",
                }}
              >
                <AiFillEdit />
                Edit Password
              </button>
            </div>

            <hr className="dropdown-divider" />
            {users
              .filter((user) => user._id === iduser)
              .map((el) => {
                return (
                  <>
                    <button
                      className=" btn  btn_signout  d-flex justify-content-center"
                      style={{
                        backgroundColor: "#FF64FF",
                      }}
                      onClick={SignOut}
                    >
                      SignOut
                    </button>
                    <button
                      className="btn  delete_btn d-flex  mt-2 justify-content-center"
                      onClick={deleteacc}
                    >
                      Delete Account
                    </button>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <div className="col-md-4" style={{ marginTop: "50px" }}>
        {show === true ? (
          <EditProfile id={iduser} />
        ) : editpassword === true ? (
          <Editpass id={iduser} />
        ) : deteleacc === true ? (
          <div className="shadow bg-white p-2">
            <h5 className="text-center">Delete your account </h5>
            <form onSubmit={deleteaccount}>
              <input
                className="form-control m-2"
                type="password"
                placeholder="enter your password"
                style={{ width: "300px" }}
                onChange={updatePassword}
              />
              <input
                type="submit"
                className="btn btn_send m-2"
                style={{ width: "300px" }}
                value="Send"
              ></input>{" "}
            </form>
            <label
              id="errorpassword"
              style={{ marginLeft: "50px", visibility: "hidden" }}
            >
              Last password is incorrect
            </label>
          </div>
        ) : null}
        {error && <Error message={error} />}
        {confirmDelete && (
          <div className="card confirm_updated">
            <div className="card-header">
              You will delete this user from your friend's List
            </div>
            <div className="card-body d-flex justify-content-center">
              <button className="btn confirm_btn" onClick={deleteUser}>
                Confirm
              </button>
              <button className="btn cancel_btn" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
