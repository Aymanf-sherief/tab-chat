import classnames from "classnames";
import React from "react";

export const Input: React.FC<
  React.ButtonHTMLAttributes<HTMLInputElement> & { className?: string }
> = ({ className, ...rest }) => {
  return (
    <input
      className={classnames(
        className,
        "rounded-full p-4 my-4 h-12 w-full mx-4 bg-gray-800"
      )}
      {...rest}
    />
  );
};
