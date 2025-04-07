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
      className={`p-3 rounded-xl font-julius my-2 break-words w-fit max-w-[80%] h-auto 
        ${user === "me" ? "bg-[#14190E] text-white self-end" : "bg-[#0e1526] text-white self-start"}`}
      style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
    >
      {isGenerating ? (
        <span className="animate-pulse text-gray-400">{text}</span>
      ) : (
        <ReactMarkdown>{text}</ReactMarkdown>
      )}
    </div>
  );
};

export default Chatbox;
