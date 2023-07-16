import { MessageMap } from "./message";
import { User, UserMap } from "./user";
import React from "react";

// global context, used to share state between components for values used in multiple places
export type ChatContextType = {
  currentUser?: User;
  users?: UserMap;
  setUsers?: React.Dispatch<React.SetStateAction<UserMap>>;
  messages?: MessageMap;
};
