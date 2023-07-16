import React, { useContext, useEffect, useMemo, useRef } from "react";
import { User } from "../../types/user";
import { MessageCard } from "../MessageCard";
import { ChatContext } from "../../App";

export interface MessageViewerProps {
  selectedUser: User;
}

/**
 * MessageViewer component, shows the messages in the chat window
 * @param {User} selectedUser - selected user
 * @returns {React.FC} - React component
 */
export const MessageViewer: React.FC<MessageViewerProps> = ({
  selectedUser,
}) => {
  const { messages, currentUser } = useContext(ChatContext);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentMessages = useMemo(
    () =>
      // get only messages between the current and selected user
      // refer to the MessageMap type in src/types/message.ts
      currentUser ? messages?.[currentUser?.id]?.[selectedUser.id] ?? [] : [],
    [messages, currentUser, selectedUser]
  );

  return (
    <div className="overflow-auto flex-1">
      <div className="flex flex-col gap-2 p-2 min-h-min">
        {selectedUser &&
          messages &&
          currentMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
      </div>
      <div ref={messagesEndRef} />
      {currentMessages.length === 0 && (
        <div className="text-center mt-10">No messages yet!</div>
      )}
    </div>
  );
};
