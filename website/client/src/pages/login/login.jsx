import { useState } from "react";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import "./login.css";

function Login() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleRegister = () => {
    setIsRegistered(!isRegistered);
  };

  async function submit(e) {
    e.preventDefault();

    try {
      if (isRegistered) {
        await axios.post("http://localhost:3000/api/auth/login", {
          email,
          password,
        });
      } else {
        await axios.post("http://localhost:3000/api/auth/register", {
          username,
          email,
          password,
        });
        setIsRegistered(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login-page">
      <div className={`login-wrapper ${isRegistered ? "active-form" : ""}`}>
        <div className={`form-box login ${isRegistered ? "hidden-form" : ""}`}>
          <h3>Login</h3>
          <form action="POST">
            <div className="input-box">
              <EnvelopeIcon className="h-6 w-6" />
              <input
                type="email"
                required
                id="email-login"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="email-login">Email</label>
            </div>
            <div className="input-box">
              <LockClosedIcon className="h-6 w-6" />
              <input
                type="password"
                required
                id="password-login"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="password-login">Password</label>
            </div>
            <div className="remember-forgot">
              <label htmlFor="checkbox">
                <input type="checkbox" id="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn" onClick={submit}>
              Login
            </button>
            <div className="login-register">
              <p>
                Don`t have an account?{" "}
                <a href="#" className="register-link" onClick={toggleRegister}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div
          className={`form-box register ${isRegistered ? "" : "hidden-form"}`}
        >
          <h3>Register</h3>
          <form action="#">
            <div className="input-box">
              <UserIcon className="h-6 w-6" />
              <input
                type="text"
                required
                id="username"
                autoComplete="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-box">
              <EnvelopeIcon className="h-6 w-6" />
              <input
                type="email"
                required
                id="email-register"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="email-register">Email</label>
            </div>
            <div className="input-box">
              <LockClosedIcon className="h-6 w-6" />
              <input
                type="password"
                required
                id="password-register"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="password-register">Password</label>
            </div>
            <div className="remember-forgot">
              <label htmlFor="checkbox">
                <input type="checkbox" id="terms" />I agree to the terms &
                conditions
              </label>
            </div>
            <button type="submit" className="login-btn" onClick={submit}>
              Register
            </button>
            <div className="login-register">
              <p>
                Already have an account?{" "}
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
