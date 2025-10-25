"use client";

import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CameraIcon, ImageIcon, XIcon } from "lucide-react";

import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Container from "./aetherium/Container";

import Modal from "./kingdom-cloud/Modal";

import { useToggle } from "@/hooks/useToggle";

import platforms from "@/lib/platforms.json";
import { Game } from "@prisma/client";
import { useLoading } from "@/hooks/LoadingContext";

type GameForm = {
  title: string;
  platform: string;
  status: string;
  price: string | undefined;
  notes: string | null;
  imageFiles: File[];
};

interface GameProps {
  game?: Game;
}

const GameForm = (props: GameProps) => {
  const defaultValues = {
    title: props.game ? props.game.title : "",
    platform: props.game ? props.game.platform : "PlayStation 5",
    status: props.game ? props.game.status : "Undecided",
    price: props.game ? props.game.price?.toString() : "",
    notes: props.game ? props.game.notes : "",
    imageFiles: [],
  };

  //  Hooks, State, Refs
  const router = useRouter();

  const [form, setForm] = useState<GameForm>(defaultValues);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(props.game ? props.game.images : []);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const { showLoading, hideLoading } = useLoading();

  const [isRegistrationComplete, handleisRegistrationComplete] = useToggle(false);

  const fileCameraRef = useRef<HTMLInputElement | null>(null);
  const fileGalleryRef = useRef<HTMLInputElement | null>(null);

  //  Handlers
  const handleFileClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === "fileCameraBtn") fileCameraRef.current?.click();
    if (e.currentTarget.name === "fileGalleryBtn") fileGalleryRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      //    Actual image files
      const files = Array.from(e.target.files);
      setForm((prev) => ({ ...prev, imageFiles: [...prev.imageFiles, ...files] }));

      //    Image preview URLs
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...urls]);

      return;
    }

    //  Text Input & Textarea
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleDeleteImage = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonIndex = parseInt(e.currentTarget.name);
    setForm((prev) => ({ ...prev, images: [...prev.imageFiles].filter((image, i) => i !== buttonIndex) }));
    setPreviews((prev) => [...prev].filter((preview, i) => i !== buttonIndex));
  };

  const handleDeleteExistingImage = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonIndex = parseInt(e.currentTarget.name);
    setImagesToDelete((prev) => [...prev, existingImageUrls[buttonIndex]]);
    setExistingImageUrls((prev) => [...prev].filter((existingImageUrl, i) => i !== buttonIndex));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    showLoading();

    const formData = new FormData();
    formData.append("title", form.title!);
    formData.append("platform", form.platform!);
    formData.append("status", form.status!);
    formData.append("price", form.price! as string);
    formData.append("notes", form.notes!);

    // Append each image file
    form.imageFiles.forEach((file) => formData.append("imageFiles", file));

    // Append any changes made to the existing images array
    if (props.game) {
      formData.append("id", props.game.id);
      existingImageUrls.forEach((imageUrl) => formData.append("images", imageUrl));
    }

    //  Images marked for deletion
    imagesToDelete.forEach((image) => formData.append("imagesToDelete", image));

    const response = await fetch("/api/games", { method: props.game ? "PATCH" : "POST", body: formData });
    const data = await response.json();

    hideLoading();

    if (data.status === 201) {
      setForm(defaultValues);
      setPreviews([]);
      handleisRegistrationComplete();
    }

    if (data.status !== 201) toast.error("There was an error, please try again.");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full overflow-hidden">
        <Container className="grid grid-cols-3 gap-8">
          {/* TITLE */}
          <Container className="space-y-4 col-span-3">
            <Label htmlFor="title">Title</Label>
            <Input className="bg-neutral-800/80" type="text" id="title" name="title" required value={form.title} onChange={handleChange} />
          </Container>

          {/* PLATFORM */}
          <Container className="space-y-4">
            <Label htmlFor="platform">Platform</Label>
            <Select
              defaultValue={form.platform}
              onValueChange={(value: string) => {
                handleSelectChange("platform", value);
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
              defaultValue={form.status}
              onValueChange={(value: string) => {
                handleSelectChange("status", value);
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
              onChange={handleChange}
              value={form.price}
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
              onChange={handleChange}
              value={form.notes!}
            />
          </Container>
        </Container>

        {/* TAKE A PHOTO BUTTON */}
        <Container className="grid grid-cols-2 gap-8">
          <Container>
            <Label htmlFor="fileCameraBtn">
              <Button id="fileCameraBtn" name="fileCameraBtn" type="button" variant="neutral" onClick={handleFileClick}>
                <CameraIcon />
                Take a Photo
              </Button>
            </Label>
            <Input
              ref={fileCameraRef}
              className="bg-neutral-800/80 hidden"
              type="file"
              accept="image/*"
              multiple
              capture="environment"
              id="fileCamera"
              name="fileCamera"
              onChange={handleChange}
            />
          </Container>

          {/* UPLOAD IMAGE BUTTON */}
          <Container>
            <Label htmlFor="images">
              <Button id="fileGalleryBtn" name="fileGalleryBtn" type="button" variant="neutral" onClick={handleFileClick}>
                <ImageIcon />
                Upload Images
              </Button>
            </Label>
            <Input
              ref={fileGalleryRef}
              className="bg-neutral-800/80 hidden"
              type="file"
              accept="image/*"
              multiple
              id="fileGallery"
              name="fileGallery"
              onChange={handleChange}
            />
          </Container>
        </Container>

        {/* IMAGE PREVIEW GRID */}
        <Container className="grow grid grid-cols-3 xl:grid-cols-4 gap-8 overflow-y-auto">
          {existingImageUrls.map((image, i) => (
            <Container key={i} className="relative w-full aspect-square bg-neutral-500/33 rounded-lg">
              <Button
                id={i.toString()}
                name={i.toString()}
                type="button"
                className="absolute z-50 !p-1 w-fit h-fit right-2 top-2"
                onClick={handleDeleteExistingImage}>
                <XIcon className="!w-4 !h-4" />
              </Button>
              <Image src={image} alt="" fill style={{ objectFit: "contain" }} className="p-2" />
            </Container>
          ))}
          {previews.map((preview, i) => (
            <Container key={i} className="relative w-full aspect-square bg-neutral-500/33 rounded-lg">
              <Button
                id={i.toString()}
                name={i.toString()}
                type="button"
                className="absolute z-50 !p-1 w-fit h-fit right-2 top-2"
                onClick={handleDeleteImage}>
                <XIcon className="!w-4 !h-4" />
              </Button>
              <Image src={preview} alt="" fill style={{ objectFit: "contain" }} className="p-2" />
            </Container>
          ))}
        </Container>
        <Container className="grid grid-cols-2 gap-4">
          {props.game && <Button variant="confirm">Delete Game</Button>}
          <Button variant="confirm" className={`${!props.game && "col-span-2"}`}>
            Add Game
          </Button>
        </Container>
      </form>

      {isRegistrationComplete && (
        <Modal open={isRegistrationComplete}>
          <Container className="w-2/3 mx-auto space-y-8">
            <h1 className="text-3xl text-center">Game Successfully Added!</h1>

            <Button variant="confirm" onClick={handleisRegistrationComplete}>
              Add Another Game
            </Button>
            <Button variant="confirm" onClick={() => {}}>
              Continue Editing This Game
            </Button>
            <Button
              variant="confirm"
              onClick={() => {
                router.push("/");
              }}>
              Go back to Main Page
            </Button>
          </Container>
        </Modal>
      )}
    </>
  );
};

export default GameForm;
