"use client";

import { links } from "@/lib/data";
import { AlignRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-8 text-white xl:py-12">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Quinton<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* Desktop Nav & Hire me Button */}
        <div className="items-center hidden gap-8 xl:flex">
          <nav className="flex gap-8">
            {links.map((link, index) => {
              return (
                <Link
                  className={`${
                    link.path === pathname &&
                    "text-accent border-b-2 border-accent"
                  } capitalize font-medium hover:text-accent transition-all`}
                  href={link.path}
                  key={index}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <Link href="/contact">
            <Button>Hire Me</Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="xl:hidden">
          <Sheet onOpenChange={setIsOpen} open={isOpen}>
            <SheetTrigger className="flex items-center justify-center">
              <AlignRight className="text-[32px] text-accent" />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <div className="mt-32 text-2xl text-center mb-14">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <SheetTitle className="text-4xl font-semibold text-white">
                    Quinton<span className="text-accent">.</span>
                  </SheetTitle>
                </Link>
              </div>

              <nav className="flex flex-col items-center justify-center gap-8">
                {links.map((link, index) => (
                  <Link
                    className={`${
                      link.path === pathname &&
                      "text-accent border-b-2 border-accent"
                    } text-xl capitalize hover:text-accent transition-all`}
                    href={link.path}
                    key={index}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
