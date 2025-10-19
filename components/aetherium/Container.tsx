import { cn } from "@/lib/utils";
import React from "react";

type Containers = "div" | "header" | "nav" | "main" | "section" | "article" | "aside" | "footer";

type ContainerProps<T extends Containers = "div"> = {
  as?: T;
  padded?: boolean;
  center?: boolean;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "ref" | "as" | "className">;

const Container = <T extends Containers = "div">({ as, padded, center, className, ...rest }: ContainerProps<T>) => {
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag className={cn(className, padded && "p-8", center && "mx-auto")} {...rest}>
      {rest.children}
    </Tag>
  );
};

export default Container;
