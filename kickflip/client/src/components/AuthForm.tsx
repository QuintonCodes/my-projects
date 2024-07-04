import { ComponentType, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import AuthInputField from "./AuthInputField";
import { useUser } from "../context/UserContext";

interface AuthFormProps {
  isRegistered: boolean;
}

const AuthForm = ({ isRegistered }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const { login, register, isLoading } = useUser();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/auth/login");
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
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Remember me</Label>
                </div>
                <a
                  href="#"
                  className="hover:underline hover:underline-offset-4 text-[#7F1310]"
                >
                  Forgot Password?
                </a>
              </div>
              <Button
                className="w-full bg-[#292929] hover:bg-[#7F1310]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
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
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" className="accent-[#7F1310]" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
              </div>

              <Button
                className="w-full bg-[#292929] hover:bg-[#7F1310]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Register"
                )}
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
      </div>
    </div>
  );
};

export default AuthForm;
