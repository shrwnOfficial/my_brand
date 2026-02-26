import { Certifications } from "@/components/main/certifications";
import { SpaceAnimation } from "@/components/main/space-animation";
import { Education } from "@/components/main/education";
import { Experience } from "@/components/main/experience";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { FloatingHobbies } from "@/components/sub/floating-hobbies";

export default function Home() {
  return (
    <main className="h-full w-full">
      <FloatingHobbies />
      <div className="flex flex-col gap-20">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <SpaceAnimation />
      </div>
    </main>
  );
}
