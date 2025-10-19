import { auth } from "@/auth";
import Container from "@/components/aetherium/Container";
import ContainerBackground from "@/components/kingdom-cloud/ContainerBackground";
import { redirect } from "next/navigation";
import mainWallpaper from "@/public/images/main-wallpaper.webp";
import prisma from "@/lib/prisma";
import SignOutButton from "@/components/kingdom-cloud/SignOutButton";
import Card from "@/components/Card";
import Text from "@/components/aetherium/Text";
import dmcImage from "@/public/images/dmc-box.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRightCircleIcon } from "lucide-react";
import GameCard from "@/components/kingdom-cloud/GameCard";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const games = await prisma.game.findMany();

  return (
    <ContainerBackground imageSrc={mainWallpaper.src} alt="" objectPosition="50% 50%">
      <Container className="p-8 mx-auto space-y-8 xl:w-2/3">
        <h1 className="text-xl font-bold">All Games</h1>
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Container>

        <SignOutButton />
      </Container>
    </ContainerBackground>
  );
}
