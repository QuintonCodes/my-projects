import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  return (
    <section className="flex items-center justify-center bg-[#D6D6D6] py-10 h-auto">
      <Tabs className="w-[550px]" defaultValue="signup">
        <TabsList className="grid w-full grid-cols-2 bg-[#292929]">
          <TabsTrigger
            value="signup"
            className="data-[state=active]:text-[#7F1310] data-[state=inactive]:text-white"
          >
            Sign Up
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="data-[state=active]:text-[#7F1310] data-[state=inactive]:text-white"
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
