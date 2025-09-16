'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import ProjectForm from '@/src/components/dashboard/ProjectForm';
import ProjectList from '@/src/components/dashboard/ProjectList';
import { Toaster } from 'react-hot-toast';
import { Plus, List } from 'lucide-react';

export default function ProjectsMain() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 px-4 lg:px-6 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          </div>
          
          <Toaster position="top-right" />
          
          <div className="bg-card dark:bg-card/80 rounded-xl border shadow-sm p-6 transition-colors duration-200">
            <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-8">
                <TabsList className="grid w-[300px] grid-cols-2 bg-muted/60 dark:bg-muted/30 rounded-lg overflow-hidden">
                  <TabsTrigger 
                    value="list" 
                    className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
                  >
                    <List className="h-4 w-4" />
                    Project List
                  </TabsTrigger>
                  <TabsTrigger 
                    value="create" 
                    className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    Create Project
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="list" className="mt-2 transition-all duration-200">
                <ProjectList />
              </TabsContent>
              
              <TabsContent value="create" className="mt-2 transition-all duration-200">
                <ProjectForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}