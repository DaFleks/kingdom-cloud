"use client";

import Image from "next/image";
import Container from "./aetherium/Container";

const GameFormSidePanel = ({ src = "", position = "100%" }: { src: string; position?: string }) => {
  return (
    <Container className="hidden 2xl:block relative">
      <Image src={src} fill alt="Game Form Side Image" style={{ objectFit: "cover", objectPosition: position }} priority sizes="w" />
      <Container className="absolute top-0 left-0 h-full w-full bg-slate-900/50" />
    </Container>
  );
};

export default GameFormSidePanel;
