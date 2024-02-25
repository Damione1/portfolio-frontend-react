"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PostListItem } from "@/components/Tables/TableThree";
import { ExperienceItem, ExperienceType } from "@/types/experience";
import { getServerSession } from "next-auth";

export async function listPublicExperiences(
  userId: number,
  type: ExperienceType
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/public/${userId}/experiences?filter[type]=${type}&sort=-start_date`,
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

    const experiencesResponse = await response.json();
    const experiences = experiencesResponse.data.map(
      (experience: ExperienceItem) => {
        return Object.assign({}, experience) as ExperienceItem;
      }
    ) as ExperienceItem[];

    return { experiences, error: null };
  } catch (error: any) {
    return {
      experiences: {} as ExperienceItem[],
      error: error,
    };
  }
}
export async function listExperiences() {
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

    const experiencesResponse = await response.json();
    const experiences = experiencesResponse.data.map(
      (experience: ExperienceItem) => {
        return Object.assign({}, experience) as ExperienceItem;
      }
    ) as ExperienceItem[];

    return { experiences, error: null };
  } catch (error: any) {
    return {
      experiences: {} as ExperienceItem[],
      error: error,
    };
  }
}

export async function getPublicExperienceById(
  userId: number,
  experienceId: number
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/public/${userId}/experiences/${experienceId}`,
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

    const ExperienceData = await response.json();
    const experience = Object.assign({}, ExperienceData.data) as ExperienceItem;
    return { experience, error: null };
  } catch (error: any) {
    return {
      experience: {} as ExperienceItem,
      error: error,
    };
  }
}

export async function getExperienceById(ExperienceId: String) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/experiences/${ExperienceId}`,
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

    const ExperienceData = await response.json();
    const experience = Object.assign({}, ExperienceData.data) as ExperienceItem;
    return { experience, error: null };
  } catch (error: any) {
    return {
      experience: {} as ExperienceItem,
      error: error,
    };
  }
}

export async function createExperience(payload: ExperienceItem) {
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

    const ExperienceData = await response.json();
    const experience = Object.assign({}, ExperienceData.data) as ExperienceItem;
    return { experience, error: null };
  } catch (error: any) {
    return {
      experience: {} as ExperienceItem,
      error: error,
    };
  }
}

export async function updateExperience(
  experienceId: number,
  payload: ExperienceItem
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

    const ExperienceData = await response.json();
    const Experience = Object.assign({}, ExperienceData.data) as ExperienceItem;
    return { Experience, error: null };
  } catch (error: any) {
    return {
      Experience: {} as ExperienceItem,
      error: error,
    };
  }
}

export async function deleteExperience(ExperienceId: number) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/experiences/${ExperienceId}`,
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
