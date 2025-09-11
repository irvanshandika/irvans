'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import ProjectForm from '@/src/components/dashboard/ProjectForm';
import ProjectList from '@/src/components/dashboard/ProjectList';
import { Toaster } from 'react-hot-toast';
import { AppSidebar } from "@/src/components/app-sidebar";
import { SiteHeader } from "@/src/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/components/ui/sidebar";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6 py-4 md:py-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Projects</h1>
              </div>
              
              <Toaster position="top-right" />
              
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
                  <div className="flex justify-between items-center mb-6">
                    <TabsList className="grid w-[400px] grid-cols-2 bg-muted/80">
                      <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Project List</TabsTrigger>
                      <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Create Project</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="list" className="mt-6">
                    <ProjectList />
                  </TabsContent>
                  
                  <TabsContent value="create" className="mt-6">
                    <ProjectForm onSuccess={() => setActiveTab('list')} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}