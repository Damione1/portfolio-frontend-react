"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { PostListItem } from "@/components/Tables/TableThree"
import { WorkExperiencePost } from "@/types/experience";
import { getServerSession } from "next-auth"

export async function listWorkExperiences() {
    try {
        const session = await getServerSession(authOptions);
        const response = await fetch(`${process.env.NEXT_API_URL}/workExperiences`,
            {
                next: {
                    revalidate: 0,
                },
                headers: {
                    'Authorization': `Bearer ${session?.backendTokens?.accessToken}`
                }
            })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const workExperiences = await response.json() as WorkExperiencePost[]
        const posts: PostListItem[] = workExperiences.map((workExperience) => {
            return {
                title: workExperience.title + " " + workExperience.subTitle,
                createdAt: workExperience.createdAt ?? "",
                updatedAt: workExperience.updatedAt ?? "",
                _id: workExperience._id
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

export async function getWorkExperienceById(WorkExperienceId: String) {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/workExperiences/${WorkExperienceId}`,
            {
                next: {
                    revalidate: 0,
                },
                headers: {
                    'Authorization': `Bearer ${session?.backendTokens?.accessToken}`
                }
            });

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const WorkExperienceData = await response.json();
        const WorkExperience = Object.assign({}, WorkExperienceData) as WorkExperiencePost;
        return { WorkExperience, error: null };

    } catch (error: any) {
        return {
            WorkExperience: {} as WorkExperiencePost,
            error: error.message
        }
    }
}

export async function createWorkExperience(payload: WorkExperiencePost) {
    console.log("payload", payload)
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/WorkExperiences`,
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': `Bearer ${session?.backendTokens?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const WorkExperienceData = await response.json();
        const WorkExperience = Object.assign({}, WorkExperienceData) as WorkExperiencePost;
        return { WorkExperience, error: null };

    } catch (error: any) {
        return {
            WorkExperience: {} as WorkExperiencePost,
            error: error.message
        }
    }
}

export async function updateWorkExperience(payload: WorkExperiencePost) {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/WorkExperiences/${payload._id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': `Bearer ${session?.backendTokens?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const WorkExperienceData = await response.json();
        const WorkExperience = Object.assign({}, WorkExperienceData) as WorkExperiencePost;
        return { WorkExperience, error: null };

    } catch (error: any) {
        return {
            WorkExperience: {} as WorkExperiencePost,
            error: error.message
        }
    }
}

export async function deleteWorkExperience(WorkExperienceId: string) {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/WorkExperiences/${WorkExperienceId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session?.backendTokens?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const WorkExperienceData = await response.json();
        const WorkExperience = Object.assign({}, WorkExperienceData);
        return { WorkExperience, error: null };

    } catch (error: any) {
        return {
            WorkExperience: {} as WorkExperiencePost,
            error: error.message
        }
    }
}
