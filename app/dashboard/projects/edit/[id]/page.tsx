'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import ProjectForm from '@/src/components/dashboard/ProjectForm';
import { Loader2 } from 'lucide-react';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const projectId = params.id as string;
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${projectId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);
  
  const handleSuccess = () => {
    router.push('/dashboard/projects');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => router.push('/dashboard/projects')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Projects
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6">
      <Toaster position="top-right" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Project</h1>
        <p className="text-gray-500">Update your project details</p>
      </div>
      
      {project && (
        <ProjectForm 
          projectId={projectId}
          initialData={project}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}