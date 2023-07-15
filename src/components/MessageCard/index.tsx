import classnames from "classnames";
import React from "react";
import { ChatMessage } from "../../types/message";
import { LinkPreview } from "../LinkPreview";

type MessageCardProps = {
  message: ChatMessage;
  className?: string;
};

export const MessageCard: React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement> & MessageCardProps
> = ({ message, className, ...rest }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const link = message.body.match(urlRegex)?.[0];

  return (
    <div
      className={classnames(
        className,
        "p-4 max-w-[70%] w-fit border-2 border-gray-200 shadow font-semibold flex flex-col",
        message.type === "SENT"
          ? "rounded-l-full self-end items-end bg-white text-black pl-10 "
          : "rounded-r-full self-start items-start bg-black text-white pr-10"
      )}
      {...rest}
    >
      <p className={classnames(message.type === "SENT" ? "ml-20" : "mr-20")}>
        {message.body}
      </p>
      {link && (
        <LinkPreview
          url={link}
          className={classnames(
            message.type === "SENT"
              ? "self-end items-end mr-0"
              : "self-start items-start ml-0"
          )}
        />
      )}
    </div>
  );
};
