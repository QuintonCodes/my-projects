import { ComponentType } from "react";
import { Link } from "react-router-dom";
import AuthInputField from "./AuthInputField";
import { Button } from "./ui/button";
import { LockKeyhole, Mail, UserRound } from "lucide-react";

interface AuthFormProps {
  isRegistered: boolean;
}

const AuthForm = ({ isRegistered }: AuthFormProps) => {
  return (
    <div className="items-center flex justify-center bg-transparent border-2 border-solid border-black rounded-[20px] relative w-[550px]">
      <div className="p-10 w-full">
        <h3 className="text-4xl text-center font-semibold">
          {isRegistered ? "Login" : "Signup"}
        </h3>
        <form action="">
          {isRegistered ? (
            <>
              <AuthInputField
                icon={Mail as ComponentType<{ className: string }>}
                type="email"
                id="email-register"
                label="Email"
              />
              <AuthInputField
                icon={LockKeyhole as ComponentType<{ className: string }>}
                type="password"
                id="password-register"
                label="Password"
              />
              <div className="flex text-[0.9em] font-medium justify-between mt-[-15px] mx-0 mb-[15px]">
                <label htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    className="accent-[#7F1310] mr-[6px]"
                  />
                  Remember me
                </label>

                <a
                  href="#"
                  className="hover:underline hover:underline-offset-4 text-[#7F1310]"
                >
                  Forgot Password?
                </a>
              </div>
              <Button className="w-full bg-[#292929] hover:bg-[#7F1310]">
                Login
              </Button>
              <div className="mt-[25px] mx-0 mb-[10px] text-center text-base font-medium">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold hover:underline hover:underline-offset-4 text-[#7F1310] "
                  >
                    Register
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <AuthInputField
                icon={UserRound as ComponentType<{ className: string }>}
                type="text"
                id="username"
                label="Username"
              />
              <AuthInputField
                icon={Mail as ComponentType<{ className: string }>}
                type="email"
                id="email-register"
                label="Email"
              />
              <AuthInputField
                icon={LockKeyhole as ComponentType<{ className: string }>}
                type="password"
                id="password-register"
                label="Password"
              />
              <div className="flex text-[0.9em] font-medium justify-between mt-[-15px] mx-0 mb-[15px]">
                <label htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    className="accent-[#7F1310] mr-[6px]"
                  />
                  I agree to the terms & conditions
                </label>
              </div>
              <Button className="w-full bg-[#292929] hover:bg-[#7F1310]">
                Register
              </Button>
              <div className="mt-[25px] mx-0 mb-[10px] text-center text-base font-medium">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold hover:underline hover:underline-offset-4 text-[#7F1310] no-underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
