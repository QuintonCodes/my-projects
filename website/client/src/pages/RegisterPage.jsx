import { useState } from "react";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import AuthCheckAcc from "../components/ui/auth/AuthCheckAcc";
import AuthCheckBox from "../components/ui/auth/AuthCheckBox";
import AuthFormLayout from "../components/ui/auth/AuthFormLayout";
import AuthInputField from "../components/ui/auth/AuthInputField";
import AuthSubmitButton from "../components/ui/auth/AuthSubmitButton";
import { useAuthSubmit } from "../hooks/useAuthSubmit";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authSubmit = useAuthSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();
    authSubmit(email, password, true, username);
  };

  return (
    <AuthFormLayout title="Register">
      <form onSubmit={handleSubmit}>
        <AuthInputField
          icon={UserIcon}
          type="text"
          id="username"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <AuthInputField
          icon={EnvelopeIcon}
          type="email"
          id="email-register"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInputField
          icon={LockClosedIcon}
          type="password"
          id="password-register"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthCheckBox
          text="I agree to the terms & conditions"
          forgotPassword={false}
        />
        <AuthSubmitButton text="Register" />
        <AuthCheckAcc
          check="Already have an account?"
          link="/login"
          text="Login"
        />
      </form>
    </AuthFormLayout>
  );
};

export default RegisterPage;
