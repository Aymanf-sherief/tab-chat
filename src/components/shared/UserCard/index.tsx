import classnames from "classnames";
import React from "react";
import { User } from "../../../types/user";

type UserCardProps = {
  user: User;
  selected?: boolean;
  subtext?: string;
  className?: string;
};

export const UserCard: React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement> & UserCardProps
> = ({ user, selected = false, subtext, className, ...rest }) => {
  return (
    <div
      className={classnames(
        className,
        "font-bold text-sm p-4 border text-black shadow",
        selected && "bg-gray-200",
        rest.onClick && "cursor-pointer"
      )}
      {...rest}
    >
      <div className="flex flex-row gap-2 justify-startt items-center">
        <img
          className="rounded-full h-8 w-8 inline-block m-2"
          src={user.profilePicture}
        />
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </div>
      <p className="text-black font-medium overflow-clip">{subtext}</p>
    </div>
  );
};
