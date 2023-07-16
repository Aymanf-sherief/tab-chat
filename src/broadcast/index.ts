import { MessageType } from "../types/channel";
import { ChannelMessage, MessageMap } from "../types/message";
import { User, UserMap } from "../types/user";

export const channel = new window.BroadcastChannel("tabchat");

type ChannelData<T> = { type: MessageType; message: T };

/**
 * @param {MessageEvent<ChannelData<ChannelMessage>>} event - The message event
 * @param {User} currentUser - The current user
 * @param {MessageMap} messages - The messages map
 * @param {(message: ChannelMessage) => void} addMessage - The addMessage function
 * @description - Handles a chat message
 * @returns {boolean} - Whether the message was handled
 */
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
      !messages[currentUser.id]?.[incomingMessage.from.id]?.find(
        (msg) => msg.id === incomingMessage.id
      )
    ) {
      addMessage(incomingMessage);
      return true;
    }
  }
  return false;
};

/**
 * @param {MessageEvent<ChannelData<User>>} event - The message event
 * @param {UserMap} users - The users map
 * @param {(user: User) => void} addUser - The addUser function
 * @description - Handles a new user login message
 * @returns {void}
 */
export const handleUserMessage = (
  event: MessageEvent<ChannelData<User>>,
  users: UserMap,
  addUser: (user: User) => void
): void => {
  if (event.origin === origin && event.data.type === MessageType.user) {
    const newUser = event.data.message;

    if (!users?.[newUser.id]) {
      addUser(newUser);
    }
  }
};
