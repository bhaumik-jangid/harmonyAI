"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Chatbox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";
import DataFromJWT from "@/utils/DataFromJWT";

const ChatPage = () => {
  const pathname = usePathname();
  const sessionId = pathname.split("/chat/")[1] || null;
  const [userId, setUserId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<{ text: string; user: "me" | "ai" }[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await DataFromJWT();
        setUserId(user?.id || null);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    inputRef.current?.focus(); // 🔹 Focus on input field after reload
  }, []);

  // Fetch chat history when sessionId is available
  useEffect(() => {
    const initialChat = localStorage.getItem("initialChat");
    let parsedInitial: { text: string; user: "me" | "ai" }[] = [];

    if (initialChat) {
      try {
        parsedInitial = JSON.parse(initialChat);
        setMessages(parsedInitial);
        localStorage.removeItem("initialChat");
      } catch (err) {
        console.error("Error parsing initialChat", err);
      }
    }

    if (!sessionId || !userId || parsedInitial.length > 0) return;

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `https://medgurubackend.onrender.com/api/chat/history/${userId}/${sessionId}`
        );
        const data = await response.json();
        if (data.success && data.history.length > 0 && data.history[0].messages.length > 0) {
          setMessages(data.history[0].messages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [sessionId, userId]);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (loading) {
      handlePause(); // If already loading, pause instead
      return;
    }

    if (inputText.trim() && userId) {
      setLoading(true);

      const userInput = inputText;
      setInputText("");

      setPaused(false);
      const newController = new AbortController();
      setController(newController);

      // Append user message & placeholder AI message
      setMessages((prev) => [...prev, { text: userInput, user: "me" }, { text: "Generating response...", user: "ai" }]);

      try {
        const response = await fetch(
          `https://medgurubackend.onrender.com/api/chat/${userId}/${sessionId || "new"}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage: userInput }),
            signal: newController.signal,
          }
        );

        const data = await response.json();
        setMessages((prev) => [...prev.slice(0, -1), { text: data.aiMessage, user: "ai" }]);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.warn("AI response aborted.");
          setMessages((prev) => [...prev.slice(0, -1), { text: "AI response paused.", user: "ai" }]);
        } else {
          console.error("API error:", error);
          setMessages((prev) => [...prev.slice(0, -1), { text: "Error connecting to server.", user: "ai" }]);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePause = () => {
    if (controller) {
      controller.abort();
      setPaused(true);
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="h-screen w-screen bg-fixed bg-cover bg-no-repeat bg-[url('/bgImage-sm.webp')] sm:bg-[url('/bgImage.webp')] bg-center">

        {/* Mirrored Image Below */}
        <div className="fixed right-[-10rem] sm:right-[-19rem] z-0 pointer-events-none top-0 md:top-1/2 md:translate-y-[-50%] hidden sm:block">
          <img
            src="/AIPersona.webp"
            alt="Mirrored Image"
            className="
              h-[50vh]         
              sm:h-[70vh]      
              md:h-[80vh]      
              scale-x-[-1]
              opacity-80
              rotate-[10deg]
              object-contain
            "
          />
        </div>

      {/* Main layout */}
      <div className="flex flex-col justify-between h-full">
        {/* Chat messages */}
        <div className="flex-1 flex flex-col gap-2 overflow-auto hide-scrollbar w-full sm:w-[60%] mx-auto pt-[60px]">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-3xl font-bold">
              What can I help with?
            </div>
          ) : (
            messages.map((message, index) => (
              <Chatbox key={index} text={message.text} user={message.user} />
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {paused && (
          <div className="text-center text-yellow-400 text-sm mb-2">
            AI response paused.
          </div>
        )}

        {/* Input */}
        <div className="flex flex-col items-center gap-2 bg-transparent pb-4">
          <div className="flex flex-row gap-2 w-full sm:w-[60%] mx-auto justify-evenly px-3">
            <input
              ref={inputRef}
              className="flex-1 p-3 border border-gray-300 text-white rounded-xl text-sm max-w-[80%] bg-[#243664] outline-none font-julius"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSendMessage()}
              placeholder="Type a message"
              disabled={loading}
            />
            <button
              className={`p-3 rounded-xl text-sm w-24 font-julius border ${loading ? "bg-red-600 text-white" : "bg-[#14190E] text-white"}`}
              onClick={handleSendMessage}
            >
              {loading ? "Pause" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ChatPage;
