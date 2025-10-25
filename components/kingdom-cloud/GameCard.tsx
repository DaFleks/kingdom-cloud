"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Game } from "@prisma/client";

import { Button } from "../ui/button";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";
import Card from "../Card";
import Link from "next/link";

interface GameCardProps {
  game: Game;
}

const GameCard = (props: GameCardProps) => {
  return (
    <Card className="flex items-center gap-4 p-4">
      <Container className="relative w-1/2 aspect-square select-none bg-gradient-to-b from-neutral-600/75 to-neutral-800/75 rounded-xl flex shadow-md shadow-neutral-900">
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
        <Container className="mb-2">
          <Link href={`/games/${props.game.id}`}>
            <Text className="text-lg font-semibold overflow-hidden">{props.game.title}</Text>
          </Link>
          <Text className="text-amber-500">{props.game.platform}</Text>
        </Container>

        <Container className="space-y-2">
          {props.game.price !== 0 && props.game.price !== null && (
            <Text className="text-lg text-emerald-500">${props.game.price?.toFixed(2)}</Text>
          )}
          <Text>[{props.game.status}]</Text>
          <Text>{props.game.notes}</Text>
        </Container>
      </Container>

      <Button variant="ghost" className="hover:bg-slate-700 hover:text-white">
        <ChevronRight />
      </Button>
    </Card>
  );
};

export default GameCard;
