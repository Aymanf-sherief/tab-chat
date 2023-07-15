import classnames from "classnames";
import React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }
> = ({ className, ...rest }) => {
  return (
    <button
      className={classnames(
        className,
        "bg-gray-800 hover:bg-gray-900 text-white font-bold p-2 px-4 rounded w-fit"
      )}
      {...rest}
    />
  );
};
