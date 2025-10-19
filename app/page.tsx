import { auth } from "@/auth";
import Container from "@/components/aetherium/Container";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  return (
    <Container>
      <h1 className="text-xl font-bold">TODO: Main Page</h1>
    </Container>
  );
}
