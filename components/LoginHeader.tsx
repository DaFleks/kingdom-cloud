"use client";

import Image from "next/image";

import Container from "./aetherium/Container";

import LoginLogo from "./LoginLogo";

import loginBg from "@/public/images/login-bg.webp";

const LoginHeader = () => {
  return (
    <Container className="space-y-4 text-center p-8 flex items-center justify-center relative select-none overflow-hidden">
      <Image
        src={loginBg}
        alt="KH2 Cover"
        fill
        style={{ objectFit: "cover" }}
        className=""
        sizes="(max-width: 768px) 100vw, 25vw"
        placeholder="blur"
      />
      <Container className="relative z-10">
        <LoginLogo />
      </Container>
      <Container className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/80 to-blue-950/80" />
    </Container>
  );
};

export default LoginHeader;
