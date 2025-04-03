import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatboxProps {
  text: string;
  user: "me" | "ai";
  className?: string;
}

const Chatbox: React.FC<ChatboxProps> = ({ text, user }) => {
  const isGenerating = text === "Generating response...";

  return (
    <div
      className={`p-3 rounded-xl my-2 break-words w-fit max-w-[80%] h-auto 
        ${user === "me" ? "bg-[#14190E] text-white self-end" : "bg-gray-300 text-black self-start"} 
        ${isGenerating ? "animate-pulse text-gray-500" : ""}`}
      style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
    >
      {/* Render Markdown-formatted text */}
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default Chatbox;
