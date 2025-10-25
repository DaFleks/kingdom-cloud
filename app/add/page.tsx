import Container from "@/components/aetherium/Container";
import GameForm from "@/components/GameForm";
import Image from "next/image";
import formBackground from "@/public/images/form-wallpaper.jpg";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircleIcon } from "lucide-react";
import prisma from "@/lib/prisma";

const page = async () => {
  const game = await prisma.game.findFirst({ where: { title: ".Hack" } });
  // game!.images = [
  //   "https://images.igdb.com/igdb/image/upload/t_cover_big/co2yfi.jpg",
  //   "https://images.igdb.com/igdb/image/upload/t_cover_big/co7i1e.jpg",
  //   "https://images.igdb.com/igdb/image/upload/t_cover_big/co5t7p.jpg",
  // ];

  // if (game) await prisma.game.update({ data: game, where: { id: game!.id } });

  return (
    <Container
      className="w-full h-full m-auto border border-slate-500 flex 
    md:w-2/3 lg:w-full xl:w-2/3">
      <Container className="hidden lg:block relative w-2/3">
        <Image
          src={formBackground.src}
          fill
          alt=""
          objectPosition="50% 50%"
          style={{ objectFit: "cover", objectPosition: "100%" }}
          priority
        />
        <Container className="absolute top-0 left-0 h-full w-full bg-slate-900/33" />
      </Container>

      <Container
        className="p-4 bg-slate-900/66 flex flex-col col-span-3 w-full
      lg:col-span-2">
        <Container className="flex justify-between items-center">
          <h1 className="text-2xl">Add a Game</h1>
          <Button variant="outline">
            <ChevronLeftCircleIcon />
            Go Back
          </Button>
        </Container>

        <Separator className="!w-1/3 my-4" />
        <GameForm />
      </Container>

      <Container className="hidden lg:block relative w-2/3">
        <Image src={formBackground.src} fill alt="" objectPosition="50%" style={{ objectFit: "cover", objectPosition: "50%" }} priority />
        <Container className="absolute top-0 left-0 h-full w-full bg-slate-900/33" />
      </Container>
    </Container>
  );
};

export default page;
