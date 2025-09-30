'use client';

import { Button } from '@/src/components/ui/button';
import ProjectForm from '@/src/components/dashboard/ProjectForm';
import { Toaster } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateProjectPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 px-4 lg:px-6 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/projects">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
            </div>
          </div>
          
          <Toaster position="top-right" />
          
          <div className="max-w-3xl">
            <div className="bg-card dark:bg-card/80 rounded-xl border shadow-sm p-6 transition-colors duration-200">
              <ProjectForm 
                onSuccess={() => {
                  // Redirect to projects page after successful creation
                  window.location.href = '/dashboard/projects';
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}