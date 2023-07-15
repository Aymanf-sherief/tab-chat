import { MessageMap } from "./message";
import { User, UserMap } from "./user";
import React from "react";

export type ChatContextType = {
  currentUser?: User;
  users?: UserMap;
  setUsers?: React.Dispatch<React.SetStateAction<UserMap>>;
  messages?: MessageMap;
};
