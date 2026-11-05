import {
  Hero,
  ProjectShowcase,
  ExperienceTimeline,
  TechnicalProfile,
  EngineeringArchive,
} from '@/components/sections';
export default function Home() {
  return (
    <>
      <Hero />
      <ProjectShowcase />
      <EngineeringArchive />
      <ExperienceTimeline />
      <TechnicalProfile />
    </>
  );
}
