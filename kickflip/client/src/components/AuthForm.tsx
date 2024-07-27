import { Loader2, LockKeyhole, Mail, UserRound } from "lucide-react";
import React, { ComponentType, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthInputField from "./AuthInputField";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const AuthForm = ({ isRegistered }: { isRegistered: boolean }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { name, email, password } = formData;

  const { handleRegister, handleLogin, loginLoading, registerLoading } =
    useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistered) {
      handleLogin({ email, password });
    } else {
      handleRegister({ name, email, password });
    }
  };

  return (
    <div className="items-center flex justify-center bg-transparent border-2 border-solid border-black rounded-[20px] relative w-[550px]">
      <div className="p-10 w-full">
        <h3 className="text-4xl text-center font-semibold">
          {isRegistered ? "Login" : "Signup"}
        </h3>
        <form onSubmit={onSubmit}>
          {!isRegistered && (
            <AuthInputField
              icon={UserRound as ComponentType<{ className: string }>}
              type="text"
              name="name"
              label="Name"
              value={name}
              onChange={handleChange}
            />
          )}
          <AuthInputField
            icon={Mail as ComponentType<{ className: string }>}
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={handleChange}
          />
          <AuthInputField
            icon={LockKeyhole as ComponentType<{ className: string }>}
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={handleChange}
            togglePasswordVisibility={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisible}
          />
          <div className="flex text-[0.9em] font-medium justify-between mt-[-15px] mx-0 mb-[15px]">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" name="terms" className="accent-[#7F1310]" />
              <Label htmlFor="terms">
                {isRegistered ? "Remember me" : "Accept terms and conditions"}
              </Label>
            </div>
            {isRegistered && (
              <a
                href="#"
                className="hover:underline hover:underline-offset-4 text-[#7F1310]"
              >
                Forgot Password?
              </a>
            )}
          </div>
          <Button
            className="w-full bg-[#292929] hover:bg-[#7F1310]"
            disabled={isRegistered ? loginLoading : registerLoading}
          >
            {loginLoading || registerLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : isRegistered ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
          <div className="mt-[25px] mx-0 mb-[10px] text-center text-base font-medium">
            {isRegistered ? (
              <p>
                Don't have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="font-semibold hover:underline hover:underline-offset-4 text-[#7F1310] "
                >
                  Register
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold hover:underline hover:underline-offset-4 text-[#7F1310] no-underline"
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
