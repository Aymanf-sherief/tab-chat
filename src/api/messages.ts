import { channel } from "../broadcast";
import { MESSAGES_STORE_NAME, MessageType } from "../types/channel";
import { ChannelMessage, ChatMessage, MessageMap } from "../types/message";

export const getMessagesMap = (): MessageMap => {
  return JSON.parse(localStorage.getItem(MESSAGES_STORE_NAME) ?? "{}");
};

export const saveMessage = (message: ChannelMessage): MessageMap => {
  const messages = getMessagesMap();
  if (!messages[message.from.id]) {
    messages[message.from.id] = {};
  }

  if (!messages[message.to.id]) {
    messages[message.to.id] = {};
  }

  if (!messages[message.from.id][message.to.id]) {
    messages[message.from.id][message.to.id] = [];
  }
  if (!messages[message.to.id][message.from.id]) {
    messages[message.to.id][message.from.id] = [];
  }
  const sentMessage: ChatMessage = {
    id: message.id,
    body: message.body,
    type: "SENT",
  };

  const receivedMessage: ChatMessage = {
    id: message.id,
    body: message.body,
    type: "RECEIVED",
  };
  if (
    !messages[message.from.id][message.to.id].find(
      (msg) => msg.id === message.id
    )
  ) {
    messages[message.from.id][message.to.id].push(sentMessage);
  }
  if (
    !messages[message.to.id][message.from.id].find(
      (msg) => msg.id === message.id
    )
  ) {
    messages[message.to.id][message.from.id].push(receivedMessage);
  }

  localStorage.setItem(MESSAGES_STORE_NAME, JSON.stringify(messages));
  return messages;
};

export const broadcastMessage = (message: ChannelMessage): void => {
  channel.postMessage({ type: MessageType.message, message });
};
