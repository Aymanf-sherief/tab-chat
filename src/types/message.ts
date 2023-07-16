import { User } from "./user";

// messages when they're broadcasted over the channel
export type ChannelMessage = { id: string; body: string; from: User; to: User };

// messages when they're stored in localstorage
export type ChatMessage = {
  id: string;
  body: string;
  type: "SENT" | "RECEIVED";
};

// messages database in localstorage
// a map of user ids to a map of user ids to messages.
export type MessageMap = {
  [currentUserId: string]: { [userId: string]: ChatMessage[] };
};
