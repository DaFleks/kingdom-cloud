"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Game } from "@prisma/client";

import { Button } from "../ui/button";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";
import Card from "../Card";

interface GameCardProps {
  game: Game;
}

const GameCard = (props: GameCardProps) => {
  return (
    <Card className="p-4 h-[180px] flex items-center justify-between gap-6">
      <Container className="flex items-center gap-6">
        <Container className="relative w-[150px] aspect-square select-none bg-gradient-to-b from-neutral-600/75 to-neutral-800/75 rounded-xl flex shadow-md shadow-neutral-900">
          {props.game.images.length === 0 && <Text className="m-auto">No Image</Text>}
          {props.game.images.length !== 0 && (
            <Image
              src={props.game.images[0]}
              alt={`Picture taken of ${props.game.title}`}
              fill
              style={{ objectFit: "contain" }}
              className="p-2"
            />
          )}
        </Container>

        <Container className="w-full">
          <Text className="text-base font-semibold mb-2 overflow-hidden">{props.game.title}</Text>
          <Text>{props.game.platform}</Text>
          <Text className="mb-4">${props.game.price?.toFixed(2)}</Text>
          <Text>{props.game.status}</Text>
        </Container>
      </Container>

      <Button variant="ghost" className="hover:bg-slate-700 hover:text-white">
        <ChevronRight />
      </Button>
    </Card>
  );
};

export default GameCard;
