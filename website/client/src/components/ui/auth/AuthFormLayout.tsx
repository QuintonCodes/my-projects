import { ReactNode, FC } from "react";

interface AuthFormLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthFormLayout: FC<AuthFormLayoutProps> = ({ children, title }) => {
  return (
    <section className="items-center flex justify-center my-20">
      <div className="items-center flex justify-center bg-transparent border-2 border-solid border-black rounded-[20px] relative w-[550px]">
        <div className="p-10 w-full">
          <h3 className="text-[2em] text-center font-semibold">{title}</h3>
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthFormLayout;
