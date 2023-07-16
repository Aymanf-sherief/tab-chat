import { channel } from "../broadcast";
import { MESSAGES_STORE_NAME, MessageType } from "../types/channel";
import { ChannelMessage, ChatMessage, MessageMap } from "../types/message";

// Mock messages api using localstorage as a BAAS

/**
 * @returns {MessageMap} - A map of messages
 * @description - Returns a map of messages from localstorage
 */
export const getMessagesMap = (): MessageMap => {
  return JSON.parse(localStorage.getItem(MESSAGES_STORE_NAME) ?? "{}");
};

/**
 * @param {ChannelMessage} message - The message to save
 * @returns {MessageMap} - A map of messages
 * @description - Saves a message to localstorage
 */
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

/**
 * @param {ChannelMessage} message - The message to broadcast
 * @description - Broadcasts a message to all clients
 * @returns {void}
 */
export const broadcastMessage = (message: ChannelMessage): void => {
  channel.postMessage({ type: MessageType.message, message });
};
