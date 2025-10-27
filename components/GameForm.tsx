"use client";

import { FormEvent } from "react";
import Image from "next/image";
import { CameraIcon, ImageIcon, XIcon } from "lucide-react";
import { Game } from "@prisma/client";

import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Container from "./aetherium/Container";

import GameFormCompleteModal from "./GameFormCompleteModal";
import ImageModal from "./ImageModal";

import { useLoading } from "@/context/LoadingContext";
import { useModal } from "@/context/ModalContext";
import { useGameForm } from "@/hooks/useGameForm";

import platforms from "@/lib/platforms.json";

interface GameProps {
  game?: Game;
}

const GameForm = (props: GameProps) => {
  //  Hooks
  const { gameForm } = useGameForm(props.game);
  const { showLoading, hideLoading } = useLoading();
  const { openModal } = useModal();

  const handleSubmit = async (e: FormEvent) => {
    showLoading();
    const data = await gameForm.submit(e);
    hideLoading();
    
    if (data.status === 201 || data.status === 200)
      openModal(<GameFormCompleteModal id={data.gameId} isUpdate={props.game ? true : false} />);

    if (data.status !== 201 && data.status !== 200) toast.error("There was an error, please try again.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full overflow-hidden">
      <Container className="grid grid-cols-3 gap-4">
        {/* TITLE */}
        <Container className="space-y-4 col-span-3">
          <Label htmlFor="title">Title</Label>
          <Input
            className="bg-neutral-800/80"
            type="text"
            id="title"
            name="title"
            required
            value={gameForm.values.title}
            onChange={gameForm.handleChange}
          />
        </Container>

        {/* PLATFORM */}
        <Container className="space-y-4">
          <Label htmlFor="platform">Platform</Label>
          <Select
            defaultValue={gameForm.values.platform}
            onValueChange={(value: string) => {
              gameForm.handleSelectChange("platform", value);
            }}>
            <SelectTrigger className="w-full bg-neutral-800/80 border-0 py-6 mb-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((platform, i) => (
                <SelectItem key={i} value={platform.value}>
                  {platform.output}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Container>

        {/* STATUS */}
        <Container className="space-y-4">
          <Label htmlFor="status">Status</Label>
          <Select
            defaultValue={gameForm.values.status}
            onValueChange={(value: string) => {
              gameForm.handleSelectChange("status", value);
            }}>
            <SelectTrigger className="w-full bg-neutral-800/80 border-0 py-6 mb-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Undecided">Undecided</SelectItem>
              <SelectItem value="Selling">Selling</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
              <SelectItem value="Keeping">Keeping</SelectItem>
            </SelectContent>
          </Select>
        </Container>

        {/* PRICE */}
        <Container className="space-y-4">
          <Label htmlFor="title">Price</Label>
          <Input
            className="bg-neutral-800/80"
            type="number"
            id="price"
            name="price"
            onChange={gameForm.handleChange}
            value={gameForm.values.price ?? ""}
            min="0"
            step="0.01"
          />
        </Container>

        {/* NOTES */}
        <Container className="space-y-4 col-span-3">
          <Label htmlFor="title">Notes</Label>
          <Textarea
            className="bg-neutral-800/80 h-[100px] resize-none border-0 focus-visible:ring-0"
            id="notes"
            name="notes"
            onChange={gameForm.handleChange}
            value={gameForm.values.notes!}
          />
        </Container>
      </Container>

      {/* TAKE A PHOTO BUTTON */}
      <Container className="grid grid-cols-2 gap-4">
        <Container>
          <Label htmlFor="fileCameraBtn">
            <Button id="fileCameraBtn" name="fileCameraBtn" type="button" variant="confirm" onClick={gameForm.handleFileClick}>
              <CameraIcon />
              Take a Photo
            </Button>
          </Label>
          <Input
            ref={gameForm.fileCameraRef}
            className="bg-neutral-800/80 hidden"
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            id="fileCamera"
            name="fileCamera"
            onChange={gameForm.handleChange}
          />
        </Container>

        {/* UPLOAD IMAGE BUTTON */}
        <Container>
          <Label htmlFor="images">
            <Button id="fileGalleryBtn" name="fileGalleryBtn" type="button" variant="confirm" onClick={gameForm.handleFileClick}>
              <ImageIcon />
              Upload Images
            </Button>
          </Label>
          <Input
            ref={gameForm.fileGalleryRef}
            className="bg-neutral-800/80 hidden"
            type="file"
            accept="image/*"
            multiple
            id="fileGallery"
            name="fileGallery"
            onChange={gameForm.handleChange}
          />
        </Container>
      </Container>

      {/* IMAGE PREVIEW GRID */}
      <Container className="grow grid grid-cols-3 gap-8 overflow-y-auto">
        {gameForm.existingImageUrls.map((image, i) => (
          <Container
            key={i}
            className="relative w-full !aspect-square bg-neutral-500/33 rounded-lg cursor-pointer"
            onClick={() => {
              openModal(<ImageModal src={image} />);
            }}>
            <Button
              id={i.toString()}
              name={i.toString()}
              type="button"
              className="absolute z-10 !p-1 w-fit h-fit right-2 top-2"
              onClick={gameForm.handleDeleteExistingImage}>
              <XIcon className="!w-4 !h-4" />
            </Button>
            <Image src={image} alt="" fill style={{ objectFit: "contain" }} className="p-2" sizes="(max-width: 768px) 100vw, 50vw" />
          </Container>
        ))}
        {gameForm.imagePreviews.map((imagePreview, i) => (
          <Container
            key={i}
            className="relative w-full aspect-square bg-neutral-500/33 rounded-lg"
            onClick={() => {
              openModal(<ImageModal src={imagePreview} />);
            }}>
            <Button
              id={i.toString()}
              name={i.toString()}
              type="button"
              className="absolute z-10 !p-1 w-fit h-fit right-2 top-2"
              onClick={gameForm.handleDeleteImage}>
              <XIcon className="!w-4 !h-4" />
            </Button>
            <Image src={imagePreview} alt="" fill style={{ objectFit: "contain" }} className="p-2" sizes="(max-width: 768px) 100vw, 50vw" />
          </Container>
        ))}
      </Container>

      <Button variant="confirm">{props.game ? "Confirm Changes" : "Add Game"}</Button>
    </form>
  );
};

export default GameForm;
