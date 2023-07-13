import React, { useCallback, useState } from "react";
import { User } from "../../types/user";
import classnames from "classnames";

export interface SideUserListProps {
  currentUser: User;
  selectedUser?: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const SideUserList: React.FC<SideUserListProps> = ({
  currentUser,
  selectedUser,
  setSelectedUser,
}) => {
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  const handleUserClick = useCallback(
    (user: User) => setSelectedUser(user),
    [setSelectedUser]
  );

  const handleRefreshUsersClick = useCallback(() => {
    let storedUsers = JSON.parse(localStorage.getItem("tabchatUsers") ?? "{}");
    setUsers(storedUsers);
  }, [setUsers]);

  return (
    <div className="flex flex-col gap-4 bg-white py-2">
      <button className="mx-4" onClick={handleRefreshUsersClick}>
        Refresh Users
      </button>
      {Object.keys(users).length > 0 ? (
        <div className="overflow-y-scroll">
          {Object.keys(users)
            .filter((userId) => userId !== currentUser.id)
            .map((userId) => (
              <div
                className={classnames(
                  "font-bold text-sm p-4 border-b-2 text-black cursor-pointer",
                  selectedUser?.id === userId && "bg-gray-200"
                )}
                key={userId}
                onClick={() => handleUserClick(users[userId])}
              >
                <img
                  className="rounded-full h-8 w-8 inline-block mr-2"
                  src={users[userId].profilePicture}
                />
                <p>{`${users[userId].firstName} ${users[userId].lastName}`}</p>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-black">
          There are currently no online users!
        </div>
      )}
    </div>
  );
};
