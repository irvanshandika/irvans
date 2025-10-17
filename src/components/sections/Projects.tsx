'use client';
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import toast from 'react-hot-toast';
import Image from 'next/image';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  categories: string[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
          </div>

          {projects.length === 0 ? (
            <div className="text-center text-gray-400 text-lg">Project not yet available</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <Card
                  key={project.id}
                  className="bg-slate-800/50 border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 flex flex-col"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.imageUrl || ''}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">{project.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <CardDescription className="text-gray-400 mb-4">
                      {project.description}
                    </CardDescription>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
