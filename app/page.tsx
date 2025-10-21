import { auth } from "@/auth";
import Container from "@/components/aetherium/Container";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SignOutButton from "@/components/kingdom-cloud/SignOutButton";
import GamesList from "@/components/GamesList";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const games = await prisma.game.findMany();

  return (
    <Container
      className="mx-auto space-y-8 
    xl:w-2/3">
      <GamesList games={games} />
      <SignOutButton />
    </Container>
  );
}
