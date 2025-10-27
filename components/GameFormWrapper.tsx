"use client";

import { TrashIcon } from "lucide-react";
import Container from "./aetherium/Container";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useModal } from "@/context/ModalContext";
import DeleteModal from "./DeleteModal";

interface GameFormWrapperProps {
  id?: string;
  title?: string;
  children?: React.ReactNode;
}

const GameFormWrapper = (props: GameFormWrapperProps) => {
  const { openModal } = useModal();

  const handleDeleteGame = async () => {
    openModal(<DeleteModal id={props.id!} />);
  };

  return (
    <Container className="w-full p-4 col-span-3 lg:col-span-3 2xl:col-span-1 bg-slate-900/66 flex flex-col overflow-hidden">
      <Container className="flex justify-between">
        <h1 className="text-2xl">{props.title}</h1>

        {props.id && (
          <Button variant="confirm" className="!py-4 w-fit" onClick={handleDeleteGame}>
            <TrashIcon />
          </Button>
        )}
      </Container>

      <Separator className="!w-1/2 my-4 bg-gradient-to-r from-slate-500 to-transparent" />

      {props.children}
    </Container>
  );
};

export default GameFormWrapper;
