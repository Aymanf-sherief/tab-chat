import React from "react";
import { User } from "../../types/user";
import { UserCard } from "../shared/UserCard";

export interface TopBarProps {
  currentUser?: User;
}

export const TopBar: React.FC<TopBarProps> = ({ currentUser }) => (
  <nav className="bg-white shadow">
    {currentUser && (
      <UserCard user={currentUser} subtext="You are logged in!" />
    )}
  </nav>
);
