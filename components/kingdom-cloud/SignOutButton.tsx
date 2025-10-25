"use client";

import { signOut } from "next-auth/react";

import { Button } from "../ui/button";

import { useLoading } from "@/context/LoadingContext";

const SignOutButton = () => {
  const { showLoading, hideLoading } = useLoading();

  const handleSignOut = async () => {
    showLoading();
    await signOut({ redirectTo: "/login" });
    hideLoading();
  };

  return (
    <Button variant="confirm" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
