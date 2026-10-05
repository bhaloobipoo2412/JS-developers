import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'mern-fullstack',
    title: 'Full Stack Web Development & MERN',
    subtitle: 'MongoDB, Express.js, React.js, Node.js & Next.js Ecosystem',
    category: 'web-app',
    level: 'Beginner to Pro',
    duration: '4 Months (16 Weeks)',
    tools: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Git'],
    description: 'Comprehensive software house grade training taking you from HTML/CSS foundations to architecting scalable production web applications with RESTful APIs and real-time WebSockets.',
    modules: [
      'HTML5, Modern CSS3, Responsive Design & Tailwind CSS',
      'JavaScript ES6+ Deep Dive & Asynchronous Programming',
      'React 19, Custom Hooks, State Management & Routing',
      'Backend with Node.js, Express, REST APIs & JWT Auth',
      'MongoDB Database Modeling, Aggregations & Security',
      'Full Stack Software House Capstone Project & Cloud Deployment'
    ],
    featured: true,
    softwareHouseCertified: true
  },
  {
    id: 'html-css-js-frontend',
    title: 'Frontend Web Fundamentals (HTML5, CSS3, JS, Bootstrap)',
    subtitle: 'Semantic HTML5, CSS3, jQuery, Bootstrap & Modern UI',
    category: 'web-app',
    level: 'Beginner to Pro',
    duration: '2 Months (8 Weeks)',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap 5', 'VS Code'],
    description: 'Master the fundamental building blocks of the web. Build pixel-perfect, accessible, and fast-loading web interfaces ready for client delivery.',
    modules: [
      'Modern Semantic HTML5 & Web Standards',
      'CSS3 Grid, Flexbox, Keyframe Animations & Micro-interactions',
      'Bootstrap 5 Grid System & Component Customization',
      'JavaScript DOM Manipulation & Event Handling',
      'jQuery Interactive UI Plugins & Legacy Code Maintenance',
      '5 Real-World Responsive Commercial Client Landing Pages'
    ],
    featured: false,
    softwareHouseCertified: true
  },
  {
    id: 'ai-machine-learning',
    title: 'Artificial Intelligence & Machine Learning (AI / ML)',
    subtitle: 'Python, Predictive Modeling, Deep Learning & LLM Integration',
    category: 'creative-ai',
    level: 'Intermediate',
    duration: '3 Months (12 Weeks)',
    tools: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-Learn', 'Gemini API'],
    description: 'Practical AI engineering curriculum focused on modern machine learning workflows, model training, computer vision, and building AI-augmented software systems.',
    modules: [
      'Python for Data Science, Vector Math & Matrix Operations',
      'Data Cleansing, Feature Engineering & Exploratory Analysis',
      'Supervised & Unsupervised Machine Learning Algorithms',
      'Neural Networks, Deep Learning & Computer Vision Basics',
      'Prompt Engineering & Production LLM Integration via APIs',
      'End-to-End AI Solution Deployed with Streamlit / FastAPI'
    ],
    featured: true,
    softwareHouseCertified: true
  },
  {
    id: 'autocad-engineering',
    title: 'AutoCAD Architecture & Engineering Design',
    subtitle: '2D Drafting, 3D Modeling & Civil/Mechanical Schematics',
    category: 'creative-ai',
    level: 'Beginner to Pro',
    duration: '2.5 Months (10 Weeks)',
    tools: ['AutoCAD 2024', 'Revit Basics', 'DWG Tools', '3D Isometric Render'],
    description: 'Industry-standard drafting and CAD engineering certification. Designed for architects, civil engineers, interior designers, and drafting professionals.',
    modules: [
      'AutoCAD Interface, Coordinates & Precision Geometric Drafting',
      'Architectural Floor Plans, Elevations, Sections & Layer Management',
      'Dimensioning Standards, Tolerances, Plotting & Paper Space',
      '3D Solid Modeling, Mesh Editing, Lighting & Texturing',
      'Structural Details & Mechanical Fabrication Blueprints',
      'Complete Client Construction Drawing Submission Portfolio'
    ],
    featured: false,
    softwareHouseCertified: true
  },
  {
    id: 'video-editing-motion',
    title: 'Video Editing & Motion Graphics',
    subtitle: 'Adobe Premiere Pro & After Effects Cinematic Production',
    category: 'creative-ai',
    level: 'Beginner to Pro',
    duration: '2 Months (8 Weeks)',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop', 'Audition', 'DaVinci Resolve'],
    description: 'High-income creative editing skills for commercial campaigns, social media content, YouTube creators, and corporate reels.',
    modules: [
      'Storytelling, Pacing, Cuts & Narrative Editing Techniques',
      'Color Correction & Lumetri Color Grading Aesthetics',
      'Audio Enhancement, Voice Isolation & Sound Design',
      'After Effects Motion Graphics, Kinetic Typography & Lower Thirds',
      'Visual Effects (VFX), Green Screen Chroma Keying & Masking',
      'High-Converting Social Reels & YouTube Longform Final Showreel'
    ],
    featured: false,
    softwareHouseCertified: true
  },
  {
    id: 'youtube-automation',
    title: 'YouTube Automation & Content Strategy',
    subtitle: 'Faceless Channel Architecture, Monetization & Algorithm Optimization',
    category: 'career-skills',
    level: 'Beginner to Pro',
    duration: '1.5 Months (6 Weeks)',
    tools: ['VidIQ', 'TubeBuddy', 'Canva Pro', 'ElevenLabs', 'Analytics Studio'],
    description: 'Learn how to build, scale, and automate profitable YouTube channels without ever showing your face on camera, backed by algorithmic insights and viral hooks.',
    modules: [
      'High-RPM Niche Selection, Competitor Audits & Audience Psychology',
      'Scriptwriting Frameworks & AI Voice Generation Workflows',
      'High-CTR Thumbnail Design Principles & Title Hook Testing',
      'Content Production Pipeline & Team Delegation Standard Operating Procedures',
      'YouTube SEO, Tagging, Metadata & Algorithmic Velocity',
      'Multi-Stream Monetization: AdSense, Sponsorships & Affiliate Funnels'
    ],
    featured: true,
    softwareHouseCertified: true
  },
  {
    id: 'it-management-sysadmin',
    title: 'IT Management & System Administration',
    subtitle: 'Enterprise Networking, Server Config, Cyber Hygiene & Virtualization',
    category: 'career-skills',
    level: 'Intermediate',
    duration: '2 Months (8 Weeks)',
    tools: ['Linux / Ubuntu Server', 'Windows Server', 'Cisco Packet Tracer', 'Docker', 'VMware'],
    description: 'Practical infrastructure operations: master local area network setup, routing, Linux server administration, backup automation, and workstation security.',
    modules: [
      'Networking Fundamentals: IPv4/IPv6, Subnetting, DNS, DHCP & NAT',
      'Linux Server Administration, CLI Mastery & User Permissions',
      'Windows Active Directory, Group Policies & Domain Controllers',
      'Virtualization with VMware/VirtualBox & Containerization with Docker',
      'Firewall Configuration, Threat Mitigation & Routine Data Backups',
      'Enterprise Helpdesk Troubleshooting & SLA Management'
    ],
    featured: false,
    softwareHouseCertified: true
  },
  {
    id: 'freelancing-remote-work',
    title: 'Freelancing & Remote Work Mastery',
    subtitle: 'Winning High-Ticket International Clients on Upwork, Fiverr & LinkedIn',
    category: 'career-skills',
    level: 'Beginner to Pro',
    duration: '1 Month (4 Weeks)',
    tools: ['Upwork', 'Fiverr Pro', 'LinkedIn Sales Navigator', 'Payoneer', 'Wise'],
    description: 'Turn your tech skills into recurring international currency earnings. Write converting proposals, negotiate prices, avoid platform bans, and build long-term client contracts.',
    modules: [
      'Optimizing Upwork & Fiverr Profiles for Search Visibility',
      'Crafting Non-Generic, Irresistible Custom Job Proposals',
      'Pricing Psychology: Fixed Price vs. Hourly vs. Retainers',
      'Direct Client Acquisition via LinkedIn & Cold Email Outreach',
      'Contract Agreements, Milestone Escrows & Secure International Payments',
      'Scaling into a Boutique Agency / Software House in Lahore'
    ],
    featured: true,
    softwareHouseCertified: true
  }
];
