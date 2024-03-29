import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { notFound } from "next/navigation";
import { AddEdit } from "../add-edit-form";
import { Metadata } from "next";
import { listSkills } from "@/clients/skills";
import { Loader2 } from "lucide-react";
import { getExperienceById } from "@/clients/experience";

export const metadata: Metadata = {
  title: "Edit experience",
  description: "Edit a experience",
};

export default async function AdminExperienceEdit({
  params,
}: {
  params: { experience_id: string };
}) {
  if (params === undefined || params.experience_id === undefined) {
    notFound();
  }
  const { experience, error } = await getExperienceById(params.experience_id);
  if (error || !experience) {
    notFound();
  }

  const { skills, error: skillsError } = await listSkills();

  return (
    <div>
      <Breadcrumb pageName="Edit Experience" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {experience ? (
            <AddEdit experience={experience} skills={skills} />
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
