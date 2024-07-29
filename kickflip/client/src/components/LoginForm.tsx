import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ComponentType, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import useAuth from "../hooks/useAuth";
import { ILogin } from "../utils/models";
import AuthInputField from "./AuthInputField";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const schema = object({
  email: string().required("Email is required").email("Invalid email format"),
  password: string()
    .required("Password is required")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Invalid password format"
    ),
});

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { handleLogin, loginLoading } = useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: ILogin) => {
    handleLogin({ email: data.email, password: data.password });
  };

  return (
    <div className="items-center flex justify-center bg-transparent border-2 border-solid border-black rounded-[20px] relative w-[550px]">
      <div className="p-10 w-full">
        <h3 className="text-4xl text-center font-semibold">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <AuthInputField
                {...field}
                icon={Mail as ComponentType<{ className: string }>}
                type="email"
                label="Email"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <AuthInputField
                {...field}
                icon={LockKeyhole as ComponentType<{ className: string }>}
                type="password"
                label="Password"
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
                error={errors.password?.message}
              />
            )}
          />
          <div className="flex text-[0.9em] font-medium justify-between mt-[-15px] mx-0 mb-[15px]">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" name="terms" className="accent-[#7F1310]" />
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
            disabled={loginLoading}
          >
            {loginLoading ? (
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
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
