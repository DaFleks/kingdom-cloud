import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { Game } from "@prisma/client";
import { useImageKit } from "./useImageKit";
import { UploadResponse } from "imagekit-javascript/dist/src/interfaces";
import IKResponse from "imagekit-javascript/dist/src/interfaces/IKResponse";

type GameForm = {
  title: string;
  platform: string;
  status: string;
  price: string | undefined;
  notes: string | null;
  imageFiles: File[];
};

export const useGameForm = (game?: Game) => {
  const defaultValues = {
    title: game ? game.title : "",
    platform: game ? game.platform : "PlayStation 5",
    status: game ? game.status : "Undecided",
    price: game ? game.price?.toString() : "",
    notes: game ? game.notes : "",
    imageFiles: [],
  };

  //	IMAGEKIT HOOK
  const imagekit = useImageKit();

  //  STATE
  const [form, setForm] = useState<GameForm>(defaultValues);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(game ? game.images : []);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  //  REFS
  const fileCameraRef = useRef<HTMLInputElement | null>(null);
  const fileGalleryRef = useRef<HTMLInputElement | null>(null);

  //	HANDLE INPUT/TEXTAREA CHANGE
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      //    Actual image files
      const files = Array.from(e.target.files);
      setForm((prev) => ({ ...prev, imageFiles: [...prev.imageFiles, ...files] }));

      //    Image preview URLs
      const urls = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...urls]);

      return;
    }

    //  Text Input & Textarea
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //	HANDLE FILE INPUT CLICK
  const handleFileClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === "fileCameraBtn") fileCameraRef.current?.click();
    if (e.currentTarget.name === "fileGalleryBtn") fileGalleryRef.current?.click();
  };

  //	HANDLE SELECT CHANGE
  const handleSelectChange = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  //	HANDLE DELETE EXISTING IMAGE
  const handleDeleteExistingImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const buttonIndex = parseInt(e.currentTarget.name);
    setImagesToDelete((prev) => [...prev, existingImageUrls[buttonIndex]]);
    setExistingImageUrls((prev) => [...prev].filter((existingImageUrl, i) => i !== buttonIndex));
  };

  //	HANDLE DELETE IMAGE
  const handleDeleteImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const buttonIndex = parseInt(e.currentTarget.name);
    setForm((prev) => ({ ...prev, images: [...prev.imageFiles].filter((image, i) => i !== buttonIndex) }));
    setImagePreviews((prev) => [...prev].filter((preview, i) => i !== buttonIndex));
  };

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    let status = 201;

    const { imageFiles, ...formData } = form;

    const response = await fetch("/api/games", {
      method: game ? "PATCH" : "POST",
      body: JSON.stringify({ formData, gameId: game?.id, existingImageUrls, imagesToDelete: imagesToDelete }),
    });

    status = response.status;
    const { gameId } = await response.json();

    if (imageFiles.length !== 0) {
      const imagekitResponse = await fetch("/api/imagekit-auth", { method: "POST", body: JSON.stringify({ count: imageFiles.length }) });
      const imagekitAuth = await imagekitResponse.json();

      status = imagekitResponse.status;

      const imageUrls = await Promise.all(
        form.imageFiles.map(async (imageFile, i) => {
          return new Promise((resolve, reject) => {
            imagekit.upload(
              {
                file: imageFile,
                fileName: imageFile.name,
                folder: `/kingdom-cloud/games/${gameId}`,
                token: imagekitAuth[i].token,
                signature: imagekitAuth[i].signature,
                expire: imagekitAuth[i].expire,
              },
              function (err: unknown, result: IKResponse<UploadResponse> | null) {
                if (err) return reject(err);
                resolve(result?.url);
              }
            );
          });
        })
      );

      const updateImageResponse = await fetch("/api/games", {
        method: "PATCH",
        body: JSON.stringify({ gameId: gameId, images: [...existingImageUrls, ...imageUrls] }),
      });

      status = updateImageResponse.status;
    }
    console.log(status);
    return { status, gameId };
  };

  return {
    gameForm: {
      values: form,
      setGameForm: setForm,
      imagePreviews,
      setImagePreviews,
      existingImageUrls,
      setExistingImageUrls,
      imagesToDelete,
      setImagesToDelete,
      fileCameraRef,
      fileGalleryRef,
      submit: handleSumbit,
      handleFileClick,
      handleChange,
      handleSelectChange,
      handleDeleteImage,
      handleDeleteExistingImage,
    },
  };
};
