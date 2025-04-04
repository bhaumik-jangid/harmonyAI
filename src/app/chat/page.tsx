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
    inputRef.current?.focus(); // 🔹 Focus on input field after reload
  }, []);

  const handleSendMessage = async () => {
    if (loading) {
      handlePause();
      return;
    }

    if (!inputText.trim() || !userId) return;

    setLoading(true);
    setPaused(false);
    const newController = new AbortController();
    setController(newController);

    const newSessionId = generateSessionId();
    setMessages((prev) => [
      ...prev,
      { text: inputText, user: "me" },
      { text: "Generating response...", user: "ai" },
    ]);

    try {
      const response = await fetch(`https://medgurubackend.onrender.com/api/chat/${userId}/${newSessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: inputText }),
        signal: newController.signal,
      });

      const data = await response.json();
      setMessages((prev) => [...prev.slice(0, -1), { text: data.aiMessage, user: "ai" }]);
      localStorage.setItem(
        "initialChat",
        JSON.stringify([
          { text: inputText, user: "me" },
          { text: data.aiMessage , user: "ai" }
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
      setInputText("");
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
      <div className="flex flex-col h-screen w-screen p-5 bg-gray-900 text-red-200 py-[60px]">
        <div className="flex-1 flex flex-col gap-2 overflow-auto hide-scrollbar mb-4 w-full sm:w-[60%] mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-3xl font-bold">
              What can I help with?
            </div>
          ) : (
            messages.map((message, index) => (
              <Chatbox
                key={index}
                text={message.text}
                user={message.user}
                className={message.text === "Generating response..." ? "animate-pulse text-gray-400" : ""}
              />
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {paused && <div className="text-center text-yellow-400 text-sm mb-2">AI response paused.</div>}

        <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-2 border-t pt-3">
          <div className="flex flex-row gap-2 mb-4 w-full sm:w-[60%] mx-auto px-1">
            <input
              ref={inputRef}
              className="flex-1 p-3 border border-gray-300 rounded-xl text-sm max-w-[80%]"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSendMessage()}
              placeholder="Type a message"
              disabled={loading}
            />
            <button
              className={`p-3 rounded-xl text-sm w-24 ${loading ? "bg-red-600" : "bg-[#14190E] text-white"}`}
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
