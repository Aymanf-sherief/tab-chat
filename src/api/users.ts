import { channel } from "../broadcast";
import { config } from "../config";
import { MessageType, USERS_STORE_NAME } from "../types/channel";
import { User, UserMap } from "../types/user";

/**
 * @returns {User} - A user object
 * @description - Returns a user from the randomuser.me API
 * @see https://randomuser.me
 */
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

/**
 * @returns {UserMap} - A map of users
 * @description - Returns a map of users from localstorage
 */
export const getUsersMap = (): UserMap => {
  return JSON.parse(localStorage.getItem(USERS_STORE_NAME) ?? "{}");
};

/**
 * @param {User} user - The user to save
 * @returns {UserMap} - A map of users
 * @description - Saves a user to localstorage
 */
export const saveUser = (user: User): UserMap => {
  const users = getUsersMap();
  users[user.id] = user;
  localStorage.setItem(USERS_STORE_NAME, JSON.stringify(users));
  return users;
};

/**
 * @param {User} user - The user to broadcast
 * @description - Broadcasts a user to the channel
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
 */
export const broadcastUser = (user: User): void => {
  channel.postMessage({ type: MessageType.user, user });
};
