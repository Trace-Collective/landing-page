import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { ProjectDetail } from "./components/ProjectDetail";
import { Project } from "./types/project";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : selectedProject ? (
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
            onClose={handleCloseProject}
          />
        ) : (
          <>
            <Navigation />
            <main>
              <HeroSection />
              <PortfolioSection onProjectClick={handleProjectClick} />
              <AboutSection />
              <ContactSection />
            </main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}