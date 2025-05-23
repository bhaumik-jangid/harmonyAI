"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import DataFromJWT from "@/utils/DataFromJWT";
import { MessageCircle, History, UserCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

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
    const toastId = toast.loading("Logging out...");
  
    try {
      const response = await fetch("https://medgurubackend.onrender.com/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Logout request failed");
      }
  
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toast.success("Logged out successfully!", { id: toastId });
  
      router.push("/");
    } catch (error) {
      toast.error("Logout failed", { id: toastId });
      console.error("Logout failed", error);
    }
  };
  

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gray-900 bg-opacity-40 lg:bg-transparent">
      <div className="text-3xl font-semibold text-harmony font-koulen">
        <Link href="/">HARMONY</Link>
      </div>
      <div className="flex gap-4 items-center">
      <Link href="/chat">
        <span title="New Chat">
          <MessageCircle size={28} strokeWidth={1.5} className="text-harmony  transition cursor-pointer" />
        </span>
      </Link>
      <Link href="/chat-history">
        <span title="History">
          <History size={28} strokeWidth={1.5} className="text-harmony transition cursor-pointer" />
        </span>
      </Link>
      <button onClick={toggleProfile} className="focus:outline-none">
        <span title="Profile">
          <UserCircle size={34} strokeWidth={1.5} className="text-harmony transition cursor-pointer" />
        </span>
      </button>
    </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-800 text-white max-w-sm mx-auto rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-julius">Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-4 font-julius">
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
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 cursor-pointer"
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
