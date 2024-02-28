import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { notFound } from "next/navigation";
import { AddEdit } from "../add-edit-form";
import { Metadata } from "next";
import { listSkills } from "@/clients/skills";
import { Loader2 } from "lucide-react";
import { GetPostById } from "@/clients/posts";

export const metadata: Metadata = {
  title: "Edit post",
  description: "Edit a post",
};

export default async function AdminpostEdit({
  params,
}: {
  params: { post_id: string };
}) {
  if (params === undefined || params.post_id === undefined) {
    notFound();
  }
  const { post, error } = await GetPostById(params.post_id);
  if (error || !post) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb pageName="Edit post" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {post ? (
            <AddEdit post={post} />
          ) : (
            <span className="animate-spin mr-4">
              <Loader2 />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
