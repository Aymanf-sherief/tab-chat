import React, { useCallback, useContext, useEffect, useState } from "react";
import { MessageBox } from "../../components/MessageBox";
import { MessageViewer } from "../../components/MessageViewer";
import { UserList } from "../../components/UserList";
import { TopBar } from "../../components/TopBar";
import { User } from "../../types/user";
import { ChatContext } from "../../App";
import { ChannelMessage } from "../../types/message";
import { UserCard } from "../../components/shared/UserCard";
import _ from "lodash";
import { channel, handleChatMessage } from "../../broadcast";
import { MessageType } from "../../types/channel";
import { toast } from "react-toastify";

type ChatPageProps = {
  addMessage: (message: ChannelMessage) => void;
};

/**
 * ChatPage component, shows the chat page after a login
 * @param {Function} addMessage - function to add a message to the chat
 * @returns {React.FC} - React component
 */

const ChatPage: React.FC<ChatPageProps> = ({ addMessage }) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const { currentUser, messages } = useContext(ChatContext);

  const showMessageNotification = useCallback((message: ChannelMessage) => {
    toast(() => (
      <UserCard
        user={message.from}
        subtext={message.body}
        onClick={() => setSelectedUser(message.from)}
      />
    ));
  }, []);

  useEffect(() => {
    // add a listener for chat messages on the broadcast channel
    const chatMessageEventListener = (event: MessageEvent) => {
      if (
        event.data.type === MessageType.message &&
        !_.isEmpty(currentUser) &&
        handleChatMessage(event, currentUser, messages ?? {}, addMessage)
      ) {
        showMessageNotification(event.data.message);
      }
    };
    channel.addEventListener("message", chatMessageEventListener);
    return () =>
      channel.removeEventListener("message", chatMessageEventListener);
  }, [addMessage, messages, currentUser, showMessageNotification]);

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen lg:p-4">
      <div className="w-screen h-1/4 lg:w-1/4 lg:h-screen">
        <TopBar currentUser={currentUser} />
        <UserList
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
        />
      </div>
      {currentUser && selectedUser ? (
        <div className="w-screen h-3/4 lg:w-3/4 lg:h-screen flex flex-col bg-gray-800">
          <UserCard user={selectedUser} className="w-full bg-white" />
          <MessageViewer selectedUser={selectedUser} />
          <MessageBox selectedUser={selectedUser} addMessage={addMessage} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-screen h-3/4 lg:w-3/4 lg:h-screen">
          <p className="text-black font-bold">
            Select a someone from the left menu to start chatting!
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
