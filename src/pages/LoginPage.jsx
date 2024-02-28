import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import axiosConfig from "../utils/axiosConfig";
import "./LoginPage.css";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosConfig.post("/login", formData);
      if (response.status == 200) {
        sessionStorage.setItem("access_token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <div className="main">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                name="user"
                value="student"
                onChange={(e) => dispatch(setUser(e.target.value))}
              />
              <label>Student</label>
            </div>
            <div>
              <input
                type="radio"
                name="user"
                value="tutor"
                onChange={(e) => dispatch(setUser(e.target.value))}
              />
              <label>Tutor</label>
            </div>
            <div>
              <input
                type="radio"
                name="user"
                value="admin"
                onChange={(e) => dispatch(setUser(e.target.value))}
              />
              <label>Admin</label>
            </div>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="User ID"
              name="id"
              value={formData.id}
              onChange={onChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forget password?</a>
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account?<a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
