"use client";

import Image from "next/image";
import Container from "./aetherium/Container";

interface LoginSidePanelProps {
  src: string;
  alt: string;
}

const LoginSidePanel = (props: LoginSidePanelProps) => {
  return (
    <Container className="p-8 min-w-[60%] w-[60%] relative">
      <Image src={props.src} fill alt={props.alt} objectPosition="50% 50%" style={{ objectFit: "cover" }} priority />
      <Container className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 to-blue-950/80" />

      <Container className="w-full h-full relative hidden md:block">
        <Image
          src={props.src}
          fill
          alt={props.alt}
          objectPosition="50% 50%"
          style={{ objectFit: "contain", filter: "drop-shadow(0 7px 10px rgba(0,0,0,1.0))" }}
          priority
        />
      </Container>
    </Container>
  );
};

export default LoginSidePanel;
