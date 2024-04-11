import { useState, FC, FormEvent, ComponentType } from "react";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import AuthCheckAcc from "../components/ui/auth/AuthCheckAcc";
import AuthCheckBox from "../components/ui/auth/AuthCheckBox";
import AuthFormLayout from "../components/ui/auth/AuthFormLayout";
import AuthInputField from "../components/ui/auth/AuthInputField";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import Button from "../components/Button";

const RegisterPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authSubmit = useAuthSubmit();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    authSubmit({ email, password, isLogin: true, username });
  };

  return (
    <AuthFormLayout title="Register">
      <form onSubmit={handleSubmit}>
        <AuthInputField
          icon={UserIcon as ComponentType<{ className: string }>}
          type="text"
          id="username"
          label="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <AuthInputField
          icon={EnvelopeIcon as ComponentType<{ className: string }>}
          type="email"
          id="email-register"
          label="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <AuthInputField
          icon={LockClosedIcon as ComponentType<{ className: string }>}
          type="password"
          id="password-register"
          label="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <AuthCheckBox
          text="I agree to the terms & conditions"
          forgotPassword={false}
        />
        <Button text="Register" />
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
