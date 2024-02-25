import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddEdit } from "../add-edit-form";
import { Metadata } from "next";
import { listSkills } from "@/clients/skills";

export const metadata: Metadata = {
  title: "Create a post",
  description: "Create a post",
};

export default async function AdminpostCreate() {
  const { skills, error: skillsError } = await listSkills();

  return (
    <div>
      <Breadcrumb pageName="Create a new post" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <AddEdit post={null} skills={skills} />
        </div>
      </div>
    </div>
  );
}
