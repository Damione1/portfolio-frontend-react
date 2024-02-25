import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogPost } from "../../../../types/blog";
import { GetPublicPostById } from "@/clients/posts";

export default async function BlogPost({
  params,
}: {
  params: { post_id: number };
}) {
  const userId =
    process.env.NEXT_USER_ID && !Number.isNaN(Number(process.env.NEXT_USER_ID))
      ? Number(process.env.NEXT_USER_ID)
      : 1;

  const { post, error } = await GetPublicPostById(userId, params.post_id);

  return (
    <section className="text-gray-800 body-font dark:text-gray-400">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          {post.cover_image && (
            <div className="rounded-lg h-64 overflow-hidden">
              <Image
                alt={post.title}
                className="object-cover object-center h-full w-full"
                src={post.cover_image.path}
                width={1200}
                height={300}
                blurDataURL={post.cover_image.path}
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 dark:text-gray-300 text-lg"></h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
              </div>
            </div>
            <div className="prose dark:prose-invert dark:prose-headings:text-gray-200 prose-sm sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h1>{post.title}</h1>
              <div className="leading-relaxed mb-4 text-left">
                <MDXRemote source={post.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
