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
    title: 'AMCC Backend Developer Junior',
    issuer: 'This is the first certificate I got. By attending training from AMIKOM campus, namely AMCC Web Programming from the Backend Programming Division',
    date: '2021',
    imageUrl: 'https://res.cloudinary.com/dszhlpm81/image/upload/v1704006766/assets/UFPMOvuUtfuMxUpG2yy%2BnF743hBOeLEzqjNEDiHixcQ%3D/Screenshot_2023-12-31_141213_uivn8g.png',
    credentialUrl: '#',
  },
  {
    id: 2,
    title: 'Junior Web Developer by KOMINFO',
    issuer: 'And this is the second certificate that I got during the training organized by KEMKOMINFO called Junior Web Developer in the Frontend Web Developer division. Which uses the frontend using the PHP language and uses the MySQL database.',
    date: '2023',
    imageUrl: 'https://res.cloudinary.com/dszhlpm81/image/upload/v1704004749/assets/UFPMOvuUtfuMxUpG2yy%2BnF743hBOeLEzqjNEDiHixcQ%3D/Screenshot_2023-12-31_133823_ro2auf.png',
    credentialUrl: '#',
  },
  {
    id: 3,
    title: 'AMCC Frontend Developer Intermediate',
    issuer: 'And this is the third certificate after I participated in the Mini Bootcamp activity from the campus, namely AMCC Web Programming Intermediate Class. Which learned about the React JS framework and learned the REST API using the API from FAKE STORE.',
    date: '2023',
    imageUrl: 'https://res.cloudinary.com/dszhlpm81/image/upload/v1704006766/assets/UFPMOvuUtfuMxUpG2yy%2BnF743hBOeLEzqjNEDiHixcQ%3D/Screenshot_2023-12-31_141130_nsi8j9.png',
    credentialUrl: '#',
  },
];

interface Skill {
  name: string;
  category: string;
}

export const mockSkills: Skill[] = [
  // Frontend
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Bootstrap', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Vue', category: 'frontend' },
  { name: 'NextJS', category: 'frontend' },
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'PHP', category: 'backend' },
  // Database
  { name: 'MySQL', category: 'database' },
  { name: 'Firebase', category: 'database' },
  // Tools
  { name: 'VS Code', category: 'tools' },
  { name: 'AWS', category: 'tools' },
];
