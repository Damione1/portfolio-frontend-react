"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PostListItem } from "@/components/Tables/TableThree";
import { ImageItem } from "@/types/media";
import { ProjectItem } from "@/types/project";
import { getServerSession } from "next-auth";

export async function listImages() {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.NEXT_API_URL}/upload`, {
      next: {
        revalidate: 0,
      },
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const images = (await response.json()) as ImageItem[];
    console.log("images", images);
    return { images, error: null };
  } catch (error: any) {
    return {
      images: {} as ImageItem[],
      error: error.message,
    };
  }
}

export async function getProjectById(projectId: String) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/projects/${projectId}`,
      {
        next: {
          revalidate: 0,
        },
        headers: {
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectData = await response.json();
    const project = Object.assign({}, projectData) as ProjectItem;
    return { project, error: null };
  } catch (error: any) {
    return {
      project: {} as ProjectItem,
      error: error.message,
    };
  }
}

export async function createProject(payload: ProjectItem) {
  console.log("payload", payload);
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/projects`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectData = await response.json();
    const project = Object.assign({}, projectData) as ProjectItem;
    return { project, error: null };
  } catch (error: any) {
    return {
      project: {} as ProjectItem,
      error: error.message,
    };
  }
}

export async function updateProject(payload: ProjectItem) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/projects/${payload.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectData = await response.json();
    const project = Object.assign({}, projectData) as ProjectItem;
    return { project, error: null };
  } catch (error: any) {
    return {
      project: {} as ProjectItem,
      error: error.message,
    };
  }
}

export async function deleteProject(projectId: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectData = await response.json();
    const project = Object.assign({}, projectData);
    return { project, error: null };
  } catch (error: any) {
    return {
      project: {} as ProjectItem,
      error: error.message,
    };
  }
}
