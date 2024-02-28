import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { GetSkillById } from "@/clients/skills";
import { AddEditSkill } from "../add-edit-form";

export const metadata: Metadata = {
  title: "Edit Skill",
  description: "Edit a skill",
};

export default async function AdminSkillEdit({
  params,
}: {
  params: { skill_id: string };
}) {
  if (params === undefined || params.skill_id === undefined) {
    notFound();
  }
  const { skill, error } = await GetSkillById(params.skill_id);
  if (error || !skill) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb pageName="Edit Skill" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {skill ? <AddEditSkill skill={skill} /> : <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}
