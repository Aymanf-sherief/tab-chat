import { channel } from "../broadcast";
import { config } from "../config";
import { MessageType, USERS_STORE_NAME } from "../types/channel";
import { User, UserMap } from "../types/user";

export const getUser = async (): Promise<User> => {
  const response = await fetch(config.usersApiUrl);
  const data = await response.json();
  const user: User = {
    id: data.results[0].login.uuid,
    firstName: data.results[0].name.first,
    lastName: data.results[0].name.last,
    profilePicture: data.results[0].picture.thumbnail,
  };
  return user;
};

export const getUsersMap = (): UserMap => {
  return JSON.parse(localStorage.getItem(USERS_STORE_NAME) ?? "{}");
};

export const saveUser = (user: User): UserMap => {
  const users = getUsersMap();
  users[user.id] = user;
  localStorage.setItem(USERS_STORE_NAME, JSON.stringify(users));
  return users;
};

export const broadcastUser = (user: User): void => {
  channel.postMessage({ type: MessageType.user, user });
};
