import { cn } from "@/lib/cn";
import * as React from "react";

const DashboardInput = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        autoComplete="off"
        type={type}
        className={cn(
          "flex h-10 w-full appearance-none rounded-md border border-accent bg-primary px-3 py-2 text-sm ring-accent file:border-0 file:bg-accent file:text-sm file:font-medium file:text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
DashboardInput.displayName = "DashboardInput";

export default DashboardInput;
