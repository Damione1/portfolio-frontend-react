import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ProjectService } from "../client";
import { notFound } from "next/navigation";
import { AddEdit } from "../addEditForm";
import { Metadata } from "next";

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
  const projectService = new ProjectService();
  const { project, error } = await projectService.GetProjectById(
    params.project_id
  );
  if (error || !project) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb pageName="Edit Project" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {project ? <AddEdit project={project} /> : <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}
