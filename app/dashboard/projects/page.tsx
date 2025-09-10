'use client';

import { useState } from 'react';
import { Card } from '@/src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import ProjectForm from '@/src/components/dashboard/ProjectForm';
import ProjectList from '@/src/components/dashboard/ProjectList';
import { Toaster } from 'react-hot-toast';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="container py-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      
      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="list">Project List</TabsTrigger>
            <TabsTrigger value="create">Create Project</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="list" className="mt-6">
          <Card className="p-6">
            <ProjectList />
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="mt-6">
          <Card className="p-6">
            <ProjectForm onSuccess={() => setActiveTab('list')} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}