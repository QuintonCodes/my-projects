"use client";

import { CircleUserRound, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Btn from "./btn";
import Menu from "./menu";
import SearchBar from "./searchbar";

const Navbar = () => {
  const router = useRouter();

  return (
    <header className="relative bg-[#1f1f1f] flex items-center min-h-[50px] w-full mt-2 mr-4 rounded-lg overflow-hidden overflow-y-auto">
      <div className="flex items-center justify-between px-5 gap-6 w-full">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-zinc-800/90 rounded-full w-12 h-10 flex items-center justify-center cursor-pointer hover:bg-zinc-700 ">
            <Home />
          </button>
          <SearchBar />
        </div>

        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Btn
                onClick={() => {}}
                className="bg-transparent text-neutral-300 font-medium"
              >
                Sign up
              </Btn>
            </div>
            <div>
              <Btn onClick={() => {}} className="bg-white px-6 py-2">
                Log in
              </Btn>
            </div>
          </>
        </div>

        <div className="hidden">
          <Menu>
            <CircleUserRound className="h-8 w-8 cursor-pointer" />
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
