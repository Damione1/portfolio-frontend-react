import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { listProjects } from "./client";
import Link from "next/link";
import { Metadata } from "next";
import ProjetListing from "./projet-listing";

export const metadata: Metadata = {
  title: "Projects",
  description: "Add or edit a project",
};

export default function AdminProjectsListing() {
  return (
    <div key="admin-projects-listing">
      <Breadcrumb pageName="Projects" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <ProjetListing />
          </div>
        </div>
      </div>
      <Link
        href="/dashboard/project/new"
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-4"
      >
        Create a new project
      </Link>
    </div>
  );
}
