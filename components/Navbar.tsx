"use client";

import Link from "next/link";
import Container from "./aetherium/Container";
import logo from "@/public/images/login-logo.png";
import Image from "next/image";
import Text from "./aetherium/Text";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useToggle } from "@/hooks/useToggle";
import { useEffect } from "react";

const Navbar = () => {
  const [isExpanded, handleIsExpanded] = useToggle(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isExpanded]);

  return (
    <>
      <Container
        as="nav"
        className={`fixed w-full z-50 overflow-hidden flex flex-col 
        xl:bg-gradient-to-b xl:from-yellow-950 xl:to-yellow-700 ${isExpanded && "h-full"}`}>
        <Container
          className="flex items-center justify-between h-[80px] p-4 bg-gradient-to-b from-yellow-950 to-yellow-700
        xl:w-2/3 xl:mx-auto">
          <Link href="/" className="flex items-center gap-4 h-full">
            <Container className="relative w-[40px] h-full">
              <Image src={logo.src} alt="" fill style={{ objectFit: "contain" }} />
            </Container>
            <Text as="span" className="mt-2">
              KINGDOM CLOUD
            </Text>
          </Link>
          <Button asChild variant="ghost" className="xl:hidden mt-1 p-2" onClick={handleIsExpanded}>
            <Menu className="w-12 h-12" />
          </Button>
        </Container>
        {isExpanded && <Container className="grow bg-neutral-800"></Container>}
      </Container>

      <Container className="h-[80px]" />
    </>
  );
};

export default Navbar;
