import { RoadmapStep } from '../types';

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: '01',
    number: '01',
    title: 'Admission & Skill Counseling',
    summary: 'Personalized career assessment with our senior instructors to evaluate your technical aptitude and align with high-demand market paths.',
    deliverables: [
      '1-on-1 technical roadmap session',
      'Curriculum pathway customization',
      'Access to JS Developers learning portal',
      'Starter software setup & tooling kit'
    ],
    duration: 'Week 1',
    focus: 'Orientation & Career Mapping'
  },
  {
    step: '02',
    number: '02',
    title: 'Hands-on Practical Training',
    summary: 'Zero fluff, 100% practical lab-based learning led by working software engineers. Code daily inside our Lahore tech lab or online.',
    deliverables: [
      'Interactive live coding sessions',
      'Daily coding challenges & sprint reviews',
      'Modern version control with Git & GitHub',
      'Clean architecture & design patterns'
    ],
    duration: 'Weeks 2 – 8',
    focus: 'Core Technical Fluency'
  },
  {
    step: '03',
    number: '03',
    title: 'Live Software House Projects',
    summary: 'Build production-ready applications with real client specifications rather than outdated classroom tutorials.',
    deliverables: [
      '2 major commercial-grade capstone apps',
      'API integrations & database persistence',
      'Scrum / Agile sprint simulation',
      'Live cloud deployment with CI/CD'
    ],
    duration: 'Weeks 9 – 12',
    focus: 'Production Experience'
  },
  {
    step: '04',
    number: '04',
    title: 'Mentorship & Rigorous Code Review',
    summary: 'Your pull requests are scrutinized by Lead Developers Muhammad Saboor and Muhammad Jahanzaib to ensure enterprise quality.',
    deliverables: [
      'Line-by-line pull request reviews',
      'Performance profiling & security auditing',
      'Refactoring for maintainability',
      'Refined portfolio GitHub repository'
    ],
    duration: 'Weeks 13 – 14',
    focus: 'Quality & Optimization'
  },
  {
    step: '05',
    number: '05',
    title: 'ASCI Software House Certification',
    summary: 'Formal graduation and credential verification under the official banner of JS Developers (A project of ASCI).',
    deliverables: [
      'Verified physical & digital certificate',
      'Credential QR code for LinkedIn & resumes',
      'Industry endorsement by ASCI network',
      'Capstone defense & showcase day'
    ],
    duration: 'Week 15',
    focus: 'Official Credentialing'
  },
  {
    step: '06',
    number: '06',
    title: 'Career Support & Job Placement',
    summary: 'Dedicated placement assistance connecting you with leading software houses in Lahore, remote overseas startups, and freelancing pipelines.',
    deliverables: [
      'Technical mock interview drills',
      'High-converting resume & portfolio polish',
      'Direct referrals to hiring partner firms',
      'Upwork & Fiverr bidding masterclass'
    ],
    duration: 'Week 16 & Beyond',
    focus: 'Placement & Revenue'
  }
];

export const TECH_STACK_ITEMS = [
  { name: 'HTML5', category: 'Frontend', color: '#E34F26', iconName: 'Code', accent: 'from-orange-500/20 to-orange-500/5', description: 'Semantic modern web structures' },
  { name: 'CSS3', category: 'Frontend', color: '#1572B6', iconName: 'Palette', accent: 'from-blue-500/20 to-blue-500/5', description: 'Responsive layouts, grid & animations' },
  { name: 'JavaScript', category: 'Core', color: '#F7DF1E', iconName: 'Zap', accent: 'from-yellow-400/20 to-yellow-400/5', description: 'ES6+ modern functional language' },
  { name: 'jQuery', category: 'Frontend', color: '#0769AD', iconName: 'Layers', accent: 'from-sky-500/20 to-sky-500/5', description: 'Interactive DOM handling & plugins' },
  { name: 'Bootstrap', category: 'Styling', color: '#7952B3', iconName: 'Layout', accent: 'from-purple-500/20 to-purple-500/5', description: 'Rapid responsive web scaffolding' },
  { name: 'React.js', category: 'Frontend', color: '#61DAFB', iconName: 'Atom', accent: 'from-cyan-400/20 to-cyan-400/5', description: 'Component-driven reactive UIs' },
  { name: 'Node.js', category: 'Backend', color: '#339933', iconName: 'Server', accent: 'from-green-500/20 to-green-500/5', description: 'Scalable event-driven backend runtimes' },
  { name: 'MERN Stack', category: 'Full Stack', color: '#00F2FE', iconName: 'Cpu', accent: 'from-teal-400/20 to-teal-400/5', description: 'End-to-end full-stack web solutions' },
  { name: 'AI / ML', category: 'Advanced', color: '#A855F7', iconName: 'Brain', accent: 'from-fuchsia-500/20 to-fuchsia-500/5', description: 'Machine learning & intelligent systems' },
  { name: 'AutoCAD', category: 'Design', color: '#E53935', iconName: 'Box', accent: 'from-red-500/20 to-red-500/5', description: 'Precision 2D/3D engineering blueprints' },
  { name: 'Premiere Pro', category: 'Creative', color: '#9999FF', iconName: 'Film', accent: 'from-indigo-500/20 to-indigo-500/5', description: 'Broadcast grade cinematic video editing' },
  { name: 'Python', category: 'AI & Data', color: '#3776AB', iconName: 'Terminal', accent: 'from-blue-400/20 to-blue-400/5', description: 'Data science & algorithmic automation' }
];
