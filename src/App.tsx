import React, { useCallback, useEffect, useMemo, useState } from "react";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { User, UserMap } from "./types/user";
import ChatPage from "./pages/chat";
import { ChatContextType } from "./types/context";
import { ChannelMessage, MessageMap } from "./types/message";
import LoginPage from "./pages/login";
import { messagesApi, usersApi } from "./api";
import { channel, handleUserMessage } from "./broadcast";
import { MessageType } from "./types/channel";
import { ToastContainer, toast } from "react-toastify";

export const ChatContext = React.createContext<ChatContextType>({});

function App() {
  const [users, setUsers] = useState<UserMap>({});
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [messages, setMessages] = useState<MessageMap>({});

  useEffect(() => {
    const storedUsers = usersApi.getUsersMap();
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    const storedMessages = messagesApi.getMessagesMap();
    setMessages(storedMessages);
  }, []);

  const addMessage = useCallback((message: ChannelMessage) => {
    const newMessages = messagesApi.saveMessage(message);
    setMessages({ ...newMessages });
  }, []);

  const addUser = useCallback((newUser: User) => {
    const newUsers = usersApi.saveUser(newUser);
    setUsers({ ...newUsers });
  }, []);

  useEffect(() => {
    const userMessageEventListener = (event: MessageEvent) => {
      if (event.data.type === MessageType.user) {
        handleUserMessage(event, users, addUser);
      }
    };
    channel.addEventListener("message", userMessageEventListener);
    return () =>
      channel.removeEventListener("message", userMessageEventListener);
  }, [addUser, users]);

  useEffect(() => {
    channel.onmessageerror = (event) => {
      console.error(event);
      toast.error("Error receiving messages, please refresh the page!");
    };
  }, []);

  const chatContextValue = useMemo(
    () => ({ currentUser, messages, users, setUsers }),
    [currentUser, messages, users, setUsers]
  );

  return (
    <ChatContext.Provider value={chatContextValue}>
      <div className="flex flex-row overflow-hidden w-full h-screen justify-center">
        {currentUser ? (
          <ChatPage addMessage={addMessage} />
        ) : (
          <LoginPage setSelectedUser={setCurrentUser} />
        )}
      </div>
      <ToastContainer />
    </ChatContext.Provider>
  );
}

export default App;
