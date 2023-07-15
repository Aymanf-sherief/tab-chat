import { MessageType } from "../types/channel";
import { ChannelMessage, MessageMap } from "../types/message";
import { User, UserMap } from "../types/user";

export const channel = new window.BroadcastChannel("tabchat");

type ChannelData<T> = { type: MessageType; message: T };

export const handleChatMessage = (
  event: MessageEvent<ChannelData<ChannelMessage>>,
  currentUser: User,
  messages: MessageMap,
  addMessage: (message: ChannelMessage) => void
): boolean => {
  if (
    currentUser &&
    event.origin === origin &&
    event.data.type === MessageType.message
  ) {
    const incomingMessage = event.data.message;
    if (
      messages &&
      incomingMessage.to.id === currentUser.id &&
      !messages[currentUser.id]?.[incomingMessage.from.id].find(
        (msg) => msg.id === incomingMessage.id
      )
    ) {
      addMessage(incomingMessage);
      return true;
    }
  }
  return false;
};

export const handleUserMessage = (
  event: MessageEvent<ChannelData<User>>,
  users: UserMap,
  addUser: (user: User) => void
) => {
  if (event.origin === origin && event.data.type === MessageType.user) {
    const newUser = event.data.message;

    if (!users?.[newUser.id]) {
      addUser(newUser);
    }
  }
};
