"use client";

import Image from "next/image";
import Container from "./aetherium/Container";
import { Button } from "./ui/button";
import { useModal } from "@/context/ModalContext";

const ImageModal = ({ src }: { src: string }) => {
  const { closeModal } = useModal();
  return (
    <Container className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col items-center gap-8 p-4">
      <Container className="relative w-full aspect-square bg-gradient-to-b from-neutral-600/75 to-neutral-800/75 rounded-xl shadow-md shadow-neutral-900">
        <Image src={src} alt="" fill style={{ objectFit: "contain" }} className="p-4" sizes="(max-width: 768px) 100vw, 50vw" />
      </Container>
      <Button
        variant="confirm"
        className="w-1/2"
        onClick={() => {
          closeModal();
        }}>
        Close
      </Button>
    </Container>
  );
};

export default ImageModal;
