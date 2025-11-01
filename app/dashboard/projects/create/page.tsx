'use client';
import ProjectForm from '@/src/components/dashboard/ProjectForm';
import { Toaster } from 'react-hot-toast';

export default function CreateProjectPage() {
  return (
    <>
      <div className="container mx-auto py-6">
        <Toaster position="top-right" />
        <ProjectForm
          onSuccess={() => {
            window.location.href = '/dashboard/projects';
          }}
        />
      </div>
    </>
  );
}
