import { Loader2, LogOut, User } from "lucide-react";
import { ReactNode, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuth from "../hooks/useAuth";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MenuProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
}

const Menu = ({ children }: MenuProps) => {
  const auth = useAuthUser<IUser>();

  const [showProfile, setShowProfile] = useState(false);
  const [details, setDetails] = useState({
    name: auth?.name || "",
    email: auth?.email || "",
  });
  const { name, email } = details;

  const signOut = useSignOut();
  const { error, loading, handleUpdate } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    handleUpdate(name, email, setDetails);
    setShowProfile(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-[#d6d6d6]">
          <DropdownMenuLabel className="text-[#7F1310]">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setShowProfile(true)}
            >
              <User className="mr-2 h-5 w-5" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent
          className="max-w-[425px] bg-[#d6d6d6]"
          onOpenAutoFocus={(e: Event) => e.preventDefault}
        >
          <DialogHeader>
            <DialogTitle className="text-[#7f1310]">Edit Profile</DialogTitle>
            <DialogDescription className="text-black">
              Update your profile information here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {error.length > 0 ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <p>{error}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSave}
              disabled={loading}
              className="bg-[#292929] hover:bg-[#7F1310] hover:bg-opacity-90 hover:scale-110 transition duration-300 text-white hover:text-black"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Menu;
