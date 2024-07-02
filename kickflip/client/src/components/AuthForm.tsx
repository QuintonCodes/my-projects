import { ComponentType, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInputField from "./AuthInputField";
import { Button } from "./ui/button";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { registerUser } from "../utils/api";
import Message from "./Message";
import { useUser } from "../context/UserContext";

interface AuthFormProps {
  isRegistered: boolean;
}

const AuthForm = ({ isRegistered }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const { login } = useUser();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      setShowMessage(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="items-center flex justify-center bg-transparent border-2 border-solid border-black rounded-[20px] relative w-[550px]">
      <div className="p-10 w-full">
        <h3 className="text-4xl text-center font-semibold">
          {isRegistered ? "Login" : "Signup"}
        </h3>
        <form onSubmit={isRegistered ? handleLogin : handleRegister}>
          {isRegistered ? (
            <>
              <AuthInputField
                icon={Mail as ComponentType<{ className: string }>}
                type="email"
                id="email-register"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AuthInputField
                icon={LockKeyhole as ComponentType<{ className: string }>}
                type="password"
                id="password-register"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                togglePasswordVisibility={togglePasswordVisibility}
                isPasswordVisible={isPasswordVisible}
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
                    to="/auth/signup"
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <AuthInputField
                icon={Mail as ComponentType<{ className: string }>}
                type="email"
                id="email-register"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AuthInputField
                icon={LockKeyhole as ComponentType<{ className: string }>}
                type="password"
                id="password-register"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                togglePasswordVisibility={togglePasswordVisibility}
                isPasswordVisible={isPasswordVisible}
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
                    to="/auth/login"
                    className="font-semibold hover:underline hover:underline-offset-4 text-[#7F1310] no-underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
        {showMessage && (
          <Message
            title="Registration Successful"
            description="You have successfully registered. Please log in."
            cancelButton={false}
            location="/auth/login"
            actionText="Go to Login"
            onClose={() => setShowMessage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
