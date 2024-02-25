"use client";
import Link from "next/link";
import { formatDate } from "@/helpers/date";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { PostItem, PostStatus } from "@/types/post";
import { deletePost, listPosts } from "@/clients/posts";

const getButtonStyles = (status: string) => {
  switch (status as PostStatus) {
    case PostStatus.Archived:
      return "inline-flex rounded bg-[#F9C107] py-1 px-2 text-sm font-medium text-[#212B36] hover:bg-opacity-90";
    case PostStatus.Published:
      return "inline-flex rounded bg-[#3CA745] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90";
    case PostStatus.Draft:
      return "inline-flex rounded bg-[#3BA2B8] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90";
    default:
      return "inline-flex rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90"; // default styles
  }
};

export default function ProjetListing() {
  const [postsList, setpostsList] = useState([] as PostItem[]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const { error, posts } = await listPosts();
      if (error) {
        setIsFetching(false);
        setError(error);
        return;
      }
      setIsFetching(false);
      setpostsList(posts);
    }
    fetchData();
  }, []);

  async function deleteThispost(id: number) {
    const updatedposts = postsList.filter((post) => post.id !== id);
    setpostsList(updatedposts);

    const { error } = await deletePost(id);
    if (error) {
      setpostsList(postsList);
      alert(`Api error: ${error}`);
    }
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
            Status
          </th>
          <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
            Title
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Created At
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Updated At
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {postsList.map((post, key) => (
          <tr key={key}>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <button className={getButtonStyles(post.status)}>
                {post.status}
              </button>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {post.title}
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {post.created_at !== ""
                  ? formatDate(post.created_at.toString(), true)
                  : "N/A"}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {post.updated_at !== ""
                  ? formatDate(post.updated_at.toString(), true)
                  : "N/A"}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Link
                  className="hover:text-primary"
                  href={`/dashboard/post/${post.id}`}
                >
                  <Pencil />
                </Link>
                <button
                  className="hover:text-primary"
                  onClick={(e) => {
                    deleteThispost(post.id);
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            </td>
          </tr>
        ))}

        {isFetching && (
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                Loading
              </h5>
            </td>
          </tr>
        )}

        {postsList.length === 0 && !isFetching && (
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {error !== "" ? error : "No posts found"}
              </h5>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
