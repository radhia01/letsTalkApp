import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Error from "./Error";
import Success from "./Success";
import {
  resetError,
  resetMessage,
  updatePassword,
  getUsers,
} from "../redux/actions/user";
const Editpass = () => {
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const { error, message } = useSelector((state) => state.user);

  //  Hooks
  const [show, setshow] = useState(true);
  const [password, setpassword] = useState();
  const [lastpassword, setlastpassword] = useState();
  const dispatch = useDispatch();
  //  functions
  const reset = () => {
    setshow(false);
  };
  useEffect(() => {
    dispatch(resetMessage());
    dispatch(resetError());
    dispatch(getUsers());
  }, []);

  const update = async (e) => {
    e.preventDefault();
    dispatch(updatePassword(userid, password, lastpassword));
  };
  // useEffect

  return (
    <div className="editpassword">
      {show === true ? (
        <div className="shadow" style={{ backgroundColor: "#BFBFBF" }}>
          <h4
            className="text-center m-4"
            style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
          >
            Edit Password
          </h4>

          <form onSubmit={(e) => update(e)}>
            <div
              className="d-flex"
              style={{ marginTop: "15px", marginLeft: "15px" }}
            >
              <label
                style={{
                  fontFamily: "Lobster Two, cursive",
                  color: "black",
                }}
              >
                Last Password{" "}
              </label>
              <input
                type="password"
                id="lastpass"
                onChange={(e) => setlastpassword(e.target.value)}
                className="form-control"
                style={{ width: "60%", marginLeft: "44px" }}
              />
            </div>
            <div
              className="d-flex"
              style={{ marginTop: "15px", marginLeft: "15px" }}
            >
              <label
                style={{
                  fontFamily: "Lobster Two, cursive",
                  color: "black",
                }}
              >
                New Password{" "}
              </label>
              <input
                type="password"
                id="ps"
                className="form-control"
                onChange={(e) => setpassword(e.target.value)}
                style={{ width: "60%", marginLeft: "40px" }}
              />
            </div>
            <div
              className="text-danger "
              id="errorpassword"
              style={{ marginLeft: "150px", visibility: "hidden" }}
            >
              {" "}
              <label id="errorpassword">Last password is incorrect</label>
            </div>
            <div className="d-flex " style={{ marginLeft: "140px" }}>
              <button type="submit" className="btn  save_btn m-2">
                Save Changes
              </button>
              <button className="btn  save_btn  m-2" onClick={() => reset()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
      {error && <Error message={error} />}
      {message && <Success message={message} />}
    </div>
  );
};

export default Editpass;
