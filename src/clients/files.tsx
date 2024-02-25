"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ImageItem } from "@/types/media";
import { getServerSession } from "next-auth";

export async function listImages() {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(
      `${process.env.NEXT_API_URL}/images?sort=-created_at`,
      {
        next: {
          revalidate: 0,
        },
        headers: {
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const imagesResponse = await response.json();
    const images = imagesResponse.data.map((image: ImageItem) => {
      return Object.assign({}, image) as ImageItem;
    }) as ImageItem[];
    return { images, error: null };
  } catch (error: any) {
    return {
      images: {} as ImageItem[],
      error: error,
    };
  }
}

export async function getImageById(imageId: String) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/images/${imageId}`,

      {
        next: {
          revalidate: 0,
        },
        headers: {
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const imageData = await response.json();
    const image = Object.assign({}, imageData.data) as ImageItem;
    return { image, error: null };
  } catch (error: any) {
    return {
      image: {} as ImageItem,
      error: error,
    };
  }
}

export async function uploadImage(formData: FormData) {
  const image = formData.get("image") as File;

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

export async function deleteImage(imageId: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/images/${imageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return { error: null };
  } catch (error: any) {
    return {
      error: error,
    };
  }
}
