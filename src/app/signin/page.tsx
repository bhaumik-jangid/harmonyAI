"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";


export default function AuthForm() {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isSignup
      ? "https://medgurubackend.onrender.com/api/user/signup"
      : "https://medgurubackend.onrender.com/api/user/signin";

    const payload = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    const toastId = toast.loading(isSignup ? "Signing up..." : "Logging in...");

    try {
      const res = await axios.post(url, payload);

      if (res.data.sucess) {
        Cookies.set("token", res.data.token, { expires: 1, secure: true, sameSite: "Lax" }); 
        toast.success(isSignup ? "Signed up successfully!" : "Logged in successfully!", { id: toastId });
        window.location.reload();
        setTimeout(() => {router.replace("/chat");}, 500);

      } else {
        toast.error(res.data.error || "Authentication failed. Please try again.", { id: toastId });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An unexpected error occurred. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 px-4 sm:px-6 md:px-8 bg-harmony">
      <Toaster />
      <header className="shadow-sm fixed top-0">
        <nav>
            <div className="text-3xl p-5 font-semibold font-koulen text-white text-harmony flex items-start w-screen">
              <Link href="/">HARMONY</Link>
            </div>
        </nav>
      </header>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-xl font-julius">
        <motion.div initial={{ height: "auto" }} animate={{ height: "auto" }} className="overflow-hidden">
          <h2 className="text-white text-2xl font-semibold text-center mb-4">
            {isSignup ? "Sign Up" : "Log In"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <Input type="text" name="name" placeholder="Username" value={formData.name} onChange={handleInputChange} />
            )}
            <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
            <Button className="bg-[#FFB4C4]" type="submit">{isSignup ? "Sign Up" : "Log In"}</Button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"} 
            <button onClick={() => setIsSignup(!isSignup)} className="text-harmony hover:underline ml-1">
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
