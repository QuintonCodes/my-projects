import { LogIn, LogOut, User } from "lucide-react";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Menu = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#d6d6d6]">
        <DropdownMenuLabel className="text-[#1DB954]">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-5 w-5" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <LogIn className="mr-2 h-5 w-5" />
            <span>Log in</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="mr-2 h-5 w-5" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
