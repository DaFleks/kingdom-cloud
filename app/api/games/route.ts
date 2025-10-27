import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import ImageKit from "imagekit";
import { FileObject } from "imagekit/dist/libs/interfaces";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "There was an error", status: 400 });

  const { formData } = await req.json();

  const game = await prisma.game.create({
    data: { ...formData, price: parseFloat(formData.price) },
  });

  return NextResponse.json({ message: "Game Successfully Added!", gameId: game.id }, { status: 201 });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "There was an error", status: 400 });

  const { formData, gameId, images, existingImageUrls, imagesToDelete } = await req.json();

  try {
    if (formData) {
      if (imagesToDelete.length !== 0) {
        const imageFileNames = imagesToDelete.map((imageUrl: string) => imageUrl.split("/").pop());

        const imageData = await Promise.all(
          imageFileNames.map(async (imageFileName: string) => {
            const result = (await imagekit.listFiles({ searchQuery: `name="${imageFileName}"` })) as FileObject[];
            return { fileId: result[0].fileId, url: result[0].url };
          })
        );

        await imagekit.bulkDeleteFiles(imageData.map((data) => data.fileId));
      }

      await prisma.game.update({
        data: { ...formData, price: parseFloat(formData.price), images: existingImageUrls },
        where: { id: gameId },
      });
    }

    if (!formData) {
      await prisma.game.update({
        data: { images: images },
        where: { id: gameId },
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "There was an error", status: 400 });
  }

  return NextResponse.json({ message: "Game Successfully Added!", status: 201, gameId: gameId });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "There was an error", status: 400 });
  const { id } = await req.json();

  try {
    await prisma.game.delete({ where: { id: id } });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "There was an error", status: 400 });
  }

  try {
    await imagekit.deleteFolder(`/kingdom-cloud/games/${id}`);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "Game successfully deleted!", status: 200 });
}
