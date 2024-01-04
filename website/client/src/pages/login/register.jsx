import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import "./login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      })
      .then((result) => {
        console.log(result), navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="items-center flex justify-center">
      <div className="items-center flex justify-center bg-transparent border-2 border-solid border-black rounded-[20px] h-[600px] relative w-[550px]">
        <div className="p-10 w-full">
          <h3 className="text-[2em] text-center font-semibold">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-box border-b-2 border-solid border-black h-[60px] my-[30px] mx-0 relative w-full">
              <UserIcon className="h-6 w-6 absolute right-2 top-1/4 leading-[67px]" />
              <input
                type="text"
                required
                id="name"
                autoComplete="Name"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="bg-transparent border-none text-[1.2em] font-semibold h-full outline-none p-[10px] w-full"
              />
              <label
                htmlFor="name"
                className="text-[1.2em] font-medium left-[5px] py-0 px-[5px] pointer-events-none absolute top-1/2 -translate-y-1/2 duration-500"
              >
                Username
              </label>
            </div>
            <div className="input-box border-b-2 border-solid border-black h-[60px] my-[30px] mx-0 relative w-full">
              <EnvelopeIcon className="h-6 w-6 absolute right-2 top-1/4 leading-[67px]" />
              <input
                type="email"
                required
                id="email-register"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-transparent border-none text-[1.2em] font-semibold h-full outline-none p-[10px] w-full"
              />
              <label
                htmlFor="email-register"
                className="text-[1.2em] font-medium left-[5px] py-0 px-[5px] pointer-events-none absolute top-1/2 -translate-y-1/2 duration-500"
              >
                Email
              </label>
            </div>
            <div className="input-box border-b-2 border-solid border-black h-[60px] my-[30px] mx-0 relative w-full">
              <LockClosedIcon className="h-6 w-6 absolute right-2 top-1/4 leading-[67px]" />
              <input
                type="password"
                required
                id="password-register"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-transparent border-none text-[1.2em] font-semibold h-full outline-none p-[10px] w-full"
              />
              <label
                htmlFor="password-register"
                className="text-[1.2em] font-medium left-[5px] py-0 px-[5px] pointer-events-none absolute top-1/2 -translate-y-1/2 duration-500"
              >
                Password
              </label>
            </div>
            <div className="flex text-[0.9em] font-medium justify-between mt-[-15px] mx-0 mb-[15px]">
              <label htmlFor="checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  className="accent-black mr-[3px]"
                />
                I agree to the terms & conditions
              </label>
            </div>
            <button
              type="submit"
              className="text-base font-medium bg-[#282828] border-none rounded-md text-white cursor-pointer h-[45px] outline-none w-full hover:bg-[#1f1f1f]"
            >
              Register
            </button>
            <div className="mt-[25px] mx-0 mb-[10px] text-center text-base font-medium">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold hover:underline text-[#545484] no-underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
