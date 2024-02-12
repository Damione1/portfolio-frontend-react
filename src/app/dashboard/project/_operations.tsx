import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ProjectItem } from "@/types/project";
import { getServerSession } from "next-auth";

export async function listProjects() {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.NEXT_API_URL}/projects`, {
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

    const projectsResponse = await response.json();
    const projects = projectsResponse.data.map((project: ProjectItem) => {
      return Object.assign({}, project) as ProjectItem;
    }) as ProjectItem[];

    return { projects, error: null };
  } catch (error: any) {
    return {
      projects: [] as ProjectItem[],
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
    const project = Object.assign({}, projectData.data) as ProjectItem;
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
    console.log("error", error);
    return {
      project: {} as ProjectItem,
      error: error.message,
    };
  }
}

export async function updateProject(projectId: number, payload: ProjectItem) {
  console.log("payload", payload, projectId);
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/projects/${projectId}`,
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

export async function deleteProject(projectId: number) {
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
    const project = Object.assign({}, projectData) as ProjectItem;
    return { project, error: null };
  } catch (error: any) {
    return {
      project: {} as ProjectItem,
      error: error.message,
    };
  }
}
