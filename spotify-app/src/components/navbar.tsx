"use client";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "./menu";
import SearchBar from "./searchbar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

interface DropdownItemProps {
  href: string;
  label: string;
  description: string;
  isActive: boolean;
}

const DropdownItem = ({
  href,
  label,
  description,
  isActive,
}: DropdownItemProps) => (
  <li className="space-y-1">
    <Link
      href={href}
      className={`font-semibold transition-colors ${
        isActive ? "text-[#1DB954]" : "text-white"
      } hover:text-[#1DB954]`}
    >
      {label}
    </Link>
    <p className="text-sm text-slate-300">{description}</p>
  </li>
);

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, label, isActive }: NavItemProps) => (
  <NavigationMenuItem
    className={`px-3 py-2 rounded-lg transition-colors ${
      isActive ? "text-[#1DB954] hover:text-white" : "text-white"
    } hover:bg-[#1DB954]`}
  >
    <Link
      href={href}
      legacyBehavior
      passHref
      target={label === "Docs" ? "_blank" : "_self"}
    >
      <NavigationMenuLink>{label}</NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

interface NavDropdownProps {
  label: string;
  items: DropdownItemProps[];
  isActive: boolean;
}

const NavDropdown = ({ label, items, isActive }: NavDropdownProps) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger
      className={`bg-transparent hover:bg-[#1DB954] data-[active]:bg-transparent focus:bg-[#1DB954] data-[state=open]:bg-[#1DB954] text-base ${
        isActive ? "text-[#1DB954]" : "text-white"
      }`}
    >
      {label}
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="bg-[#1f1f1f] p-4 rounded-md space-y-4 w-[400px]">
        {items.map((item) => (
          <DropdownItem key={item.href} {...item} />
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

const Navbar = () => {
  const pathname = usePathname();

  const isArtistActive = pathname.startsWith("/artists");
  const isTracksActive = pathname.startsWith("/tracks");

  const artistLinks = [
    {
      href: "/artists/followed?page=1",
      label: "Followed Artists",
      description: "View and manage the artists you follow.",
      isActive: pathname === "/artists/followed",
    },
    {
      href: "/artists/daily",
      label: "Daily Artist",
      description: "Discover a featured artist every day.",
      isActive: pathname === "/artists/daily",
    },
    {
      href: "/artists/top",
      label: "Top Artists",
      description: "Explore the top artists based on trends.",
      isActive: pathname === "/artists/top",
    },
  ];

  const trackLinks = [
    {
      href: "/tracks/top",
      label: "Top Tracks",
      description: "Listen to the most popular tracks right now.",
      isActive: pathname === "/tracks/top",
    },
    {
      href: "/tracks/discover-albums",
      label: "Discover Albums",
      description: "Discover fresh and hot new albums",
      isActive: pathname === "/tracks/discover-albums",
    },
    {
      href: "/tracks/saved-albums",
      label: "Saved Albums",
      description: "Browse through your favourite and saved albums",
      isActive: pathname === "/tracks/saved-albums",
    },
  ];

  return (
    <header className="static bg-[#1f1f1f] flex items-center min-h-[90px] w-full px-5">
      <div className="flex items-center justify-between px-5 gap-6 w-full">
        <h5 className="px-[5px]">Vibe Voyage</h5>
        <div className="flex gap-10">
          <NavigationMenu className="text-white">
            <NavigationMenuList className="flex space-x-4">
              <NavItem href="/" label="Home" isActive={pathname === "/"} />
              <NavDropdown
                label="Artists"
                items={artistLinks}
                isActive={isArtistActive}
              />
              <NavDropdown
                label="Tracks"
                items={trackLinks}
                isActive={isTracksActive}
              />
              <NavItem
                href="https://developer.spotify.com/documentation/web-api"
                label="Docs"
                isActive={false}
              />
            </NavigationMenuList>
          </NavigationMenu>

          <SearchBar />
        </div>
        <Menu>
          <CircleUserRound className="h-8 w-8 cursor-pointer" />
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
