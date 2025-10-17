// Define the Project interface locally to avoid missing type error
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce application with payment integration, user authentication, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management System',
    description:
      'Collaborative task management application with real-time updates, drag-and-drop interface, and team workspace.',
    technologies: ['React', 'FastAPI', 'PostgreSQL', 'WebSocket'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description:
      'Real-time weather tracking application with location-based forecasts, interactive maps, and historical data.',
    technologies: ['React', 'Python', 'FastAPI', 'OpenWeather API'],
    imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop',
    githubUrl: '#',
    liveUrl: '#',
  },
];

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  credentialUrl: string;
}

export const mockCertificates: Certificate[] = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    credentialUrl: '#',
  },
  {
    id: 2,
    title: 'Full-Stack Web Development',
    issuer: 'Coursera',
    date: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    credentialUrl: '#',
  },
  {
    id: 3,
    title: 'Docker & Kubernetes',
    issuer: 'Linux Foundation',
    date: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop',
    credentialUrl: '#',
  },
  {
    id: 4,
    title: 'React Advanced Patterns',
    issuer: 'Frontend Masters',
    date: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
    credentialUrl: '#',
  },
];

interface Skill {
  name: string;
  category: string;
}

export const mockSkills: Skill[] = [
  // Frontend
  { name: 'JavaScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  // Database
  { name: 'MongoDB', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  // Tools
  { name: 'Docker', category: 'tools' },
  { name: 'AWS', category: 'tools' },
];
