import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../../helpers/date";
import type { Metadata } from "next";
import { listPublicPosts } from "@/clients/posts";
import { PostItem } from "@/types/post";

export const metadata: Metadata = {
  title: "Damien Goehrig - Blog",
  description: "Here are some of my blog posts",
};

const userId =
  process.env.NEXT_USER_ID && !Number.isNaN(Number(process.env.NEXT_USER_ID))
    ? Number(process.env.NEXT_USER_ID)
    : 1;

export default async function BlogListing() {
  const { posts, error } = await listPublicPosts(userId);

  return (
    <div className="blog">
      <div className="w-full p-2 sm:p-10">
        <div className="header flex items-end justify-between mb-12">
          <div className="title">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-400 ">
              My Blog
            </h1>
            <p className="text-2xl font-light text-gray-400 dark:text-gray-500">
              My discoveries, recipes, builds, and more
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {posts &&
            posts.map((blogPost: PostItem) => (
              <div
                key={blogPost.id}
                className="overflow-hidden shadow-lg rounded-lg h-90 w-100 sm:w-80 md:w-100 cursor-pointer m-auto bg-white dark:bg-boxdark"
              >
                <Link
                  href={`/blog/${blogPost.id}`}
                  className="w-full block h-full"
                >
                  {blogPost.cover_image && (
                    <Image
                      alt={blogPost.title}
                      src={blogPost.cover_image.path}
                      className="max-h-40 w-full object-cover"
                      width={320}
                      height={160}
                    />
                  )}
                  <div className="dark:bg-neutral-800 w-full p-4">
                    <p className="text-indigo-500 text-md font-medium">
                      {blogPost.title}
                    </p>
                    {blogPost.excerpt && (
                      <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                        {blogPost.excerpt}
                      </p>
                    )}
                    <div className="flex items-center mt-4">
                      <div className="flex flex-col justify-between text-sm">
                        <p className="text-gray-400 dark:text-gray-300">
                          {formatDate(blogPost.created_at.toString())}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
