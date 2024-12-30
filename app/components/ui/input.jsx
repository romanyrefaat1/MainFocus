import { cn } from "@/app/lib/utils";
import * as React from "react";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-main bg-back px-3 py-2 text-secondaryText ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-mainDark placeholder:text-secondaryText focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
