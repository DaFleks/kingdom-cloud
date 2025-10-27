import ImageKit from "imagekit-javascript";

export function useImageKit() {
  let imagekit = null;

  imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  });

  return imagekit;
}
