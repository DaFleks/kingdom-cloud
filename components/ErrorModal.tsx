"use client";

import { useModal } from "@/context/ModalContext";
import Container from "./aetherium/Container";
import { Button } from "./ui/button";

const ErrorModal = () => {
  const { closeModal } = useModal();

  return (
    <Container
      className="w-full p-8 mx-auto space-y-8
    md:w-1/2 xl:w-1/3 2xl:w-1/4">
      <h1 className="text-2xl text-center">There was an error.</h1>
      <Button
        variant="confirm"
        onClick={() => {
          closeModal();
        }}>
        Close
      </Button>
    </Container>
  );
};

export default ErrorModal;
