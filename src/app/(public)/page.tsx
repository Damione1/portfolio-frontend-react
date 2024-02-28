import HeadTitle from "../../components/public/HeadTitle";
import ExperienceListing from "../../components/public/ExperienceListing";
import SkillsListing from "../../components/public/SkillsListing";
import ProjectsListing from "../../components/public/ProjectsListing";
import { ExperienceType } from "@/types/experience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Damien Goehrig",
  description:
    "I'm an intermediate software developer with a passion for modern web technologies and a love for learning new things",
};

export default function Home() {
  const userId =
    process.env.NEXT_USER_ID && !Number.isNaN(Number(process.env.NEXT_USER_ID))
      ? Number(process.env.NEXT_USER_ID)
      : 1;
  const project = {
    mainTitle: "Projects",
    subTitle: "My projects",
  };
  const workExperiences = {
    mainTitle: "Work experiences",
    subTitle: "My work experiences",
  };
  const skill = {
    mainTitle: "Stack",
    subTitle: "My stack",
  };
  const qualification = {
    mainTitle: "Qualifications",
    subTitle: "My qualifications",
  };
  const header = {
    mainTitle: "Hi, I'm Damien,\na software developer.",
    subTitle:
      "I'm an intermediate software developer with a passion for modern web technologies and a love for learning new things",
  };

  return (
    <div className="home">
      <HeadTitle mainTitle={header.mainTitle} subTitle={header.subTitle} />

      <ExperienceListing
        userId={userId}
        mainTitle={workExperiences.mainTitle}
        subTitle={workExperiences.subTitle}
        type={ExperienceType.Work}
      />

      <SkillsListing
        userId={userId}
        mainTitle={skill.mainTitle}
        subTitle={skill.subTitle}
      />

      <ExperienceListing
        userId={userId}
        mainTitle={qualification.mainTitle}
        subTitle={qualification.subTitle}
        type={ExperienceType.Education}
      />

      <ProjectsListing
        userId={userId}
        mainTitle={project.mainTitle}
        subTitle={project.subTitle}
      />
    </div>
  );
}
