import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { ProjectModal } from "./components/ProjectModal";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import type { Project } from "./data";

export default function App() {
  {/* MARKER-MAKE-KIT-INVOKED */}
  {/* MARKER-MAKE-KIT-DISCOVERY-READ */}
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onSelectProject={setSelectedProject} />
        <Contact />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
