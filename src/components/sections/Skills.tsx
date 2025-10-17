import React from 'react';
import { mockSkills } from './mock';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const Skills = () => {
  const categories = {
    frontend: { title: 'Frontend', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    backend: { title: 'Backend', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
    database: { title: 'Database', color: 'bg-teal-500/10 text-teal-400 border-teal-500/30' },
    tools: {
      title: 'Tools & Others',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    },
  };

  const groupedSkills = mockSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof mockSkills>
  );

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(categories).map(([key, { title, color }]) => (
            <Card
              key={key}
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white text-center">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {groupedSkills[key]?.map(skill => (
                    <Badge
                      key={skill.name}
                      variant="outline"
                      className={`${color} px-3 py-1 text-sm font-medium transition-all duration-200 hover:scale-110`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
