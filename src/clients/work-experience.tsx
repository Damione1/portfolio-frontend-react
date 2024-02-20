"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PostListItem } from "@/components/Tables/TableThree";
import { WorkExperienceItem } from "@/types/experience";
import { getServerSession } from "next-auth";

export async function listWorkExperiences() {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(
      `${process.env.NEXT_API_URL}/experiences?sort=-created_at`,
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

    const workExperiencesResponse = await response.json();
    const workExperiences = workExperiencesResponse.data.map(
      (workExperience: WorkExperienceItem) => {
        return Object.assign({}, workExperience) as WorkExperienceItem;
      }
    ) as WorkExperienceItem[];

    return { workExperiences, error: null };
  } catch (error: any) {
    return {
      workExperiences: {} as WorkExperienceItem[],
      error: error.message,
    };
  }
}

export async function getWorkExperienceById(WorkExperienceId: String) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/experiences/${WorkExperienceId}`,
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

    const WorkExperienceData = await response.json();
    const workExperience = Object.assign(
      {},
      WorkExperienceData.data
    ) as WorkExperienceItem;
    return { workExperience, error: null };
  } catch (error: any) {
    return {
      workExperience: {} as WorkExperienceItem,
      error: error.message,
    };
  }
}

export async function createWorkExperience(payload: WorkExperienceItem) {
  console.log("payload", payload);
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/experiences`, {
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

    const WorkExperienceData = await response.json();
    const workExperience = Object.assign(
      {},
      WorkExperienceData.data
    ) as WorkExperienceItem;
    return { workExperience, error: null };
  } catch (error: any) {
    return {
      workExperience: {} as WorkExperienceItem,
      error: error.message,
    };
  }
}

export async function updateWorkExperience(
  experienceId: number,
  payload: WorkExperienceItem
) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/experiences/${experienceId}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
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

    const WorkExperienceData = await response.json();
    const WorkExperience = Object.assign(
      {},
      WorkExperienceData
    ) as WorkExperienceItem;
    return { WorkExperience, error: null };
  } catch (error: any) {
    return {
      WorkExperience: {} as WorkExperienceItem,
      error: error.message,
    };
  }
}

export async function deleteWorkExperience(WorkExperienceId: number) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/experiences/${WorkExperienceId}`,
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
      error: error.message,
    };
  }
}
