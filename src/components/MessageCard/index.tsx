import classnames from "classnames";
import React from "react";
import { ChatMessage } from "../../types/message";

type MessageCardProps = {
  message: ChatMessage;
  className?: string;
};

export const MessageCard: React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement> & MessageCardProps
> = ({ message, className, ...rest }) => {
  return (
    <div
      className={classnames(
        className,
        "p-6 w-2/3 border-2 border-gray-200 shadow",
        message.type === "SENT"
          ? "rounded-l-full self-end bg-white text-black"
          : "rounded-r-full self-start bg-black text-white"
      )}
      {...rest}
    >
      {message.body}
    </div>
  );
};
