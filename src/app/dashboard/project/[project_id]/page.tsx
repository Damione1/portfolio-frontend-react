import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getProjectById } from "./../_operations";
import { notFound } from "next/navigation";
import { AddEdit } from "../AddEditForm";

export default async function AdminProjectEdit({
  params,
}: {
  params: { project_id: string };
}) {
  if (params === undefined || params.project_id === undefined) {
    notFound();
  }
  const { project, error } = await getProjectById(params.project_id);
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
