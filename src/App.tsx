import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Project, ServerStatus } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddProjectModal from "./components/AddProjectModal";
import BackgroundAnimation from "./components/BackgroundAnimation";
import { motion, AnimatePresence } from "motion/react";

// Page component imports
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

function AppContent() {
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Administrative verification state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("admin_token") === "romel-ligligon-authorized-token";
  });

  // Fetch server / database connection state
  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/status");
      if (res.ok) {
        const data = await res.json();
        setServerStatus(data);
      }
    } catch (e) {
      console.warn("Could not check Server Status. API might be initializing:", e);
    }
  };

  // Load projects to display works count in header
  const loadProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error("Error loading projects from server:", e);
    }
  };

  useEffect(() => {
    fetchStatus();
    loadProjects();
  }, [location.pathname]); // Reload metadata when routing changes

  const handleSaveProject = async (projectData: any) => {
    try {
      const token = localStorage.getItem("admin_token") || "";
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });
      if (res.ok) {
        await loadProjects();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to connect API to save project:", err);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col relative select-none">
      {/* Luxury paper high-end ambient noise map overlay */}
      <div className="paper-texture" />

      {/* Global Blueprint Grid & Morphing Geometries Animation */}
      <BackgroundAnimation />

      {/* Styled vertical rail for Clean Minimalism layout */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right pointer-events-none hidden xl:block font-mono text-[9px] uppercase tracking-[0.5em] text-black/55 select-none z-[49]">
        ESTABLISHED TWO THOUSAND TWENTY SIX
      </div>

      {/* Styled Top Header & Diagnostics panel */}
      <Header
        onAddProjectClick={() => setIsAddOpen(true)}
        status={serverStatus}
        onRefreshStatus={fetchStatus}
        projectsCount={projects.length}
        isAdmin={isAdmin}
      />

      {/* Main Routed Area */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="w-full h-full"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage isAdmin={isAdmin} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer component */}
      <Footer />

      {/* DYNAMIC WORK REGISTRATION MODAL */}
      <AnimatePresence>
        {isAddOpen && (
          <AddProjectModal
            onClose={() => setIsAddOpen(false)}
            onSave={handleSaveProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
