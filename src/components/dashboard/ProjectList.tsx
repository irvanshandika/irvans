'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/src/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { HtmlRenderer } from '@/src/components/ui/html-renderer';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  categories: string[];

  createdAt: Date;
  updatedAt: Date;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const confirmDelete = (id: string) => {
    setProjectToDelete(id);
    setConfirmText('');
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete || confirmText !== 'confirm') {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      toast.success('Project deleted successfully');
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
      setConfirmText('');
      fetchProjects(); // Refresh the list
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project');
    }
  };

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive dark:bg-red-900/20 dark:text-red-400">
        <p>{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          onClick={fetchProjects}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
        <p className="text-muted-foreground dark:text-gray-400 mb-4">No projects found</p>
        <p className="text-sm text-muted-foreground dark:text-gray-500">
          Create your first project by clicking the &ldquo;Create Project&rdquo; tab above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Total Projects: {projects.length}
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          onClick={() => fetchProjects()}
        >
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map(project => (
          <div
            key={project.id}
            className="group p-5 border rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-primary/50"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4 md:max-w-[200px]">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    className="rounded-lg object-cover w-full h-40 transition-transform group-hover:scale-[1.02]"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="rounded-lg bg-muted w-full h-40 flex items-center justify-center dark:bg-gray-700">
                    <span className="text-muted-foreground text-sm dark:text-gray-400">
                      No image
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.categories.map(category => (
                        <span
                          key={category}
                          className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full dark:bg-primary/20 dark:text-primary-400"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-3 line-clamp-2 dark:text-gray-400">
                      <HtmlRenderer html={project.description} />
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end">

                    <div className="flex flex-col items-end mt-1 space-y-1">
                      <span className="text-xs text-muted-foreground dark:text-gray-500">
                        Created: {formatDate(project.createdAt)}
                      </span>
                      <span className="text-xs text-muted-foreground dark:text-gray-500">
                        Updated: {formatDate(project.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 hover:text-white transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                    onClick={() =>
                      (window.location.href = `/dashboard/projects/edit/${project.id}`)
                    }
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
                    onClick={() => confirmDelete(project.id)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Konfirmasi Penghapusan</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Are you sure you want to delete this project? Type &quot;confirm&quot; to delete this
              project.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Type 'confirm' here"
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
              className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={confirmText !== 'confirm'}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
