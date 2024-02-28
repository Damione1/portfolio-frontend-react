import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddEdit } from "../add-edit-form";
import { Metadata } from "next";
import { listSkills } from "@/clients/skills";

export const metadata: Metadata = {
  title: "Create a project",
  description: "Create a project",
};

export default async function AdminProjectCreate() {
  const { skills, error: skillsError } = await listSkills();

  return (
    <div>
      <Breadcrumb pageName="Create a new project" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <AddEdit project={null} skills={skills} />
        </div>
      </div>
    </div>
  );
}
