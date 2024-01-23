"use server";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { getProjects } from "./_operations";
import Listing from "./(components)/_listing";


export default async function AdminProjectsListing() {
  const projectsListFromAPI = await getProjects();

  console.log(projectsListFromAPI);

  return (
    <div key="admin-projects-listing">
      <Breadcrumb pageName="Projects" />
      <div className="flex flex-col gap-10">
        <Listing posts={projectsListFromAPI} />
      </div>
    </div>
  );
};
