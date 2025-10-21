"use client";

import { useEffect, useState } from "react";
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

import { randomIntBetween } from "@/lib/utils";

const Login = () => {
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  useEffect(() => {
    setImageIndex(randomIntBetween(1, 17));
  }, []);

  return (
    <Container
      className="flex justify-center w-full h-fit m-auto border border-neutral-500 shadow-lg shadow-neutral-950 overflow-hidden
    md:w-full lg:w-full xl:w-1/2">
      <LoginSidePanel src={`https://ik.imagekit.io/f3yl3upyd/kh${imageIndex}.webp`} alt="" />

      <Container className="w-full h-full m-auto flex flex-col gap-8 bg-neutral-800/90 justify-between ">
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
