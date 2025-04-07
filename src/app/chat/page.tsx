"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Chatbox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";
import DataFromJWT from "@/utils/DataFromJWT";

const ChatPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ text: string; user: "me" | "ai" }[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (loading) {
      handlePause();
      return;
    }

    if (!inputText.trim() || !userId) return;

    const userInput = inputText;
    setInputText("");

    setLoading(true);
    setPaused(false);
    const newController = new AbortController();
    setController(newController);

    const newSessionId = generateSessionId();
    setMessages((prev) => [
      ...prev,
      { text: userInput, user: "me" },
      { text: "Generating response...", user: "ai" },
    ]);

    try {
      const response = await fetch(`https://medgurubackend.onrender.com/api/chat/${userId}/${newSessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userInput }),
        signal: newController.signal,
      });

      const data = await response.json();
      setMessages((prev) => [...prev.slice(0, -1), { text: data.aiMessage, user: "ai" }]);
      localStorage.setItem(
        "initialChat",
        JSON.stringify([
          { text: userInput, user: "me" },
          { text: data.aiMessage, user: "ai" }
        ])
      );
      router.replace(`/chat/${newSessionId}`);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.warn("AI response aborted.");
        setMessages((prev) => [...prev.slice(0, -1), { text: "AI response paused.", user: "ai" }]);
      } else {
        console.error("Error fetching chat history:", error);
        setMessages((prev) => [...prev.slice(0, -1), { text: "Error connecting to server.", user: "ai" }]);
      }
    } finally {
      setLoading(false);
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
      <div className="h-screen w-screen bg-[url('/chatbgImage-sm.webp')] sm:bg-[url('/chatbgImage.webp')] bg-cover bg-no-repeat sm:bg-center py-[60px]">
        <div
          className={`flex-1 flex flex-col gap-2 w-full sm:w-[60%] mx-auto transition-all duration-500 ${
            messages.length === 0
              ? "justify-center items-center h-full"
              : "overflow-auto pb-36"
          }`}
        >
          {messages.length === 0 ? (
            <div className="text-white text-3xl font-bold font-julius">
              What can I help you with?
            </div>
          ) : (
            messages.map((message, index) => (
              <Chatbox
                key={index}
                text={message.text}
                user={message.user}
                className={`transition-opacity duration-500 ${
                  message.text === "Generating response..."
                    ? "animate-pulse text-gray-400"
                    : "opacity-100"
                }`}
              />
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {paused && <div className="text-center text-yellow-400 text-sm mb-2">AI response paused.</div>}

        {/* Input Bar (Smooth transition from center to bottom) */}
        <div
          className="fixed left-0 right-0 z-10 flex flex-col items-center gap-2 bg-transparent transition-all duration-700 ease-in-out"
          style={{
            bottom: messages.length === 0 ? "40%" : "-2px",
            transform: messages.length === 0 ? "translateY(50%)" : "translateY(0)",
          }}
        >
          <div className="flex flex-row gap-2 mb-4 w-full sm:w-[60%] mx-auto justify-evenly px-3">
            <input
              ref={inputRef}
              className="flex-1 p-3 border border-gray-300 rounded-xl text-sm max-w-[80%] bg-[#243664] outline-none text-white font-julius"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSendMessage()}
              placeholder="Type a message"
              disabled={loading}
            />
            <button
              className={`p-3 rounded-xl font-julius border text-sm w-24 ${loading ? "bg-red-600 text-white" : "bg-[#14190E] text-white"}`}
              onClick={handleSendMessage}
            >
              {loading ? "Pause" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;

function generateSessionId() {
  return new Date().toISOString().replace(/[-:.TZ]/g, "");
}
