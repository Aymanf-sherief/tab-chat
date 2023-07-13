import React from "react";
import { User } from "../../types/user";

export interface TopBarProps {
  currentUser?: User;
}

export const TopBar: React.FC<TopBarProps> = ({ currentUser }) => (
  <nav className="font-sans flex flex-col sm:flex-row sm:justify-stretch py-4 px-6 bg-white shadow border-b-2">
    {currentUser && (
      <div className="flex flex-row gap-2">
        <img
          className="rounded-full h-8 w-8 inline-block mr-2"
          src={currentUser.profilePicture}
        />
        <p className="text-black font-semibold">
          Hello, {currentUser.firstName} {currentUser.lastName}{" "}
        </p>
      </div>
    )}
  </nav>
);
