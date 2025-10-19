"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "./aetherium/Container";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginLogo from "./LoginLogo";

import googleIcon from "@/public/icons/google-icon.png";
import discordIcon from "@/public/icons/discord-icon.png";

const Login = () => {
  return (
    <Container className="w-full h-full flex flex-col justify-center gap-8 mx-auto xl:w-1/5">
      {/* Crown Logo */}
      <LoginLogo />

      <Container className="flex flex-col gap-8 bg-neutral-800/90 rounded-xl justify-center border-4 border-neutral-700 xl:col-span-2">
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
            <Image src={googleIcon.src} alt="" fill style={{ objectFit: "contain" }} className="p-4" />
          </Button>
          <Button className="relative w-16 h-16">
            <Image src={discordIcon.src} alt="" fill style={{ objectFit: "contain" }} className="p-4" />
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default Login;
