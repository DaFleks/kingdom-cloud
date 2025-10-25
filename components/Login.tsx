"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "./aetherium/Container";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import LoginSidePanel from "./LoginSidePanel";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

import googleIcon from "@/public/icons/google-icon.png";
import discordIcon from "@/public/icons/discord-icon.png";

const Login = () => {
  return (
    <Container className="flex justify-center m-auto w-full h-fit border border-neutral-500 shadow-lg shadow-neutral-950 overflow-hidden">
      <LoginSidePanel />

      <Container className="w-full m-auto flex flex-col gap-8 bg-neutral-800/90 justify-between ">
        {/* Header */}
        <LoginHeader />

        {/* Form */}
        <LoginForm />

        <Link href="#" className="text-xs text-center block">
          Forgot password?
        </Link>

        <Separator className="bg-neutral-700 !w-1/4 mx-auto" />

        {/* OAuth Options */}
        <Container className="mx-auto w-fit space-x-4 pb-4">
          <Button className="relative w-16 h-16">
            <Image src={googleIcon.src} alt="Google Icon Image" fill sizes="w" style={{ objectFit: "contain" }} className="p-4" />
          </Button>
          <Button className="relative w-16 h-16">
            <Image src={discordIcon.src} alt="Discord Icon Image" fill sizes="w" style={{ objectFit: "contain" }} className="p-4" />
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default Login;
