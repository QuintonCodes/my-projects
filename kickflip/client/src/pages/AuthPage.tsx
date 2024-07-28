import { useNavigate, useParams } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
// import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  const { tab } = useParams<{ tab?: string }>();
  const activeTab = tab === "login" ? "login" : "signup";
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center bg-[#D6D6D6] py-10 h-auto">
      <Tabs className="w-[550px]" value={activeTab}>
        <TabsList className="grid w-full grid-cols-2 bg-[#292929]">
          <TabsTrigger
            value="signup"
            className="data-[state=active]:text-[#7F1310] data-[state=inactive]:text-white"
            onClick={() => navigate("/auth/signup")}
          >
            Sign Up
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="data-[state=active]:text-[#7F1310] data-[state=inactive]:text-white"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
          {/* <AuthForm isRegistered={true} /> */}
        </TabsContent>
        <TabsContent value="signup">
          <RegisterForm />
          {/* <AuthForm isRegistered={false} /> */}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AuthPage;
