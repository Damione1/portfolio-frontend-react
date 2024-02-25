import React from "react";
import { formatDate } from "../../helpers/date";
import { ExperienceItem } from "../../types/experience";

interface Props {
  experience: ExperienceItem;
}

const PublicExperienceItem: React.FC<Props> = ({ experience }) => {
  return (
    <div className="p-4 w-full lg:w-1/3 sm:w-1/2 flex flex-col">
      <div className="flex-grow border-2 rounded-lg border-gray-200 dark:text-gray-300 border-opacity-50 p-8 sm:flex-row flex-col">
        <div className="flex-grow">
          <h3 className="mb-3">
            <div className="text-gray-900 dark:text-gray-400 text-xl title-font font-bold">
              {experience.title}
            </div>
            <div className="text-gray-900 dark:text-gray-400 text-md title-font font-medium">
              {experience.subtitle}
            </div>
          </h3>
          <p className="leading-relaxed text-base">
            {formatDate(experience.start_date.toString())} -{" "}
            {experience.end_date
              ? formatDate(experience.end_date.toString())
              : "Present"}
          </p>
          <p
            className="leading-relaxed text-base"
            style={{ whiteSpace: "pre-line" }}
          >
            {experience.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicExperienceItem;
