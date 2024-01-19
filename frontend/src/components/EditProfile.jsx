import React from "react";
import { useState } from "react";
import { editProfile } from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Reset_message, resetError } from "../redux/actions/user";
import Error from "./Error";
import Success from "./Success";
const Editprofile = () => {
  const iduse = JSON.parse(localStorage.getItem("user"))._id;
  const { error, message } = useSelector((state) => state.user);
  // states
  const [show, setshow] = useState(true);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const dispatch = useDispatch();
  // functions

  const reset = () => {
    setshow(false);
  };
  useEffect(() => {
    dispatch(resetError());
    dispatch(Reset_message());
  }, []);
  const update = async (e) => {
    e.preventDefault();
    dispatch(editProfile(iduse, username, email, phone));
  };

  return (
    <div className="editprofile">
      {show === true ? (
        <div className=" shadow card ">
          <h4
            className="text-center m-4"
            style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
          >
            Edit Informations
          </h4>

          <form onSubmit={(e) => update(e)}>
            <div
              className="d-flex"
              style={{ marginTop: "15px", marginLeft: "10px" }}
            >
              <label
                style={{
                  fontFamily: "Lobster Two, cursive",
                  color: "black",
                }}
              >
                Username{" "}
              </label>
              <input
                id="username"
                type="text"
                defaultValue={user.username}
                onChange={(e) => setusername(e.target.value)}
                className="form-control "
                style={{ width: "60%", marginLeft: "10px" }}
              />
            </div>
            <div
              className="d-flex"
              style={{ marginTop: "15px", marginLeft: "10px" }}
            >
              <label
                style={{
                  fontFamily: "Lobster Two, cursive",
                  color: "black",
                }}
              >
                Email{" "}
              </label>
              <input
                type="text"
                id="email"
                defaultValue={user.email}
                onChange={(e) => setemail(e.target.value)}
                className="form-control "
                style={{ width: "60%", marginLeft: "40px" }}
              />
            </div>
            <div
              className="d-flex"
              style={{ marginTop: "15px", marginLeft: "10px" }}
            >
              <label
                style={{
                  fontFamily: "Lobster Two, cursive",
                  color: "black",
                }}
              >
                Phone{" "}
              </label>
              <input
                type="text"
                id="phone"
                defaultValue={user.phone}
                onChange={(e) => setphone(e.target.value)}
                className="form-control "
                style={{ width: "60%", marginLeft: "34px" }}
              />
            </div>
            <div
              className="d-flex"
              style={{ marginLeft: "75px", marginTop: "10px" }}
            >
              <button
                className="btn save_btn m-2"
                type="submit"
                style={{
                  backgroundColor: "#FF64FF",
                  fontFamily: "Lobster Two, cursive",
                }}
              >
                Save Changes
              </button>
              <button
                className="btn save_btn  m-2"
                style={{
                  backgroundColor: "#FF64FF",
                  fontFamily: "Lobster Two, cursive",
                }}
                onClick={() => reset()}
              >
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

export default Editprofile;
