import { SessionProvider } from "next-auth/react";

import Container from "@/components/aetherium/Container";
import Login from "@/components/Login";

const page = () => {
  return (
    <Container className="h-full flex flex-col justify-center gap-4">
      <SessionProvider>
        <Login />
      </SessionProvider>
    </Container>
  );
};

export default page;
