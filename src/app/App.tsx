import { useState, useEffect } from "react";
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
  const [isDark, setIsDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("portfolio-theme", "light");
      }
      return next;
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar isDark={isDark} onToggle={toggleDark} />
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
