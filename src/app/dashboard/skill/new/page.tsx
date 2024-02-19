import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddEditSkill } from "../add-edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Skill",
  description: "Edit a skill",
};

export default function AdminSkillCreate() {
  return (
    <div>
      <Breadcrumb pageName="Create a new skill" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <AddEditSkill skill={null} />
        </div>
      </div>
    </div>
  );
}
