"use client";

import { Game } from "@prisma/client";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";

import GameCard from "./kingdom-cloud/GameCard";

interface GamesList {
  games?: Game[];
}

const GamesList = (props: GamesList) => {
  return (
    <>
      {props.games && props.games.length !== 0 ? (
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {props.games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Container>
      ) : (
        <Text className="text-center absolute top-1/2 left-1/2 -translate-x-1/2">No Games Found!</Text>
      )}
    </>
  );
};

export default GamesList;
