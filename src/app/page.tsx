import HeadTitle from '../components/public/HeadTitle'
import Listing from '../components/public/Listing'
import SkillsListing from '../components/public/SkillsListing'
import ProjectsListing from '../components/public/ProjectsListing'

export default function Home() {
  const userId = process.env.NEXT_USER_ID || '1';
  const project = {
    mainTitle: 'Projects',
    subTitle: 'My projects'
  };
  const workExperiences = {
    mainTitle: 'Work experiences',
    subTitle: 'My work experiences'
  };
  const skill = {
    mainTitle: 'Stack',
    subTitle: 'My stack'
  };
  const qualification = {
    mainTitle: 'Qualifications',
    subTitle: 'My qualifications'
  };
  const header = {
    mainTitle: 'Hi, I\'m Damien,\na software developer.',
    subTitle: "I'm an intermediate software developer with a passion for modern web technologies and a love for learning new things"
  };

  return (
    <div className="home">
      <HeadTitle mainTitle={header.mainTitle} subTitle={header.subTitle} />
      <Listing userId={userId} mainTitle={workExperiences.mainTitle} subTitle={workExperiences.subTitle} endpoint="workexperience" />
      <SkillsListing userId={userId} mainTitle={skill.mainTitle} subTitle={skill.subTitle} />
      <Listing userId={userId} mainTitle={qualification.mainTitle} subTitle={qualification.subTitle} endpoint="qualification" />
      <ProjectsListing userId={userId} mainTitle={project.mainTitle} subTitle={project.subTitle} />
    </div>
  )
}
