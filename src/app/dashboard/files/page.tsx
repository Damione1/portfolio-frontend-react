"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { deleteProject, listImages } from "../../../clients/files";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import { PostListItem } from "@/components/Tables/TableThree";
import { ProjectPost } from "@/types/project";
import { formatDate } from "@/helpers/date";
import { ImageItem } from "@/types/media";
import Image from "next/image";

export default function AdminProjectsListing() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { images, error } = await listImages();
      if (error) {
        window.alert(`Api error: ${error}`);
        setError(error);
      } else {
        setImages(images);
      }
    })();
  }, []);

  const deleteThisProject = async (id: string) => {
    const { error } = await deleteProject(id);
    if (error) {
      console.error("project not found", error);
      return;
    }
    //pop the project from the list
    const newImages = images.filter((image) => image._id !== id);
    setImages(newImages);
  };

  return (
    <div key="admin-projects-listing">
      <Breadcrumb pageName="Projects" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
          <h3 className="font-medium text-black dark:text-white">Image Grid</h3>
        </div>

        <div className="p-4 sm:p-6 xl:p-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            {error ? (
              <div>Error loading files: {error}</div>
            ) : (
              images.map((image) => {
                return (
                  <div key={image._id}>
                    <Image
                      src={image.url}
                      alt="Cover"
                      width={300}
                      height={300}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Link
        href="/dashboard/files/new"
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
      >
        Create a new project
      </Link>
    </div>
  );
}
