import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { ComponentType, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import useAuth from "../hooks/useAuth";
import AuthInputField from "./InputField";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const getSchema = (isRegistered: boolean) =>
  object({
    name: isRegistered
      ? string()
      : string()
          .required("Name is required")
          .matches(/^[A-Z][a-zA-Z]{0,19}$/, "Invalid name format"),
    email: string().required("Email is required").email("Invalid email format"),
    password: string()
      .required("Password is required")
      .matches(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        "Invalid password format"
      ),
  });

const AuthForm = ({ isRegistered }: { isRegistered: boolean }) => {
  const schema = getSchema(isRegistered);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { handleRegister, handleLogin, loginLoading, registerLoading } =
    useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: {
    name?: string;
    email: string;
    password: string;
  }) => {
    if (isRegistered) {
      handleLogin({ email: data.email, password: data.password });
    } else {
      handleRegister({
        name: data.name as string,
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <div className="items-center flex justify-center bg-transparent border-2 border-solid border-black rounded-[20px] relative w-[550px]">
      <div className="p-10 w-full">
        <h3 className="text-4xl text-center font-semibold">
          {isRegistered ? "Login" : "Signup"}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isRegistered && (
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <AuthInputField
                  {...field}
                  icon={UserRound as ComponentType<{ className: string }>}
                  type="text"
                  label="Name"
                  isValid={!errors.name}
                  error={errors.name?.message}
                  value={field.value || ""}
                />
              )}
            />
          )}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <AuthInputField
                {...field}
                icon={Mail as ComponentType<{ className: string }>}
                type="email"
                label="Email"
                isValid={!errors.email}
                error={errors.email?.message}
                value={field.value || ""}
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
                isValid={!errors.password}
                error={errors.password?.message}
                value={field.value || ""}
              />
            )}
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
