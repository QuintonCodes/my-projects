import LoginForm from "../components/LoginForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const SignupPage = () => {
  return (
    <section className="flex items-center justify-center my-10">
      <Tabs defaultValue="signup" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <LoginForm isRegistered={false} />
        </TabsContent>
        <TabsContent value="login">
          <LoginForm isRegistered={true} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SignupPage;
