"use client";

import { Game } from "@prisma/client";
import Container from "./aetherium/Container";
import GameCard from "./kingdom-cloud/GameCard";
import Text from "./aetherium/Text";

interface GamesList {
  games?: Game[];
}

const GamesList = (props: GamesList) => {
  return (
    <>
      {(props.games) ? (
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {props.games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Container>
      ) : (
        <Text className="text-center">No Games Found!</Text>
      )}
    </>
  );
};
export default GamesList;
