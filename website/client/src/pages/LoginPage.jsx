import { useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import AuthCheckAcc from "../components/ui/auth/AuthCheckAcc";
import AuthCheckBox from "../components/ui/auth/AuthCheckBox";
import AuthFormLayout from "../components/ui/auth/AuthFormLayout";
import AuthInputField from "../components/ui/auth/AuthInputField";
import AuthSubmitButton from "../components/ui/auth/AuthSubmitButton";
import { useAuthSubmit } from "../hooks/useAuthSubmit";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authSubmit = useAuthSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();
    authSubmit(email, password, true);
  };

  return (
    <AuthFormLayout title="Login">
      <form onSubmit={handleSubmit}>
        <AuthInputField
          icon={EnvelopeIcon}
          type="email"
          id="email-login"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInputField
          icon={LockClosedIcon}
          type="password"
          id="password-login"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthCheckBox text="Remember me" forgotPassword={true} />
        <AuthSubmitButton text="Login" />
        <AuthCheckAcc
          check="Don`t have an account?"
          link="/register"
          text="Register"
        />
      </form>
    </AuthFormLayout>
  );
};

export default LoginPage;
