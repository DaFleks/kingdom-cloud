import ContainerBackground from "@/components/kingdom-cloud/ContainerBackground";
import Login from "@/components/Login";
import loginWallpaper from "@/public/images/login-wallpaper.webp";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <ContainerBackground
      className="p-8 flex"
      imageSrc={loginWallpaper.src}
      alt="Kingdom Hearts Themed Wallpaper Pattern"
      objectPosition="50% 50%">
      <SessionProvider>
        <Login />
      </SessionProvider>
    </ContainerBackground>
  );
};

export default page;
