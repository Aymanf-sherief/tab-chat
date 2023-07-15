import React, { useCallback } from "react";

import { UserList, UserListProps } from "../../components/UserList";
import { Button } from "../../components/shared/Button";
import { usersApi } from "../../api";
import { channel } from "../../broadcast";
import { MessageType } from "../../types/channel";

export const LoginPage: React.FC<UserListProps> = ({ setSelectedUser }) => {
  const handleNewUserClick = useCallback(async () => {
    const newUser = await usersApi.getUser();
    setSelectedUser(newUser);
    usersApi.saveUser(newUser);
    channel.postMessage({
      type: MessageType.user,
      message: newUser,
    });
  }, [setSelectedUser]);

  return (
    <div className="flex flex-col gap-2 overflow-hidden w-fit p-6 text-center">
      <Button className="self-center" onClick={handleNewUserClick}>
        Login as a new user
      </Button>
      <p className="text-black font-semibold">Or</p>
      <p className="text-black font-semibold">
        Login as one of the already existing users
      </p>
      <UserList setSelectedUser={setSelectedUser} />
    </div>
  );
};

export default LoginPage;
