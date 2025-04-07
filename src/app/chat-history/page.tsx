"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HistoryTab from "@/components/HistoryTab";
import DataFromJWT from "@/utils/DataFromJWT";

const ChatHistoryPage = () => {
  interface ChatMessage {
    text: string;
    user: string;
    timestamp: string;
  }

  interface Chat {
    _id: string;
    userId: string;
    sessionId: string;
    title: string;
    timestamp: string;
    createdAt: string;
    messages: ChatMessage[];
  }

  const [chatHistory, setChatHistory] = useState<{
    today: Chat[];
    yesterday: Chat[];
    last7Days: Chat[];
    older: Chat[];
  }>({
    today: [],
    yesterday: [],
    last7Days: [],
    older: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const user = await DataFromJWT();
        if (!user || !user.id) {
          console.error("Invalid token payload");
          return;
        }

        const response = await fetch(`https://medgurubackend.onrender.com/api/chat/history/${user.id}`);
        const data = await response.json();

        setChatHistory({
          today: data.history.today || [],
          yesterday: data.history.yesterday || [],
          last7Days: data.history.last7Days || [],
          older: data.older || [],
        });
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-harmony bg-fixed bg-cover bg-no-repeat text-white pt-[60px] font-julius">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-6 sm:px-10 py-10">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold text-center">Chat History</h1>

          {loading ? (
            <p className="text-gray-400 text-center">Loading chat history...</p>
          ) : (
            <>
              {["today", "yesterday", "last7Days", "older"].map((period) => (
                chatHistory[period as keyof typeof chatHistory].length > 0 && (
                  <div key={period} className="bg-gray-800 p-5 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-300 capitalize mb-3">
                      {period.replace("last7Days", "Last 7 Days").replace("older", "Older")}
                    </h2>
                    <div className="space-y-4">
                      {chatHistory[period as keyof typeof chatHistory].map((chat) => (
                        <HistoryTab
                          key={chat._id}
                          sessionid={chat.sessionId}
                          utc={chat.createdAt}
                          userid={chat.userId}
                          userPrompt={chat.messages[0]?.text || "No messages"}
                          aiResponse={chat.messages[1]?.text || "No response"}
                        />
                      ))}
                    </div>
                  </div>
                )
              ))}

              {Object.values(chatHistory).every((chats) => chats.length === 0) && (
                <p className="text-gray-400 text-center">No chat history available.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryPage;
