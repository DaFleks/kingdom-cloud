import { redirect } from "next/navigation";
import { auth } from "@/auth";

import Container from "@/components/aetherium/Container";

import GamesList from "@/components/GamesList";

import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const games = await prisma.game.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <Container className="w-full xl:w-2/3 mx-auto">
      <GamesList games={games} />
    </Container>
  );
}
