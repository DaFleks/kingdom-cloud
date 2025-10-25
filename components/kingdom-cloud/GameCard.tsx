"use client";

import { ChevronRight } from "lucide-react";
import { Game } from "@prisma/client";

import { Button } from "../ui/button";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";

import Link from "next/link";
import GameCardImage from "./GameCardImage";
import Card from "./Card";

interface GameCardProps {
  game: Game;
}

const GameCard = (props: GameCardProps) => {
  return (
    <Card className="flex items-center gap-4 p-4">
      {/* IMAGE */}
      <GameCardImage src={props.game.images[0]} />

      {/* TITLE & PLATFORM */}
      <Container className="w-full overflow-hidden">
        <Container className="mb-2">
          <Link href={`/games/${props.game.id}`}>
            <Text className="text-lg font-semibold break-words">{props.game.title}</Text>
          </Link>
          <Text className="text-amber-500">{props.game.platform}</Text>
        </Container>

        {/* PRICE, STATUS & NOTES */}
        <Container className="space-y-2">
          {props.game.price !== 0 && props.game.price !== null && (
            <Text className="text-lg text-emerald-500">${props.game.price?.toFixed(2)}</Text>
          )}
          <Text>[{props.game.status}]</Text>
          <Text>{props.game.notes}</Text>
        </Container>
      </Container>

      <Link href={`/games/${props.game.id}`}>
        <Button variant="ghost" className="hover:bg-slate-700 hover:text-white">
          <ChevronRight />
        </Button>
      </Link>
    </Card>
  );
};

export default GameCard;
