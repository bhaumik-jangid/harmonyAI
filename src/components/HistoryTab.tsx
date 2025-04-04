"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface HistoryTabProps {
  utc: string;
  userPrompt: string;
  aiResponse: string;
  sessionid: string;
  userid: string;
}

const formatDate = (utcString: string) => {
  if (!utcString) return "Invalid Date";
  const date = new Date(utcString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
};

const HistoryTab: React.FC<HistoryTabProps> = ({ utc, userid, sessionid, userPrompt, aiResponse }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevents navigation when clicking delete
    setIsDeleting(true);

    const toastId = toast.loading("Deleting session...");

    try {
      const response = await fetch(
        `https://medgurubackend.onrender.com/api/chat/history/${userid}/${sessionid}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete session");
      window.location.reload();
      toast.success("Session deleted successfully!", { id: toastId });

    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-transform transform duration-300 ease-in-out active:scale-95 max-w-[60vw] mx-auto shadow-lg flex justify-between items-center"
    >
      <div className="flex flex-col w-full cursor-pointer" onClick={() => router.push(`/chat/${sessionid}`)}>
        <p className="text-xs text-gray-400">{formatDate(utc)}</p>
        <p className="font-bold truncate">{userPrompt}</p>
        <p className="text-gray-300 line-clamp-2">{aiResponse}</p>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="hidden lg:flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors ml-4 p-2 rounded-full focus:outline-none cursor-pointer"
        disabled={isDeleting}
        title="Delete session"
      >
        {isDeleting ? "⏳" : "🗑️"}
      </button>
    </div>

  );
};

export default HistoryTab;
