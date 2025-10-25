"use client";

import Link from "next/link";
import Container from "./aetherium/Container";
import Image from "next/image";
import Text from "./aetherium/Text";
import { Button } from "./ui/button";
import { BookPlusIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import SignOutButton from "./kingdom-cloud/SignOutButton";
import { Session } from "next-auth";
import loginLogo from "@/public/images/login-logo.png";
import { usePathname } from "next/navigation";

interface NavbarClientProps {
  session: Session | null;
}

const NavbarClient = (props: NavbarClientProps) => {
  const pathname = usePathname();
  if (pathname === "/login") return;
  return (
    <>
      <Container as="header" className="fixed top-0 left-0 w-full z-30 bg-gradient-to-b from-slate-700/66 to-cyan-950/66 !overflow-hidden">
        <Container as="nav" className="xl:w-2/3 mx-auto h-[80px] p-4 flex justify-between items-center">
          <Link href="/" className="relative w-full xl:w-1/4 flex items-center gap-4">
            <Container className="relative w-[35px] aspect-square">
              <Image
                src={loginLogo.src}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                style={{ objectFit: "contain" }}
              />
            </Container>
            <Text className="text-sm w-full mt-2">KINGDOM CLOUD</Text>
          </Link>
          <Container className="space-x-12 flex items-center">
            <Button variant="ghost" size="icon">
              <Link href="/add">
                <BookPlusIcon className="!w-8 !h-8" />
              </Link>
            </Button>

            {props.session?.user && (
              <Popover>
                <PopoverTrigger className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={props.session?.user?.image as string} />
                    <AvatarFallback className="w-full h-full">CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="bg-gradient-to-b from-neutral-700/80 to-neutral-950/80 border border-slate-500 rounded-none text-white space-y-4 p-8">
                  <Avatar className="w-3/4 h-3/4 mx-auto shadow-lg shadow-neutral-950">
                    <AvatarImage src={props.session?.user?.image || ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <Text className="text-xl text-center">Hi, {props.session?.user.name}</Text>
                  <Separator className="bg-neutral-700 !w-1/2 mx-auto my-8" />
                  <Button variant="neutral">Edit Profile</Button>
                  <SignOutButton />
                </PopoverContent>
              </Popover>
            )}
          </Container>
        </Container>
      </Container>
      <Container className="!h-[80px] p-4 shrink-0" />
    </>
  );
};

export default NavbarClient;
