import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import AuthForm from "../components/AuthForm";
import { useNavigate, useParams } from "react-router-dom";

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
          <AuthForm isRegistered={true} />
        </TabsContent>
        <TabsContent value="signup">
          <AuthForm isRegistered={false} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AuthPage;
