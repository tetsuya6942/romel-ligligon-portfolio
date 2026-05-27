import { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { fetchProjects, createProject, deleteProject } from '../api/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('ALL');

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (e) {
      console.error('Error loading projects:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const allTags = ['ALL', 'AI & PROMPTING', 'MEDIA & DESIGN', 'IT & SECURITY'];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTag === 'ALL') return matchesSearch;

    const tags = project.tags.map((t) => t.toLowerCase());

    if (activeTag === 'AI & PROMPTING') {
      const isAI = tags.some((t) =>
        t.includes('ai') ||
        t.includes('prompt') ||
        t.includes('ml') ||
        t.includes('generative')
      );
      return matchesSearch && isAI;
    }

    if (activeTag === 'MEDIA & DESIGN') {
      const isMedia = tags.some((t) =>
        t.includes('media') ||
        t.includes('graphic') ||
        t.includes('video') ||
        t.includes('design') ||
        t.includes('arts')
      );
      return matchesSearch && isMedia;
    }

    if (activeTag === 'IT & SECURITY') {
      const isIT = tags.some((t) =>
        t.includes('it') ||
        t.includes('support') ||
        t.includes('hardware') ||
        t.includes('security') ||
        t.includes('compliance') ||
        t.includes('cyber') ||
        t.includes('sales')
      );
      return matchesSearch && isIT;
    }

    return false;
  });

  const handleSaveProject = async (projectData: any): Promise<boolean> => {
    try {
      await createProject(projectData);
      await loadProjects();
      return true;
    } catch (err) {
      console.error('Failed to save project:', err);
      return false;
    }
  };

  const handleDeleteProject = async (id: number): Promise<void> => {
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  return {
    projects,
    loading,
    loadProjects,
    filteredProjects,
    searchTerm,
    setSearchTerm,
    activeTag,
    setActiveTag,
    allTags,
    handleSaveProject,
    handleDeleteProject,
  };
}
