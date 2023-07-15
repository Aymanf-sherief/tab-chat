import { User } from "./user";

export type ChannelMessage = { id: string; body: string; from: User; to: User };

export type ChatMessage = {
  id: string;
  body: string;
  type: "SENT" | "RECEIVED";
};

export type MessageMap = {
  [currentUserId: string]: { [userId: string]: ChatMessage[] };
};
