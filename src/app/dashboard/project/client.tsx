import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ProjectItem } from "@/types/project";
import { getServerSession } from "next-auth";

export class ProjectService {
  private session: ReturnType<typeof getServerSession>;
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.NEXT_API_URL || "";
    this.session = getServerSession(authOptions);
  }

  async listProjects() {
    try {
      const session = (await this.session) as any;
      const response = await fetch(`${this.apiUrl}/projects`, {
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
  async GetProjectById(projectId: String) {
    try {
      const session = (await this.session) as any;
      const response = await fetch(`${this.apiUrl}/projects/${projectId}`, {
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
  async createProject(payload: ProjectItem) {
    try {
      const session = (await this.session) as any;
      const response = await fetch(`${this.apiUrl}/projects`, {
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
  async updateProject(projectId: number, payload: ProjectItem) {
    try {
      const session = (await this.session) as any;
      const response = await fetch(`${this.apiUrl}/projects`, {
        method: "PATCH",
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
  async deleteProject(projectId: number) {
    try {
      const session = (await this.session) as any;
      const response = await fetch(`${this.apiUrl}/projects`, {
        method: "DELETE",
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
}
