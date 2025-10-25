import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { FileObject, FileType } from "imagekit/dist/libs/interfaces";
import { imageOptimizer } from "next/dist/server/image-optimizer";
import { createId } from "@paralleldrive/cuid2";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const imageFiles = formData.getAll("imageFiles") as File[];
  let uploaded = null;
  const newId = createId();

  if (imageFiles) {
    uploaded = await Promise.all(
      imageFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await imagekit.upload({
          file: buffer,
          fileName: file.name,
          folder: `/kingdom-cloud/games/${newId}`,
        });

        return {
          name: result.name,
          url: result.url,
          fileId: result.fileId,
          size: result.size,
          type: result.fileType,
        };
      })
    );
  }

  await prisma.game.create({
    data: {
      id: newId,
      title: formData.get("title") as string,
      platform: formData.get("platform") as string,
      status: formData.get("status") as string,
      price: parseFloat(formData.get("price") as string),
      notes: formData.get("notes") as string,
      images: uploaded?.map((image) => image.url),
    },
  });

  return NextResponse.json({ message: "Game Successfully Added!", status: 201 });
}

export async function PATCH(req: Request) {
  const formData = await req.formData();
  const imageFiles = formData.getAll("imageFiles") as File[];

  let uploaded: {
    name: string;
    url: string;
    fileId: string;
    size: number;
    type: FileType;
  }[] = [];

  if (imageFiles) {
    try {
      uploaded = await Promise.all(
        imageFiles.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const result = await imagekit.upload({
            file: buffer,
            fileName: file.name,
            folder: `/kingdom-cloud/games/${formData.get("id") as string}`,
          });

          return {
            name: result.name,
            url: result.url,
            fileId: result.fileId,
            size: result.size,
            type: result.fileType,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  const newImageUrls = [...formData.getAll("images").map((imageUrl) => imageUrl.toString()), ...uploaded.map((upload) => upload.url)];

  try {
    await prisma.game.update({
      data: {
        title: formData.get("title") as string,
        platform: formData.get("platform") as string,
        status: formData.get("status") as string,
        price: parseFloat(formData.get("price") as string),
        notes: formData.get("notes") as string,
        images: newImageUrls,
      },
      where: { id: formData.get("id") as string },
    });

    const imagesToDelete = formData.getAll("imagesToDelete").map((imageToDelete) => imageToDelete.toString().split("/").pop());

    const fileIds = await Promise.all(
      imagesToDelete.map(
        async (image) => ((await imagekit.listFiles({ searchQuery: `name="${image}"` })) as FileObject[])[0].fileId as string
      )
    );

    fileIds.forEach(async (fileId) => await imagekit.deleteFile(fileId));
  } catch (error) {
    return NextResponse.json({ message: "There was an error", status: 400 });
  }

  return NextResponse.json({ message: "Game Successfully Updated!", status: 201 });
}
