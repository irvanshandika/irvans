'use client';
import React from 'react';
import { Code2, Lightbulb, Rocket } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const About = () => {
  const highlights = [
    {
      icon: <Code2 className="h-8 w-8 text-blue-500 dark:text-blue-400" />,
      title: 'Clean Code',
      description: 'Writing maintainable and efficient code following best practices',
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-cyan-500 dark:text-cyan-400" />,
      title: 'Problem Solver',
      description: 'Analyzing complex problems and delivering innovative solutions',
    },
    {
      icon: <Rocket className="h-8 w-8 text-teal-500 dark:text-teal-400" />,
      title: 'Fast Learner',
      description: 'Always eager to learn new technologies and methodologies',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              I&apos;m a passionate Full-Stack Web Developer with expertise in building modern,
              scalable web applications. With a strong foundation in both frontend and backend
              technologies, I create seamless user experiences backed by robust server-side logic.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              My journey in web development has equipped me with the skills to work across the
              entire technology stack, from designing intuitive user interfaces to architecting
              efficient database schemas and RESTful APIs.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              I believe in continuous learning and staying updated with the latest industry trends.
              Whether it&apos;s exploring new frameworks, optimizing application performance, or
              collaborating with teams, I&apos;m always ready to take on new challenges.
            </p>
          </div>

          {/* Right: Highlights */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="bg-gray-100/50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
