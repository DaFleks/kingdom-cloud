import { auth } from "@/auth";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekitServer = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const session = await auth();

  // ✅ Require a logged-in user
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { count } = await req.json();

  const authBatch = Array.from({ length: count }, () => {
    const token = crypto.randomUUID();
    const { expire, signature } = imagekitServer.getAuthenticationParameters(token);
    return { token, expire, signature };
  });

  const { token, expire, signature } = imagekitServer.getAuthenticationParameters();

  return NextResponse.json(authBatch);
}
