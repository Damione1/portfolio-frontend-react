import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { notFound } from "next/navigation";
import { AddEdit } from "../add-edit-form";
import { Metadata } from "next";
import { GetProjectById } from "../../../../clients/project";
import { listSkills } from "@/clients/skills";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Edit Project",
  description: "Edit a project",
};

export default async function AdminProjectEdit({
  params,
}: {
  params: { project_id: string };
}) {
  if (params === undefined || params.project_id === undefined) {
    notFound();
  }
  const { project, error } = await GetProjectById(params.project_id);
  if (error || !project) {
    notFound();
  }

  const { skills, error: skillsError } = await listSkills();

  return (
    <div>
      <Breadcrumb pageName="Edit Project" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {project ? (
            <AddEdit project={project} skills={skills} />
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
