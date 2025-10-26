"use client";

import { useRouter } from "next/navigation";

import Container from "./aetherium/Container";

import { Button } from "./ui/button";
import ErrorModal from "./ErrorModal";

import { useLoading } from "@/context/LoadingContext";
import { useModal } from "@/context/ModalContext";
import { BadgeQuestionMarkIcon, ShredderIcon } from "lucide-react";
import ModalIcon from "./kingdom-cloud/ModalIcon";

const DeleteModal = ({ id }: { id: string }) => {
  const { openModal, closeModal } = useModal();
  const { showLoading, hideLoading } = useLoading();

  const router = useRouter();

  const handleDeleteGame = async () => {
    closeModal();

    showLoading();
    const response = await fetch("/api/games", { method: "DELETE", body: JSON.stringify({ id: id }) });
    const data = await response.json();
    hideLoading();

    if (data.status !== 200) openModal(<ErrorModal />);
    if (data.status === 200) openModal(PostDeleteModal);
  };

  const handleContinue = () => {
    closeModal();
    router.push("/");
  };

  const PostDeleteModal = (
    <Container
      className="w-full p-8 mx-auto space-y-8
    md:w-1/2 xl:w-1/3 2xl:w-1/4">
      <ModalIcon icon={ShredderIcon} />

      <h1 className="text-2xl text-center">This game has returned to darkness.</h1>

      <Button variant="confirm" onClick={handleContinue}>
        Continue
      </Button>
    </Container>
  );

  return (
    <Container
      className="w-full p-8 mx-auto space-y-8
    md:w-1/2 xl:w-1/3 2xl:w-1/4">
      <ModalIcon icon={BadgeQuestionMarkIcon} />
      <h1 className="text-2xl text-center">You sure you wanna do this?</h1>
      <Button id="add" name="add" variant="confirm" onClick={handleDeleteGame}>
        Let It Fade
      </Button>
      <Button
        id="continue"
        name="continue"
        variant="confirm"
        onClick={() => {
          closeModal();
        }}>
        Keep It Safe
      </Button>
    </Container>
  );
};

export default DeleteModal;
