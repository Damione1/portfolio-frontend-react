"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { PostListItem } from "@/components/Tables/TableThree"
import { ProjectPost } from "@/types/project"
import { getServerSession } from "next-auth"

export async function getProjects() {
    const session = await getServerSession(authOptions);
    return fetch(`${process.env.NEXT_API_URL}/projects`,
        {
            next: {
                revalidate: 0,
            },
            headers: {
                'Authorization': `Bearer ${session?.user?.accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<ProjectPost[]>

        })
        .then((projects) => {
            const posts: PostListItem[] = projects.map((project) => {
                return {
                    title: project.title,
                    _id: project._id
                }
            }
            )
            return posts
        })
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

        if (!response.ok)
            throw new Error(response.statusText)

        const projectData = await response.json();
        const project = Object.assign({}, projectData);

        return { project, error: null };
    } catch (error: any) {
        return { project: null, error: error?.message }; // return error message, not Error object
    }
}

export async function createProject(project: ProjectPost) {
    const session = await getServerSession(authOptions);
    try {
        return fetch(`${process.env.NEXT_API_URL}/projects`,
            {
                method: 'POST',
                body: JSON.stringify(project),
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error creating project." + response.statusText)
                }

                return response.json() as Promise<ProjectPost>
            })
    } catch (error) {
        console.error(error)
    }
}




export async function updateProject(project: ProjectPost) {
    const session = await getServerSession(authOptions);
    try {
        return fetch(`${process.env.NEXT_API_URL}/projects/${project._id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(project),
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error updating project." + response.statusText)
                }

                return response.json() as Promise<ProjectPost>
            })
    } catch (error) {
        console.error(error)
    }
}


export async function deleteProject(projectId: string) {
    const session = await getServerSession(authOptions);
    try {
        return fetch(`${process.env.NEXT_API_URL}/projects/${projectId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error deleting project." + response.statusText)
                }

                return response.json() as Promise<ProjectPost>
            })
    } catch (error) {
        console.error(error)
    }
}
