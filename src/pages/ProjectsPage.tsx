import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import SkeletonCard from '../components/SkeletonCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import PageTransition from '../components/PageTransition';
import { useToast } from '../hooks/useToast';

interface ProjectsPageProps {
  isAdmin: boolean;
}

export default function ProjectsPage({ isAdmin }: ProjectsPageProps) {
  const toast = useToast();
  const {
    projects,
    loading,
    filteredProjects,
    searchTerm,
    setSearchTerm,
    activeTag,
    setActiveTag,
    allTags,
    handleDeleteProject,
  } = useProjects();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteProject = async (id: number) => {
    setIsDeleting(true);
    try {
      await handleDeleteProject(id);
      toast.show("Portfolio project successfully removed from database.", "success");
      setSelectedProject(null);
    } catch (err) {
      toast.show("System error removing portfolio project.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNextProject = () => {
    if (!selectedProject || projects.length === 0) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject || projects.length === 0) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  return (
    <PageTransition>
      <section className="min-h-screen px-6 md:px-12 lg:px-24 pt-32 pb-20 max-w-7xl mx-auto select-none">
        {/* Section Header with Search & Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/55 mb-2 block">
              CATALOG SELECTION
            </span>
            <h2 className="text-4xl md:text-5xl font-display uppercase font-medium leading-none">
              Selected Works
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:max-w-2xl">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/45" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Query series tag, title, year or technology..."
                className="w-full bg-black/[0.02] border border-black/15 pl-10 pr-4 py-2.5 font-mono text-xs focus:border-black focus:outline-none focus:bg-white transition-all rounded-none"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <Filter className="w-3.5 h-3.5 text-black/45 shrink-0 ml-1" />
              <div className="flex gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 transition-all duration-200 cursor-pointer ${
                      activeTag === tag
                        ? "bg-black text-white"
                        : "bg-black/[0.03] text-black hover:bg-black/10"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading / Empty / Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        )
 : filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-black/15">
            <p className="font-mono text-xs uppercase tracking-widest text-black/50 mb-4">
              No matching architectural works identified.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setActiveTag("ALL"); }}
              className="font-mono text-[10px] uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                totalCount={projects.length}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onNextProject={handleNextProject}
              onPrevProject={handlePrevProject}
              onDeleteProject={onDeleteProject}
              isDeleting={isDeleting}
              isAdmin={isAdmin}
            />
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
}
