"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Variant = "display" | "title" | "subtitle" | "section" | "caption";

type HeadingProps<T extends Headings = "h2"> = {
  as?: T;
  variant?: Variant;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "ref" | "className">;

const classesByVariant: Record<Variant, string> = {
  display: "text-lg", // example with more styles: text-3xl font-semibold
  title: "text-base",
  subtitle: "text-sm",
  section: "text-xs",
  caption: "text-tiny",
};

const Heading = <T extends Headings = "h2">({
  as,
  variant = "title",
  className,
  ...rest
}: HeadingProps<T>) => {
  const Tag = (as ?? "h2") as React.ElementType;
  return <Tag className={cn(className, classesByVariant[variant])} {...rest} />;
};

export default Heading;