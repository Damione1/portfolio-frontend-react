"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { PostListItem } from "@/components/Tables/TableThree"
import { ProjectPost } from "@/types/project"
import { getServerSession } from "next-auth"

export async function getProjects() {
    try {
        const session = await getServerSession(authOptions);
        const response = await fetch(`${process.env.NEXT_API_URL}/projects`,
            {
                next: {
                    revalidate: 0,
                },
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                }
            })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const projects = await response.json() as ProjectPost[]
        const posts: PostListItem[] = projects.map((project) => {
            return {
                title: project.title,
                _id: project._id
            }
        })

        return { posts, error: null }
    } catch (error: any) {
        return {
            posts: {} as PostListItem[],
            error: error.message
        }
    }
}


export async function getProjectById(projectId: String) {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/projects/${projectId}`,
            {
                next: {
                    revalidate: 0,
                },
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                }
            });

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const projectData = await response.json();
        const project = Object.assign({}, projectData) as ProjectPost;
        return { project, error: null };

    } catch (error: any) {
        return {
            project: {} as ProjectPost,
            error: error.message
        }
    }
}

export async function createProject(payload: ProjectPost) {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/projects`,
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const projectData = await response.json();
        const project = Object.assign({}, projectData) as ProjectPost;
        return { project, error: null };

    } catch (error: any) {
        return {
            project: {} as ProjectPost,
            error: error.message
        }
    }
}

export async function updateProject(payload: ProjectPost) {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/projects/${payload._id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const projectData = await response.json();
        const project = Object.assign({}, projectData) as ProjectPost;
        return { project, error: null };

    } catch (error: any) {
        return {
            project: {} as ProjectPost,
            error: error.message
        }
    }
}

export async function deleteProject(projectId: string) {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/projects/${projectId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const projectData = await response.json();
        const project = Object.assign({}, projectData);
        return { project, error: null };

    } catch (error: any) {
        return {
            project: {} as ProjectPost,
            error: error.message
        }
    }
}
