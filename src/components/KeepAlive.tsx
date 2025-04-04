"use client";

import { useEffect } from "react";

const KeepAlive = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await fetch("https://medgurubackend.onrender.com");
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
