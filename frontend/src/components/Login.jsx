import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./style.css";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { login, Reset_message, resetError } from "../redux/actions/user";

const Login = () => {
  const { error, user } = useSelector((state) => state.user);
  console.log(error);
  // states
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const history = useHistory();
  // const userData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  // login
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Reset_message());
    dispatch(login(email, password));
  };
  // sign in
  const SignIn = () => {
    history.push("/register");
  };
  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [user]);
  useEffect(() => {
    dispatch(resetError());
  }, [ email, password]);
  return (
    <div className="login">
      <div
        className="col-md-12 bg-black text-white  fs-1 header"
        style={{
          fontFamily: "Lobster Two, cursive",
        }}
      >
        {" "}
        Talk APP{" "}
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-md-5 shadow  signin ">
          <div className="d-flex justify-content-center mt-3">
            <h3 className="text-black ">Login</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form m-4">
              <div className=" form-group ">
                <label className="label-control    m-2">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Please enter your email"
                  className="form-control"
                  required
                />
              </div>
              <div className=" form-group ">
                <label className="label-control   m-2">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Please enter your password"
                  className="form-control"
                  required
                />
              </div>
              <div className=" d-flex justify-content-center">
                <button className="btn add_btn " type="submit">
                  Submit
                </button>
              </div>
              <div
                className="alert alert-danger text-danger mt-2 text-center "
                id="alertmessage"
                style={{ visibility: "hidden" }}
                role="alert"
              >
                password or username is incorrect
              </div>
            </div>
          </form>
          {/* sign in */}
          <div className=" d-flex  justify-content-center">
            <button className=" btn  link_btn " onClick={SignIn}>
              {" "}
              Don't have an account ?
            </button>
          </div>
          <div className="d-flex justify-content-center m-2">
            {error && <Error message={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
