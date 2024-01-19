import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/actions/user";
const Singin = () => {
  const history = useHistory();
  const { success } = useSelector((state) => state.user);
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const dispatch = useDispatch();
  // functions
  const handleChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signin(user));
  };
  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success]);
  return (
    <div className="register">
      {" "}
      <div className="col-md-12 bg-black text-white header fs-1">Talk App</div>
      <div className="col-md-6  offset-md-3 shadow  signin">
        <div className="row d-flex  text-center  p-3">
          <h3>SIGN IN</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control m-3"
            style={{ width: "80%" }}
            name="username"
            onChange={handleChange}
            id="username"
            placeholder="Please enter your username"
            required
          />
          <input
            type="text"
            className="form-control m-3"
            style={{ width: "80%" }}
            name="email"
            onChange={handleChange}
            id="email"
            placeholder="Please enter your email"
            required
          />
          <input
            type="text"
            className="form-control m-3"
            style={{ width: "80%" }}
            name="phone"
            onChange={handleChange}
            id="phone"
            placeholder="Please enter your phone number"
            required
          />
          <input
            type="password"
            className="form-control m-3"
            style={{ width: "80%" }}
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Please enter your password"
            required
          />
          <div
            className="d-flex justify-content-start "
            style={{ marginBottom: "20px" }}
          >
            <div className="d-flex  justify-content-start  m-3">
              <button className="btn add_btn" type="submit" style={{}}>
                SIGN IN
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Singin;
