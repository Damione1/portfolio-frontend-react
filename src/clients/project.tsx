"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ProjectItem } from "@/types/project";
import { getServerSession } from "next-auth";

export async function listPublicProjects(userId: number) {
  try {
    const apiUrl = process.env.NEXT_API_URL || "";

    const response = await fetch(
      `${apiUrl}/public/${userId}/projects?sort=-created_at`,
      {
        next: {
          revalidate: 10,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectsResponse = await response.json();
    const projects = projectsResponse.data.map((project: ProjectItem) => {
      return Object.assign({}, project) as ProjectItem;
    }) as ProjectItem[];

    return { projects, error: null };
  } catch (error: any) {
    return {
      projects: [] as ProjectItem[],
      error: error,
    };
  }
}
export async function listProjects() {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";

    const response = await fetch(`${apiUrl}/projects?sort=-created_at`, {
      next: {
        revalidate: 0,
      },
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectsResponse = await response.json();
    const projects = projectsResponse.data.map((project: ProjectItem) => {
      return Object.assign({}, project) as ProjectItem;
    }) as ProjectItem[];

    return { projects, error: null };
  } catch (error: any) {
    return {
      projects: [] as ProjectItem[],
      error: error,
    };
  }
}
export async function GetPublicProjectById(userId: number, projectId: number) {
  try {
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(
      `${apiUrl}/public/${userId}/projects/${projectId}`,
      {
        next: {
          revalidate: 10,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectData = await response.json();
    const project = Object.assign({}, projectData.data) as ProjectItem;
    return { project, error: null };
  } catch (error: any) {
    return {
      project: {} as ProjectItem,
      error: error,
    };
  }
}
export async function GetProjectById(projectId: String) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
      next: {
        revalidate: 0,
      },
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectData = await response.json();
    const project = Object.assign({}, projectData.data) as ProjectItem;
    return { project, error: null };
  } catch (error: any) {
    return {
      project: {} as ProjectItem,
      error: error,
    };
  }
}
export async function createProject(payload: ProjectItem) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/projects`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectData = await response.json();
    const project = Object.assign({}, projectData.data) as ProjectItem;
    return { project, error: null };
  } catch (error: any) {
    console.log("error", error);
    return {
      project: {} as ProjectItem,
      error: error,
    };
  }
}
export async function updateProject(projectId: number, payload: ProjectItem) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const projectData = await response.json();
    const project = Object.assign({}, projectData.data) as ProjectItem;
    return { project, error: null };
  } catch (error: any) {
    return {
      project: {} as ProjectItem,
      error: error,
    };
  }
}

export async function deleteProject(projectId: number) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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
