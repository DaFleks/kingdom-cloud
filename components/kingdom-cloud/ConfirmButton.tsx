"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface ConfirmButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  children?: React.ReactNode;
}

const ConfirmButton = ({ children, className, ...props }: ConfirmButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        "bg-gradient-to-b from-red-900 to-red-700 hover:from-red-900/90 hover:to-red-700/90 w-full py-6 font-semibold border border-red-400 shadow shadow-red-400",
        className
      )}>
      {children}
    </Button>
  );
};

export default ConfirmButton;
