"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "./aetherium/Container";

import { randomIntBetween } from "@/lib/utils";
import backgrounds from "@/lib/backgrounds";

const LoginSidePanel = () => {
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  useEffect(() => {
    setImageIndex(randomIntBetween(1, 17));
  }, []);

  return (
    <Container className="hidden md:block p-8 min-w-[60%] w-[60%] relative">
      {imageIndex !== null && (
        <Image
          src={backgrounds[imageIndex].src}
          fill
          alt="Login Side Wallpaper"
          objectPosition="50% 50%"
          style={{ objectFit: "cover" }}
          priority
        />
      )}

      <Container className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 to-blue-950/80" />

      <Container className="w-full h-full relative hidden md:block">
        {imageIndex !== null && (
          <Image
            src={backgrounds[imageIndex].src}
            fill
            alt="Login Side Wallpaper"
            objectPosition="50% 50%"
            style={{ objectFit: "contain", filter: "drop-shadow(0 7px 10px rgba(0,0,0,1.0))" }}
            priority
          />
        )}
      </Container>
    </Container>
  );
};

export default LoginSidePanel;
