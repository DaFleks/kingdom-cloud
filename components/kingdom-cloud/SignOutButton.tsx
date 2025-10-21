"use client";

import { signOut } from "next-auth/react";

import Loading from "./Loading";

import { useToggle } from "@/hooks/useToggle";
import { Button } from "../ui/button";

const SignOutButton = () => {
  const [isLoading, handleIsLoading] = useToggle(false);

  const handleSignOut = async () => {
    handleIsLoading();
    await signOut({ redirectTo: "/login" });
  };

  return (
    <>
      <Button variant="confirm" onClick={handleSignOut}>
        Sign Out
      </Button>
      {isLoading && <Loading />}
    </>
  );
};

export default SignOutButton;
