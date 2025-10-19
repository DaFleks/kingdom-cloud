"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import Container from "./aetherium/Container";

import Loading from "./kingdom-cloud/Loading";

import { useToggle } from "@/hooks/useToggle";
import ConfirmButton from "./kingdom-cloud/ConfirmButton";

const LoginForm = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const [isPasswordVisible, handleIsPasswordVisible] = useToggle(false);
  const [isWrongPassword, handleIsWrongPassword] = useToggle(false);
  const [isLoading, handleIsLoading] = useToggle(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    handleIsLoading();
    const response = await signIn("credentials", { ...form, redirect: false });
    console.log(response);
    handleIsLoading();

    if (response.error) handleIsWrongPassword();
    if (!response.error) router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4">
      <Container className="space-y-4">
        <Container className="flex items-center justify-between bg-gradient-to-r from-zinc-900/75 to-zinc-700/25 px-2 py-1 rounded-xl">
          <Input onChange={handleChange} type="email" id="email" name="email" placeholder="Email" />
        </Container>
        <Container className="flex items-center justify-between bg-gradient-to-r from-zinc-900/75 to-zinc-700/25 px-2 py-1 rounded-xl">
          <Input
            onChange={handleChange}
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
          />
          <Button
            variant="ghost"
            onClick={handleIsPasswordVisible}
            type="button"
            className={`${isPasswordVisible && "bg-neutral-300 text-black"}`}>
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </Container>
      </Container>

      <p className={`text-red-500 text-sm ${!isWrongPassword && "invisible"}`}>Wrong Password</p>

      <ConfirmButton>Sign In</ConfirmButton>
      {isLoading && <Loading />}
    </form>
  );
};

export default LoginForm;
