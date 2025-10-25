import Container from "@/components/aetherium/Container";
import GameForm from "@/components/GameForm";
import formBackground from "@/public/images/form-wallpaper.jpg";

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import GameFormSidePanel from "@/components/GameFormSidePanel";
import GameFormWrapper from "@/components/GameFormWrapper";
import { auth } from "@/auth";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { slug } = await params;
  const game = await prisma.game.findFirst({ where: { id: slug } });
  if (!game) return notFound();

  return (
    <Container
      className="w-full h-full m-auto border border-slate-500 grid grid-cols-3 
    md:w-2/3 lg:w-2/3">
      <GameFormSidePanel src={formBackground.src} />
      <GameFormWrapper id={slug} title="Modify a Game">
        {game && <GameForm game={game} />}
      </GameFormWrapper>
      <GameFormSidePanel src={formBackground.src} position="50%" />
    </Container>
  );
};

export default page;
