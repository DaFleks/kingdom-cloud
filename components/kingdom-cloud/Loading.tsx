"use client";

import Image from "next/image";
import Container from "../aetherium/Container";
import heartImage from "@/public/images/loading-logo.png";
import { useLoading } from "@/hooks/LoadingContext";

const Loading = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <Container className="fixed top-0 left-0 w-full h-full bg-black/90 flex z-50">
          <Container className="relative w-1/2 aspect-square m-auto xl:w-1/12">
            <Image src={heartImage} alt="" fill style={{ objectFit: "contain" }} />
          </Container>
        </Container>
      )}
    </>
  );
};

export default Loading;
