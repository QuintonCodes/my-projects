import { useState, FormEvent, FC, ComponentType } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import AuthCheckAcc from "../components/ui/auth/AuthCheckAcc";
import AuthCheckBox from "../components/ui/auth/AuthCheckBox";
import AuthFormLayout from "../components/ui/auth/AuthFormLayout";
import AuthInputField from "../components/ui/auth/AuthInputField";
import AuthSubmitButton from "../components/ui/auth/AuthSubmitButton";
import { useAuthSubmit } from "../hooks/useAuthSubmit";

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authSubmit = useAuthSubmit();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    authSubmit({ email, password, isLogin: true });
  };

  return (
    <AuthFormLayout title="Login">
      <form onSubmit={handleSubmit}>
        <AuthInputField
          icon={EnvelopeIcon as ComponentType<{ className: string }>}
          type="email"
          id="email-login"
          label="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <AuthInputField
          icon={LockClosedIcon as ComponentType<{ className: string }>}
          type="password"
          id="password-login"
          label="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
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
