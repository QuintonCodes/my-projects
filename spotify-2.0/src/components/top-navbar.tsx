"use client";

import { useSupabase } from "@/context/supabase-context";
import { useUser } from "@/context/user-context";
import { useAuthStore } from "@/store/auth-store";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import SearchBar from "./searchbar";
import { Button } from "./ui/button";

export default function TopNavBar() {
  const path = usePathname();
  const { onOpen } = useAuthStore();
  const router = useRouter();
  const { supabase } = useSupabase();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="relative bg-neutral-900 flex items-center w-full rounded-xl my-2 mx-0 h-[calc(90vh_-92%)]">
      <div className="flex items-center justify-between w-full gap-6 px-5">
        <div className="items-center hidden md:flex gap-x-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center transition bg-black rounded-full cursor-pointer hover:opacity-75"
          >
            <RxCaretLeft className="text-white" size={30} />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex items-center justify-center transition bg-black rounded-full cursor-pointer hover:opacity-75"
          >
            <RxCaretRight className="text-white" size={30} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={`${
              path === "/" && "bg-zinc-800"
            } flex items-center justify-center w-12 h-10 rounded-full cursor-pointer bg-zinc-700/70 hover:bg-zinc-700/30 transition`}
          >
            <AiFillHome
              className={`${path === "/" && "fill-white"} size-6 text-white/70`}
            />
          </Link>
          <SearchBar />
        </div>

        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div>
              <Button onClick={handleLogout} className="px-6 py-2 bg-white">
                Logout
              </Button>
              {/* TODO: Change button later */}
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="font-bold transition rounded-full hover:scale-110"
                  variant="ghost"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button className="px-6 py-2 transition bg-green-600 rounded-full hover:bg-green-700 hover:scale-110">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="hidden">
          <CircleUserRound className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
