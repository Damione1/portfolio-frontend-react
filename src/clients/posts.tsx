"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PostItem } from "@/types/post";
import { getServerSession } from "next-auth";

export async function listPublicPosts(userId: number) {
  try {
    const apiUrl = process.env.NEXT_API_URL || "";

    const response = await fetch(
      `${apiUrl}/public/${userId}/posts?sort=-created_at`,
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

    const postsResponse = await response.json();
    const posts = postsResponse.data.map((post: PostItem) => {
      return Object.assign({}, post) as PostItem;
    }) as PostItem[];

    return { posts, error: null };
  } catch (error: any) {
    return {
      posts: [] as PostItem[],
      error: error,
    };
  }
}
export async function listPosts() {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";

    const response = await fetch(`${apiUrl}/posts?sort=-created_at`, {
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

    const postsResponse = await response.json();
    const posts = postsResponse.data.map((post: PostItem) => {
      return Object.assign({}, post) as PostItem;
    }) as PostItem[];

    return { posts, error: null };
  } catch (error: any) {
    return {
      posts: [] as PostItem[],
      error: error,
    };
  }
}
export async function GetPublicPostById(userId: number, postId: number) {
  try {
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/public/${userId}/posts/${postId}`, {
      next: {
        revalidate: 10,
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const postData = await response.json();
    const post = Object.assign({}, postData.data) as PostItem;
    return { post, error: null };
  } catch (error: any) {
    return {
      post: {} as PostItem,
      error: error,
    };
  }
}
export async function GetPostById(postId: String) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
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

    const postData = await response.json();
    const post = Object.assign({}, postData.data) as PostItem;
    return { post, error: null };
  } catch (error: any) {
    return {
      post: {} as PostItem,
      error: error,
    };
  }
}
export async function createPost(payload: PostItem) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/posts`, {
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

    const postData = await response.json();
    const post = Object.assign({}, postData.data) as PostItem;
    return { post, error: null };
  } catch (error: any) {
    console.log("error", error);
    return {
      post: {} as PostItem,
      error: error,
    };
  }
}
export async function updatePost(postId: number, payload: PostItem) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
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

    const postData = await response.json();
    const post = Object.assign({}, postData.data) as PostItem;
    return { post, error: null };
  } catch (error: any) {
    return {
      post: {} as PostItem,
      error: error,
    };
  }
}

export async function deletePost(postId: number) {
  try {
    const session = await getServerSession(authOptions);
    const apiUrl = process.env.NEXT_API_URL || "";
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
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
