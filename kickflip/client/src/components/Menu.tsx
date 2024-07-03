import { ReactNode, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import Profile from "./Profile";
import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";
import { useUser } from "../context/UserContext";

interface MenuProps {
  children: ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  const [showProfile, setShowProfile] = useState(false);
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
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
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogOverlay />
        <DialogContent>
          <Profile />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Menu;
