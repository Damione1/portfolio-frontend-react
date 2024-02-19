"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SkillItem } from "@/types/skill";
import { getServerSession } from "next-auth";

export async function listSkills() {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";

    const response = await fetch(`${apiUrl}/skills`, {
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

    const skillsResponse = await response.json();
    const skills = skillsResponse.data.map((skill: SkillItem) => {
      return Object.assign({}, skill) as SkillItem;
    }) as SkillItem[];

    return { skills, error: null };
  } catch (error: any) {
    return {
      skills: [] as SkillItem[],
      error: error.message,
    };
  }
}
export async function GetSkillById(skillId: String) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/skills/${skillId}`, {
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

    const skillData = await response.json();
    const skill = Object.assign({}, skillData.data) as SkillItem;
    return { skill, error: null };
  } catch (error: any) {
    return {
      skill: {} as SkillItem,
      error: error.message,
    };
  }
}
export async function createSkill(payload: SkillItem) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/skills`, {
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

    const skillData = await response.json();
    const skill = Object.assign({}, skillData.data) as SkillItem;
    return { skill, error: null };
  } catch (error: any) {
    console.log("error", error);
    return {
      skill: {} as SkillItem,
      error: error.message,
    };
  }
}
export async function updateSkill(skillId: number, payload: SkillItem) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/skills/${skillId}`, {
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

    const skillData = await response.json();
    const skill = Object.assign({}, skillData.data) as SkillItem;
    return { skill, error: null };
  } catch (error: any) {
    return {
      skill: {} as SkillItem,
      error: error.message,
    };
  }
}

export async function deleteSkill(skillId: number) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/skills/${skillId}`, {
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
      error: error.message,
    };
  }
}
