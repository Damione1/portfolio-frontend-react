import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddEdit } from "../add-edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Project",
  description: "Edit a project",
};

export default function AdminProjectCreate() {
  return (
    <div>
      <Breadcrumb pageName="Create a new project" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <AddEdit project={null} />
        </div>
      </div>
    </div>
  );
}
