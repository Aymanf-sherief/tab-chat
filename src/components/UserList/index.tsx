import React, { useCallback, useContext } from "react";
import { User } from "../../types/user";
import { ChatContext } from "../../App";
import { usersApi } from "../../api";
import { Button } from "../shared/Button";
import { UserCard } from "../shared/UserCard";

export interface UserListProps {
  selectedUser?: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserList: React.FC<UserListProps> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const { currentUser, users, setUsers } = useContext(ChatContext);

  const handleUserClick = useCallback(
    (user: User) => setSelectedUser(user),
    [setSelectedUser]
  );

  const handleRefreshUsersClick = useCallback(() => {
    const storedUsers = usersApi.getUsersMap();
    setUsers?.(storedUsers);
  }, [setUsers]);

  return (
    <div className="flex flex-col gap-4 bg-white py-2 text-center overflow-hidden h-[80%]">
      {users && Object.keys(users).length > 0 ? (
        <div className="overflow-y-auto py-2">
          {Object.keys(users)
            .filter((userId) => userId !== currentUser?.id)
            .map((userId) => (
              <UserCard
                user={users[userId]}
                selected={selectedUser?.id === userId}
                key={userId}
                onClick={() => handleUserClick(users[userId])}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-black">
          There are currently no online users!
        </div>
      )}
      <Button className="self-center" onClick={handleRefreshUsersClick}>
        Refresh Users
      </Button>
    </div>
  );
};
