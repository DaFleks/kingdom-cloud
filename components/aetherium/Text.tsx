"use client";

import React from "react";

type Texts = "p" | "span";

type TextProps<T extends Texts = "p"> = {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, "ref">;

const Text = <T extends Texts = "p">({ as, ...rest }: TextProps<T>) => {
  const Tag = (as ?? "p") as React.ElementType;
  return <Tag {...rest} />;
};

export default Text;
