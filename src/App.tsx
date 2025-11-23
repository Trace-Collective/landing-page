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
import videoBg from "./assets/Mannequin_Balaclava_D_Video.mp4";

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
    <div className="min-h-screen text-[#F0F0F0] relative">
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10">
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
    </div>
  );
}