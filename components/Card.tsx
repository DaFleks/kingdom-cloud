"use client";

import { cn } from "@/lib/utils";
import Container from "./aetherium/Container";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card = (props: CardProps) => {
  return (
    <Container className={cn("border border-slate-600 bg-gradient-to-b from-slate-950/33 to-slate-400/33 text-sm shadow-lg shadow-neutral-900 overflow-hidden", props.className)}>
      {props.children}
    </Container>
  );
};

export default Card;
