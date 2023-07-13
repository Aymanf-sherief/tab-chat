import React from "react";
import { User } from "../../types/user";
import { Message } from "../../types/message";

export interface MessageViewerProps {
  currentUser: User;
  messages: Message[];
  selectedUser: User;
}

export const MessageViewer: React.FC<MessageViewerProps> = ({
  currentUser,
  messages,
  selectedUser,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-row gap-2 bg-white p-6">
        <img
          className="rounded-full h-8 w-8 inline-block mr-2"
          src={selectedUser.profilePicture}
        />
        <p className="text-black font-semibold">
          {selectedUser.firstName} {selectedUser.lastName}{" "}
        </p>
      </div>
      <div className="bg-gray-950">
        {selectedUser &&
          messages
            .filter(
              (message) =>
                message.from.id === selectedUser.id ||
                (message.from.id === currentUser.id &&
                  message.to.id === selectedUser.id)
            )
            .map((message) => (
              <p key={message.id}>
                {message.from.id === selectedUser.id ? "GOT" : "SENT"}:{" "}
                {message.body}
              </p>
            ))}
      </div>
    </div>
  );
};
