"use client";

import { cn } from "@/lib/utils";
import Container from "../aetherium/Container";

interface ModalProps {
  children?: React.ReactNode;
  open: boolean;
  handleIsOpen?: () => void;
  className?: string;
}

const Modal = (props: ModalProps) => {
  return (
    <Container className="fixed top-0 left-0 w-full h-full bg-black/90 z-50 flex items-center justify-center">
      <Container className={cn("p-8", props.className)}>{props.children}</Container>
    </Container>
  );
};

export default Modal;
