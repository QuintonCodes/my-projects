"use client";

import { linksData } from "@/data/info-data";
import { AlignRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <AlignRight className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col"
        aria-describedby="mobile-nav-description"
      >
        <div id="mobile-nav-description" className="sr-only">
          This is the mobile navigation menu. Use the links to navigate the
          site.
        </div>

        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/" onClick={handleClose}>
            <SheetTitle className="text-4xl font-semibold text-white">
              Quinton<span className="text-accent">.</span>
            </SheetTitle>
          </Link>
        </div>

        <nav className="flex flex-col justify-center items-center gap-8">
          {linksData.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={handleClose}
              className={`${
                link.path === pathname && "text-accent border-b-2 border-accent"
              } text-xl capitalize hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
