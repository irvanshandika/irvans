/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { HtmlRenderer } from '../ui/html-renderer';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  categories: string[];
  code?: string | null;
  rating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  return (
    <>
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto"></div>
          </div>

          {loading ? (
            <div className="text-center text-slate-500 dark:text-gray-400 text-lg">
              Loading projects...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 dark:text-red-400 text-lg">{error}</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-gray-400 text-lg">
              Project not yet available
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <Card
                  key={project.id}
                  className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 flex flex-col"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl || ''}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-slate-500 dark:text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-60"></div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="grow">
                    <CardDescription className="text-slate-600 dark:text-gray-400 mb-4">
                      <HtmlRenderer html={project.description} />
                    </CardDescription>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.categories &&
                        project.categories.map(category => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30"
                          >
                            {category}
                          </Badge>
                        ))}
                    </div>

                    {/* Rating */}
                    <div className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                      <span className="text-yellow-500">★</span> {project.rating.toFixed(1)} (
                      {project.ratingCount} reviews)
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-3">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        asChild
                      >
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
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
