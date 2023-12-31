import React, { ChangeEvent, useCallback, useContext, useState } from "react";
import { User } from "../../types/user";
import { ChannelMessage } from "../../types/message";
import { channel } from "../../broadcast";
import { v4 as uuidv4 } from "uuid";
import { MessageType } from "../../types/channel";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { ChatContext } from "../../App";

export interface MessageBoxProps {
  selectedUser: User;
  addMessage: (message: ChannelMessage) => void;
}

/**
 * MessageBox component, shows the message input box and send button
 * @param {User} selectedUser - selected user
 * @param {Function} addMessage - function to add message to the channel
 * @returns {React.FC} - React component
 */

export const MessageBox: React.FC<MessageBoxProps> = ({
  selectedUser,
  addMessage,
}) => {
  const { currentUser } = useContext(ChatContext);

  const [sentMessage, setSentMessage] = useState("");

  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSentMessage(event.target.value),
    [setSentMessage]
  );

  const handleSendMessage = useCallback(() => {
    if (!sentMessage || !currentUser) {
      return;
    }
    const newMessage: ChannelMessage = {
      id: uuidv4(),
      body: sentMessage,
      from: currentUser,
      to: selectedUser,
    };
    channel.postMessage({
      type: MessageType.message,
      message: newMessage,
    });
    addMessage(newMessage);
    setSentMessage("");
  }, [sentMessage, currentUser, selectedUser, addMessage, setSentMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  return (
    <div className="flex flex-row justify-center align-middle bg-white p-4 shadow">
      <Input
        placeholder="write your message here ..."
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        value={sentMessage}
      />
      <Button onClick={handleSendMessage} className="m-2">
        send
      </Button>
    </div>
  );
};
