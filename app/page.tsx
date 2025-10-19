import { auth } from "@/auth";
import Container from "@/components/aetherium/Container";
import ContainerBackground from "@/components/kingdom-cloud/ContainerBackground";
import { redirect } from "next/navigation";
import mainWallpaper from "@/public/images/main-wallpaper.webp";
import prisma from "@/lib/prisma";
import SignOutButton from "@/components/kingdom-cloud/SignOutButton";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const games = await prisma.game.findMany();

  return (
    <ContainerBackground imageSrc={mainWallpaper.src} alt="" objectPosition="50% 50%">
      <h1 className="text-xl font-bold">TODO: Main Page</h1>
      {games.map((game) => (
        <li key={game.id}>{game.title}</li>
      ))}
      <SignOutButton />
    </ContainerBackground>
  );
}
