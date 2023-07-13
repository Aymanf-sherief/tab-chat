import { useEffect, useState } from "react";

import "./App.css";
import { Message } from "./types/message";
import { channel } from "./broadcast";
import { User } from "./types/user";
import { TopBar } from "./components/TopBar";
import { SideUserList } from "./components/SideUserList";
import { MessageViewer } from "./components/MessageViewer";
import { MessageBox } from "./components/MessageBox";

function App() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  useEffect(() => {
    if (currentUser || loading) return;

    const fetchUser = async () => {
      setLoading(true);
      console.log("fetching user");
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const newUser = {
        id: data.results[0].login.uuid,
        firstName: data.results[0].name.first,
        lastName: data.results[0].name.last,
        profilePicture: data.results[0].picture.thumbnail,
      };
      setCurrentUser(newUser);
      let storedUsers = JSON.parse(
        localStorage.getItem("tabchatUsers") ?? "{}"
      );
      storedUsers = { ...storedUsers, [newUser.id]: newUser };
      localStorage.setItem("tabchatUsers", JSON.stringify(storedUsers));
    };
    fetchUser()
      .then(() => setLoading(false))
      .catch(console.error);
  }, [currentUser, loading]);

  useEffect(() => {
    channel.onmessage = (event) => {
      if (
        currentUser &&
        event.origin === origin &&
        event.data.type === "tabchatMessage"
      ) {
        const incomingMessage: Message = event.data.message;
        console.log({
          incomingMessage,
          receivedMessages,
          exists: receivedMessages.find((msg) => msg.id === incomingMessage.id),
        });
        if (
          incomingMessage.to.id === currentUser.id &&
          !receivedMessages.find((msg) => msg.id === incomingMessage.id)
        ) {
          console.log("received message", incomingMessage);
          setReceivedMessages((prev) => [...prev, incomingMessage]);
        }
      }
    };
  }, [setReceivedMessages, receivedMessages, currentUser]);

  if (loading || !currentUser) {
    return <p>Loading ...</p>;
  }
  return (
    <div className="flex flex-row overflow-hidden w-full min-h-screen">
      <div className="w-full lg:w-1/4 border-r-2">
        <TopBar currentUser={currentUser} />
        <SideUserList
          currentUser={currentUser}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
        />
      </div>
      <div className="w-full lg:w-3/4">
        {selectedUser && (
          <div className="flex flex-col justify-between h-screen">
            <MessageViewer
              messages={receivedMessages}
              currentUser={currentUser}
              selectedUser={selectedUser}
            />
            <MessageBox
              currentUser={currentUser}
              selectedUser={selectedUser}
              setReceivedMessages={setReceivedMessages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
