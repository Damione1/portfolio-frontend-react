"use client";
import { ImageItem } from "@/types/media";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { UploadImageInput } from "@/app/dashboard/project/validations";
import { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { uploadImage } from "@/clients/files";

interface ImageUploadFormProps {
  defaultImage: ImageItem | null;
  title?: string;
  subtitle?: string;
  setImageId: (imageId: number) => void;
}

export default function ImageUploadForm({
  defaultImage,
  title,
  subtitle,
  setImageId,
}: ImageUploadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
  } = useForm();

  const [localImage, setLocalImage] = useState(defaultImage);

  async function onSubmit(fields: UploadImageInput) {
    if (!fields.image) {
      return;
    }
    const formData = new FormData();
    formData.append("image", fields.image);
    const { image: imageResponse, error } = await uploadImage(formData);
    if (error) {
      alert("Error uploading image " + error);
      return;
    }
    setImageId(imageResponse.id);
    setLocalImage(imageResponse);
  }

  const handleDelete = () => {
    setImageId(0);
    setLocalImage(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          {title ?? "Your photo"}
        </h3>
      </div>

      {localImage && (
        <div className="mb-4 flex items-center gap-3">
          <div className="h-14 w-14 ml-5 mt-5 rounded-full">
            <Image
              src={localImage?.path ?? "/images/placeholder.jpg"}
              alt="Uploaded image"
              width={56}
              height={56}
              style={{ borderRadius: "inherit", objectFit: "cover" }}
            />
          </div>
          <div>
            <span className="mb-1.5 text-black dark:text-white">
              {localImage?.filename}
            </span>
            <span className="flex gap-2.5">
              <button
                onClick={handleDelete}
                className="text-sm hover:text-primary"
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      )}
      {!localImage && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            id="FileUpload"
            className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <input
              type="file"
              accept="image/*"
              disabled={isSubmitting}
              {...register("image")}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setValue("image", file);
                  handleSubmit(onSubmit)();
                }
              }}
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              {isSubmitting && (
                <span className="animate-spin mr-4">
                  <Loader2 />
                </span>
              )}
              {!isSubmitting && (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <UploadCloud />
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  <p>(max, 800 X 800px)</p>
                </>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
