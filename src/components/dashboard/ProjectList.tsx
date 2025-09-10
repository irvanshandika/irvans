'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/src/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  categories: string[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      
      toast.success('Project deleted successfully');
      fetchProjects(); // Refresh the list
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project');
    }
  };

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
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
      <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive">
        <p>{error}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={fetchProjects}>
          Try Again
        </Button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-muted-foreground mb-4">No projects found</p>
        <p className="text-sm text-muted-foreground">Create your first project by clicking the &ldquo;Create Project&rdquo; tab above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="p-4 border rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="rounded-lg object-cover w-full h-32"
                  onError={(e) => {
                    // Replace with placeholder on error
                    (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                    (e.target as HTMLImageElement).classList.add('p-4', 'bg-muted');
                  }}
                />
              ) : (
                <div className="rounded-lg bg-muted w-full h-32 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">No image</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.categories.map((category) => (
                      <span 
                        key={category} 
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <div className="flex">{renderStars(project.rating)}</div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Updated {formatDate(project.updatedAt)}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => window.location.href = `/dashboard/projects/edit/${project.id}`}
                >
                  <Edit size={14} />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleDelete(project.id)}
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
  );
}