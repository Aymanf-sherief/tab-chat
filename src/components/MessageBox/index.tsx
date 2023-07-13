import React, { ChangeEvent, useCallback, useState } from "react";
import { User } from "../../types/user";
import { Message } from "../../types/message";
import { channel } from "../../broadcast";
import { v4 as uuidv4 } from "uuid";

export interface MessageBoxProps {
  currentUser: User;
  selectedUser: User;
  setReceivedMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  currentUser,
  selectedUser,
  setReceivedMessages,
}) => {
  const [sentMessage, setSentMessage] = useState("");

  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSentMessage(event.target.value),
    [setSentMessage]
  );

  const handleSendMessage = useCallback(() => {
    if (
      !currentUser ||
      !selectedUser ||
      !sentMessage ||
      !channel ||
      !channel.postMessage
    ) {
      return;
    }
    const newMessage: Message = {
      id: uuidv4(),
      body: sentMessage,
      from: currentUser,
      to: selectedUser,
    };
    console.log("sending");
    channel.postMessage({
      type: "tabchatMessage",
      message: newMessage,
    });
    setReceivedMessages((prev) => [...prev, newMessage]);
  }, [sentMessage, currentUser, selectedUser, setReceivedMessages]);

  return (
    <div className="flex flex-row justify-center align-middle bg-white border-2">
      <input
        className="rounded-full p-4 my-4 h-12 w-full mx-4"
        placeholder="write your message here ..."
        onChange={handleMessageChange}
      />
      <button className="text-sm p-2 m-2 px-8" onClick={handleSendMessage}>
        send
      </button>
    </div>
  );
};
