import { ComponentType, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";
import AuthInputField from "./AuthInputField";
import { login, register, reset } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

interface AuthFormProps {
  isRegistered: boolean;
}

const AuthForm = ({ isRegistered }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { name, email, password } = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: message,
        duration: 3000,
      });
    }

    if (isSuccess) {
      if (user) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
          duration: 3000,
        });
        navigate("/");
      } else {
        toast({
          title: "Registration Successful",
          description: "You have successfully registered! Please log in.",
          duration: 3000,
        });
        navigate("/auth/login");
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
                  <Checkbox id="terms" name="terms" />
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
                name="name"
                label="Name"
                value={name}
                onChange={handleChange}
              />
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
                  <Checkbox
                    id="terms"
                    name="terms"
                    className="accent-[#7F1310]"
                  />
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
