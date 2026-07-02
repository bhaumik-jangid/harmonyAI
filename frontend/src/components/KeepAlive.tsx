"use client";

import { useEffect } from "react";
import API_BASE_URL from "@/config/api.js";


const KeepAlive = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await fetch(`${API_BASE_URL}/api/keep-alive`);
        console.log("Keep-alive ping sent");
      } catch (error) {
        console.error("Error pinging server:", error);
      }
    }, 300000); // every 5 minutes

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return null; // no UI
};

export default KeepAlive;
