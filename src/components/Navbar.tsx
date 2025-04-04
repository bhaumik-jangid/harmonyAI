"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import DataFromJWT from "@/utils/DataFromJWT";
import { MessageCircle, History, UserCircle } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const decodedUser = DataFromJWT();
    if (decodedUser) {
      setUser({
        name: decodedUser.name || "Guest",
        email: decodedUser.email || "No email available",
      });
    }
  }, []);

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://medgurubackend.onrender.com/api/user/logout", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent
      });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }

      // localStorage.removeItem("token");
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 text-white bg-gray-900 bg-opacity-40 lg:bg-transparent">
      <div className="text-2xl font-semibold">
        <Link href="/">HARMONY</Link>
      </div>
      <div className="flex gap-4 items-center">
      <Link href="/chat">
        <span title="New Chat">
          <MessageCircle size={28} strokeWidth={1.5} className="text-white hover:text-green-400 transition" />
          
        </span>
      </Link>
      <Link href="/chat-history">
        <span title="History">
          <History size={28} strokeWidth={1.5} className="text-white hover:text-green-400 transition" />
        </span>
      </Link>
      <button onClick={toggleProfile} className="focus:outline-none">
        <span title="Profile">
          <UserCircle size={34} strokeWidth={1.5} className="text-white hover:text-green-400 transition" />
        </span>
      </button>
    </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-800 text-white max-w-sm mx-auto rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-4">
            <Image
              src="/avatar.png"
              alt="User Avatar"
              width={120} 
              height={120} 
              className="rounded-full border border-gray-500"
            />
            <p className="mt-2 font-semibold">{user?.name || "Loading..."}</p>
            <p className="text-sm text-gray-400">{user?.email || "Loading..."}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
