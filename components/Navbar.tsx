"use client";

import Link from "next/link";
import { FilePlusIcon } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Container from "./aetherium/Container";
import loginLogo from "@/public/images/login-logo.png";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  if (session) console.log(session.user?.image);
  const pathname = usePathname();

  if (pathname === "/login") return;
  return (
    <>
      <Container as="header" className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-yellow-700 to-yellow-950 !overflow-hidden">
        <Container as="nav" className="xl:w-2/3 mx-auto h-[80px] p-4 flex justify-between items-center">
          <Link href="/" className="relative flex h-full w-8">
            <Image src={loginLogo.src} alt="" fill style={{ objectFit: "contain" }} />
          </Link>

          <Container className="space-x-12 flex items-center">
            <Button variant="ghost" size="icon">
              <FilePlusIcon className="!w-8 !h-8" />
            </Button>

            <Button variant="ghost" size="icon">
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </Container>
        </Container>
      </Container>
      <Container className="!h-[80px] p-4 shrink-0"/>
    </>
  );
};

export default Navbar;
