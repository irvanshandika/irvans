import React from 'react';
import { mockCertificates } from './mock';
import { ExternalLink, Award } from 'lucide-react';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Image from 'next/image';

const Certificates = () => {
  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certificates & Achievements
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCertificates.map(cert => (
            <Card
              key={cert.id}
              className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:shadow-blue-400/20 dark:hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 flex flex-col"
            >
              {/* Certificate Image */}
              <div className="relative h-40 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800">
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover opacity-60 dark:opacity-40 transition-opacity duration-300 hover:opacity-80 dark:hover:opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="h-12 w-12 text-blue-500 dark:text-blue-400 opacity-90" />
                </div>
              </div>

              <CardHeader className="grow">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  {cert.title}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{cert.issuer}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{cert.date}</p>
              </CardHeader>

              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white border-gray-300 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                  asChild
                >
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Credential
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
