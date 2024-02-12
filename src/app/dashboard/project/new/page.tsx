import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ProjectItem } from "@/types/project";
import { AddEdit } from "../AddEditForm";

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
