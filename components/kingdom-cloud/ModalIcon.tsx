"use client";

import { motion } from "framer-motion";

import Container from "../aetherium/Container";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalIconProps {
  icon: LucideIcon;
  className?: string;
}

const ModalIcon = (props: ModalIconProps) => {
  const MotionContainer = motion(Container);
  return (
    <MotionContainer
      initial={{ scale: 0, rotateZ: 180 }}
      animate={{ scale: [0, 1.5, 1], rotateZ: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-1/2 h-1/2 mx-auto", props.className)}>
      <props.icon className="!w-full !h-full" />
    </MotionContainer>
  );
};

export default ModalIcon;
