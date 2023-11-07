import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

function Login() {
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const toggleRegister = () => {
    setIsRegisterVisible(!isRegisterVisible);
  };

  return (
    <div className="login-page">
      <div
        className={`login-wrapper ${isRegisterVisible ? "active-form" : ""}`}
      >
        <div
          className={`form-box login ${isRegisterVisible ? "hidden-form" : ""}`}
        >
          <h3>Login</h3>
          <form action="#">
            <div className="input-box">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
              <input type="email" required id="email-login" />
              <label htmlFor="email-login">Email</label>
            </div>
            <div className="input-box">
              <FontAwesomeIcon icon={faLock} size="lg" />
              <input type="password" required id="password-login" />
              <label htmlFor="password-login">Password</label>
            </div>
            <div className="remember-forgot">
              <label htmlFor="checkbox">
                <input type="checkbox" id="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <div className="login-register">
              <p>
                Don't have an account?
                <a href="#" className="register-link" onClick={toggleRegister}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div
          className={`form-box register ${
            isRegisterVisible ? "" : "hidden-form"
          }`}
        >
          <h3>Register</h3>
          <form action="#">
            <div className="input-box">
              <FontAwesomeIcon icon={faUser} size="lg" />
              <input
                type="text"
                required
                id="username"
                autoComplete="Username"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-box">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
              <input type="email" required id="email-register" />
              <label htmlFor="email-register">Email</label>
            </div>
            <div className="input-box">
              <FontAwesomeIcon icon={faLock} size="lg" />
              <input type="password" required id="password-register" />
              <label htmlFor="password-register">Password</label>
            </div>
            <div className="remember-forgot">
              <label htmlFor="checkbox">
                <input type="checkbox" id="terms" />I agree to the terms &
                conditions
              </label>
            </div>
            <button type="submit" className="login-btn">
              Register
            </button>
            <div className="login-register">
              <p>
                Already have an account?
                <a href="#" className="login-link" onClick={toggleRegister}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
