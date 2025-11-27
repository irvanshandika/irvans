'use client';

import { useState } from 'react';
import ProjectList from '@/src/components/dashboard/ProjectList';
import { Toaster } from 'react-hot-toast';
import { List, Plus } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export default function ProjectsMain() {
  const [refreshList] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 px-4 lg:px-6 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <Button asChild>
              <Link href="/dashboard/projects/create" aria-label="Create New Project">
                <Plus className="h-5 w-5 mr-2" />
                Create New Project
              </Link>
            </Button>
          </div>

          <Toaster position="top-right" />

          <div className="w-full">
            <div className="bg-card dark:bg-card/80 rounded-xl border shadow-sm p-6 transition-colors duration-200">
              <div className="flex items-center gap-2 mb-6">
                <List className="h-5 w-5 text-primary" />
                <h2 className="text-xl text-black dark:text-white">Project List</h2>
              </div>
              <ProjectList key={refreshList ? 'refresh' : 'initial'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
