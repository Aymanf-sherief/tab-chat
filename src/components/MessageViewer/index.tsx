import React, { useEffect, useRef } from "react";
import { User } from "../../types/user";
import { ChatMessage } from "../../types/message";
import { MessageCard } from "../MessageCard";

export interface MessageViewerProps {
  messages: ChatMessage[];
  selectedUser: User;
}

export const MessageViewer: React.FC<MessageViewerProps> = ({
  messages,
  selectedUser,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="overflow-auto flex-1">
      <div className="flex flex-col gap-2 p-2 min-h-min">
        {selectedUser &&
          messages &&
          messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
      </div>
      <div ref={messagesEndRef} />
      {messages.length === 0 && (
        <div className="text-center mt-10">No messages yet!</div>
      )}
    </div>
  );
};
