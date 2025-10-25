"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import Container from "../aetherium/Container";
import heartImage from "@/public/images/loading-logo.png";
import { useLoading } from "@/context/LoadingContext";

const Loading = () => {
  const { isLoading } = useLoading();
  const MotionContainer = motion(Container);

  return (
    <>
      {isLoading && (
        <Container className="fixed top-0 left-0 w-full h-full bg-black/90 flex z-50">
          <MotionContainer
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
            className="relative w-1/2 aspect-square m-auto xl:w-1/12">
            <Image src={heartImage} alt="" fill style={{ objectFit: "contain" }} />
          </MotionContainer>
        </Container>
      )}
    </>
  );
};

export default Loading;
