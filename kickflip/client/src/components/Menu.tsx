import { ReactNode, useState } from "react";
import { LogOut, User } from "lucide-react";
import { Dialog } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Profile from "./Profile";
import { useUser } from "../context/UserContext";

interface MenuProps {
  children: ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  const [showProfile, setShowProfile] = useState(false);
  const { logout } = useUser();

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
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              <LogOut className="mr-2 h-5 w-5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <Profile />
      </Dialog>
    </>
  );
};

export default Menu;
