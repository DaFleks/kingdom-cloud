"use client";

import Image from "next/image";
import Container from "../aetherium/Container";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

type ObjectFit = "cover" | "contain";

interface ContainerBackgroundProps {
  src: string;
  alt: string;
  objectPosition: string;
  objectFit: ObjectFit;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const ContainerBackground = (props: ContainerBackgroundProps) => {
  return (
    <Container className={cn("h-full max-h-full relative overflow-hidden", props.className)}>
      <Image
        className="absolute top-0 left-0 -z-10"
        src={props.src}
        alt={props.alt}
        fill
        style={{ objectFit: props.objectFit, objectPosition: props.objectPosition, ...props.style }}
      />
      <Container className="h-full">{props.children}</Container>
    </Container>
  );
};

export default ContainerBackground;
