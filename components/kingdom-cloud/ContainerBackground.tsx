"use client";

import Image from "next/image";
import Container from "../aetherium/Container";
import { cn } from "@/lib/utils";

interface ContainerBackgroundProps {
  imageSrc: string;
  alt: string;
  objectPosition: string;
  children?: React.ReactNode;
  className?: string;
}

const ContainerBackground = (props: ContainerBackgroundProps) => {
  return (
    <Container className={cn("h-full max-h-full relative overflow-hidden", props.className)}>
      <Image
        className="absolute top-0 left-0 -z-10"
        src={props.imageSrc}
        alt="Kingdom Hearts themed wallpaper pattern."
        fill
        style={{ objectFit: "cover", objectPosition: props.objectPosition }}
      />
      <Container className="h-full overflow-y-auto">{props.children}</Container>
    </Container>
  );
};

export default ContainerBackground;
