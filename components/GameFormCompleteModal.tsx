"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

import Container from "./aetherium/Container";

import { useModal } from "@/context/ModalContext";
import ModalIcon from "./kingdom-cloud/ModalIcon";
import { CloudCheckIcon } from "lucide-react";

const GameFormCompleteModal = ({ id, isUpdate = false }: { id: string; isUpdate?: boolean }) => {
  const router = useRouter();
  const { closeModal } = useModal();

  const handleActions = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.name);
    switch (e.currentTarget.name) {
      case "add":
        window.location.reload();
        break;
      case "continue":
        router.push(`/games/${id}`);
        break;
      case "back":
        router.push(`/`);
        break;
    }
    closeModal();
  };

  return (
    <Container
      className="w-full p-8 mx-auto space-y-8
    md:w-1/2 xl:w-1/3 2xl:w-1/4">
      <ModalIcon icon={CloudCheckIcon} />
      <h1 className="text-2xl text-center">Game Successfully {isUpdate ? "Updated" : "Added"}!</h1>

      <Button id="add" name="add" variant="confirm" onClick={handleActions}>
        {isUpdate ? "Add a New Game" : "Add Another Game"}
      </Button>
      <Button id="continue" name="continue" variant="confirm" onClick={handleActions}>
        Continue Editing This Game
      </Button>
      <Button id="back" name="back" variant="confirm" onClick={handleActions}>
        Go back to Main Page
      </Button>
    </Container>
  );
};

export default GameFormCompleteModal;
