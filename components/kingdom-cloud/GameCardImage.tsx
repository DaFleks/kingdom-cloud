"use client";

import Image from "next/image";
import Container from "../aetherium/Container";
import Text from "../aetherium/Text";
import ImageModal from "../ui/ImageModal";
import { useModal } from "@/context/ModalContext";

interface GameCardImageProps {
  src: string;
  title?: string;
}

const GameCardImage = (props: GameCardImageProps) => {
  const { openModal } = useModal();
  return (
    <Container
      onClick={() => {
        openModal(<ImageModal src={props.src} />);
      }}
      className="cursor-pointer relative min-w-1/4 aspect-square select-none bg-gradient-to-b from-neutral-600/75 to-neutral-800/75 rounded-xl flex justify-center items-center shadow-md shadow-neutral-900">
      {props.src ? (
        <Image
          src={props.src}
          alt={`Picture taken of ${props.title}`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
          style={{ objectFit: "contain" }}
          className="p-2"
        />
      ) : (
        <Text>No Image</Text>
      )}
    </Container>
  );
};

export default GameCardImage;
