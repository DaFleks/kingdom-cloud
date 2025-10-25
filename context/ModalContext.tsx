"use client";

import Container from "@/components/aetherium/Container";
import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (content?: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
}

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const openModal = (content?: React.ReactNode) => {
    if (content) setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
      {children}
      {/* Global Modal */}
      {isOpen && <Container className="fixed w-full h-full bg-black/90 z-40 flex justify-center items-center">{modalContent}</Container>}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};

export default ModalProvider;
