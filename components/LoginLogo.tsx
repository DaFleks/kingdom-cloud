"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

import Container from "./aetherium/Container";
import logo from "@/public/images/login-logo.png";

interface LoginLogoProps {
  className?: string;
}

const LoginLogo = (props: LoginLogoProps) => {
  return (
    <Container className={cn("flex flex-col gap-4", props.className)}>
      <Container className="w-1/4 aspect-square relative overflow-hidden m-auto">
        <Image src={logo} alt="" fill style={{ objectFit: "contain" }} />
      </Container>
      <h1 className="text-4xl text-center font-bold">KINGDOM CLOUD</h1>
    </Container>
  );
};

export default LoginLogo;
