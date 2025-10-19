"use client";

import { signOut } from "next-auth/react";

import ConfirmButton from "./ConfirmButton";
import Loading from "./Loading";

import { useToggle } from "@/hooks/useToggle";

const SignOutButton = () => {
  const [isLoading, handleIsLoading] = useToggle(false);

  const handleSignOut = async () => {
    handleIsLoading();
    await signOut({ redirectTo: "/login" });
  };

  return (
    <>
      <ConfirmButton onClick={handleSignOut}>Sign Out</ConfirmButton>
      {isLoading && <Loading />}
    </>
  );
};

export default SignOutButton;
