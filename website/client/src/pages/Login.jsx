import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="items-center flex justify-center my-20">
      <div className="items-center flex justify-center bg-transparent border-2 border-solid border-black rounded-[20px] h-[520px] relative w-[550px]">
        <div className="p-10 w-full">
          <h3 className="text-[2em] text-center font-semibold">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-box border-b-2 border-solid border-black h-[60px] my-[30px] mx-0 relative w-full">
              <EnvelopeIcon className="h-6 w-6 absolute right-2 top-1/4 leading-[67px]" />
              <input
                type="email"
                required
                id="email-login"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-transparent border-none text-base font-normal h-full outline-none p-[10px] w-full"
              />
              <label
                htmlFor="email-login"
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
                id="password-login"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-transparent border-none text-base font-normal h-full outline-none p-[10px] w-full"
              />
              <label
                htmlFor="password-login"
                className="text-[1.2em] font-medium left-[5px] py-0 px-[5px] pointer-events-none absolute top-1/2 -translate-y-1/2 duration-500"
              >
                Password
              </label>
            </div>
            <div className="flex text-[0.9em] font-medium justify-between mt-[-15px] mx-0 mb-[15px]">
              <label htmlFor="checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="accent-black mr-[3px]"
                />
                Remember me
              </label>
              <a
                href="#"
                className="hover:underline text-[#545484] no-underline"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="text-base font-medium bg-[#282828] border-none rounded-md text-white cursor-pointer h-[45px] outline-none w-full hover:bg-[#1f1f1f]"
            >
              Login
            </button>
            <div className="mt-[25px] mx-0 mb-[10px] text-center">
              <p>
                Don`t have an account?{" "}
                <Link
                  to="/register"
                  className="text-base font-semibold hover:underline text-[#545484] no-underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
