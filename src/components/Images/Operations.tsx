import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ImageItem } from "@/types/media";
import { getServerSession } from "next-auth";

export async function uploadImage(formData: FormData) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/images`, {
      method: "POST",
      body: formData,
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
