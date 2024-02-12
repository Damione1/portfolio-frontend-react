import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ImageItem } from "@/types/media";
import { getServerSession } from "next-auth";

export async function uploadImage(imageBlob: Blob) {
  const session = await getServerSession(authOptions);
  const data = new FormData();
  data.append("image", imageBlob);
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/images`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const imageData = await response.json();
    const image = Object.assign({}, imageData.data) as ImageItem;
    return { image, error: null };
  } catch (error: any) {
    console.log("error", error);
    return {
      image: {} as ImageItem,
      error: error.message,
    };
  }
}
