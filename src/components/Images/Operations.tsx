"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ImageItem } from "@/types/media";
import { getServerSession } from "next-auth";

export async function uploadImage(formData: FormData) {
  const image = formData.get("image") as File;

  console.log("uploadImage, image", image);

  const formDataPayload = new FormData();
  formDataPayload.append("image", image);

  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/images`, {
      method: "POST",
      body: formDataPayload,
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        Accept: "application/json",
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
