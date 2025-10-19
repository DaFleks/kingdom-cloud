"use client";

import Image from "next/image";
import Container from "../aetherium/Container";
import heartImage from "@/public/images/loading-logo.png";

const Loading = () => {
  return (
    <Container className="fixed top-0 left-0 inset-0 bg-black/90 flex z-50">
      <Container className="relative w-1/2 aspect-square m-auto xl:w-1/12">
        <Image src={heartImage} alt="" fill style={{ objectFit: "contain" }} />
      </Container>
    </Container>
  );
};

export default Loading;
