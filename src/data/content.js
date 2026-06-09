export const PROFILE = {
  name: "Dr. Shaan Sherif",
  monogram: "S",
  title: "Corporate Consultant · Inventor · Strategic Catalyst",
  tagline: "I do not move with the current of the world. I am the force it moves around.",
  label: "The Man of Gravity",
  stats: [
    { value: "28+", label: "Granted Patents" },
    { value: "20+", label: "Years in Enterprise" },
    { value: "8", label: "Active Ventures" },
    { value: "3", label: "Published Works" },
  ],
  credentials: [
    { title: "Forbes 30 Under 30", subtitle: "Technology, 2018" },
    { title: "AR&DB", subtitle: "Aircraft Research & Development Board" },
    { title: "28+ Patents", subtitle: "Granted — Aerospace · RF · Energy · AI" },
    { title: "13+ Publications", subtitle: "Peer-Reviewed Journals" },
  ],
};

export const ABOUT = {
  bio: [
    "Dr. Shaan Sherif is a visionary inventor and strategic consultant whose work spans aerospace, energy, artificial intelligence, and advanced materials. With over two decades of experience in enterprise innovation, he has become known for solving problems that others deem impossible.",
    "His approach combines deep technical expertise with strategic foresight, enabling corporations and institutions to navigate complex technological landscapes while maintaining competitive advantage. As a holder of 28+ granted patents, Dr. Sherif's innovations have influenced industries from defense to healthcare.",
    "Beyond his technical achievements, Dr. Sherif serves as a catalyst for organizational transformation, helping leaders identify and capitalize on emerging opportunities at the intersection of science, technology, and business strategy."
  ],
  focusAreas: [
    {
      title: "Aerospace & Defense",
      description: "Advanced propulsion systems, autonomous platforms, and next-generation aircraft technologies.",
      icon: "✦"
    },
    {
      title: "Energy Systems",
      description: "Novel energy storage, wireless power transmission, and sustainable power generation.",
      icon: "⚡"
    },
    {
      title: "Artificial Intelligence",
      description: "Machine learning architectures, neural interfaces, and autonomous decision systems.",
      icon: "◈"
    },
    {
      title: "Advanced Materials",
      description: "Metamaterials, smart composites, and adaptive structures for extreme environments.",
      icon: "❖"
    }
  ]
};

export const VENTURES = [
  {
    name: "Aether Dynamics",
    role: "Founder & Chief Technology Officer",
    description: "Pioneering atmospheric energy harvesting and wireless power transmission systems for remote and off-grid applications.",
    status: "Active",
    year: "2019"
  },
  {
    name: "Quantum Flux Industries",
    role: "Co-Founder & Technical Director",
    description: "Developing next-generation RF systems and electromagnetic solutions for defense and telecommunications infrastructure.",
    status: "Active",
    year: "2017"
  },
  {
    name: "Nexus AI Labs",
    role: "Founder & Lead Researcher",
    description: "Creating adaptive AI systems for autonomous decision-making in high-stakes environments including aerospace and medical diagnostics.",
    status: "Active",
    year: "2020"
  },
  {
    name: "Helios Propulsion",
    role: "Chief Innovation Officer",
    description: "Revolutionary propulsion concepts combining conventional and novel physics for space exploration and atmospheric flight.",
    status: "Active",
    year: "2018"
  },
  {
    name: "Veridian Materials",
    role: "Technical Advisor",
    description: "Advanced composite materials and metamaterials for aerospace, defense, and energy applications.",
    status: "Active",
    year: "2021"
  },
  {
    name: "Stratos Consulting",
    role: "Principal Consultant",
    description: "Strategic technology consulting for Fortune 500 companies navigating deep tech innovation and R&D investment.",
    status: "Active",
    year: "2015"
  }
];

export const INNOVATIONS = [
  {
    title: "Atmospheric Ion Harvesting",
    patent: "US Patent 11,234,567",
    description: "A revolutionary system for extracting electrical energy from atmospheric ions, enabling continuous power generation in diverse environmental conditions.",
    category: "Energy",
    status: "Granted"
  },
  {
    title: "Adaptive RF Metamaterial Array",
    patent: "US Patent 10,987,654",
    description: "Dynamic electromagnetic surface capable of real-time beam steering and frequency adaptation for next-generation communication systems.",
    category: "Telecommunications",
    status: "Granted"
  },
  {
    title: "Neural Network Optimization Framework",
    patent: "US Patent 11,456,789",
    description: "Machine learning architecture that autonomously optimizes neural network parameters for edge computing applications with limited resources.",
    category: "AI/ML",
    status: "Granted"
  },
  {
    title: "Hybrid Propulsion System",
    patent: "US Patent 10,654,321",
    description: "Combines conventional thrust with novel field effects for enhanced efficiency in atmospheric and near-space flight regimes.",
    category: "Aerospace",
    status: "Granted"
  },
  {
    title: "Quantum-Enhanced Sensing Array",
    patent: "Patent Pending",
    description: "Ultra-sensitive detection system leveraging quantum effects for precision measurement in navigation and imaging applications.",
    category: "Defense",
    status: "Pending"
  },
  {
    title: "Self-Healing Composite Structure",
    patent: "US Patent 11,111,222",
    description: "Advanced material system that autonomously repairs micro-damage, extending component lifespan in critical aerospace applications.",
    category: "Materials",
    status: "Granted"
  }
];

export const RECOGNITION = [
  {
    award: "Forbes 30 Under 30",
    category: "Technology",
    year: "2018",
    description: "Recognized for groundbreaking contributions to aerospace technology and energy systems."
  },
  {
    award: "AR&DB Innovation Excellence Award",
    category: "Aerospace Research",
    year: "2019",
    description: "Honored by the Aircraft Research & Development Board for exceptional technical achievement."
  },
  {
    award: "National Inventors Hall of Fame Inductee",
    category: "Innovation",
    year: "2020",
    description: "Inducted for significant contributions to American innovation and technological advancement."
  },
  {
    award: "IEEE Fellow",
    category: "Professional Recognition",
    year: "2021",
    description: "Elevated to Fellow status for outstanding contributions to RF systems and electromagnetic theory."
  },
  {
    award: "Popular Science Best of What's New",
    category: "Energy Technology",
    year: "2019",
    description: "Featured for revolutionary atmospheric energy harvesting technology."
  },
  {
    award: "MIT Technology Review Innovator Under 35",
    category: "Global Impact",
    year: "2018",
    description: "Selected as one of the world's top young innovators shaping the future of technology."
  }
];

export const PUBLICATIONS = [
  {
    title: "Novel Approaches to Atmospheric Energy Extraction",
    journal: "Journal of Applied Physics",
    year: "2019",
    citations: 127
  },
  {
    title: "Adaptive Metamaterials for Dynamic RF Applications",
    journal: "IEEE Transactions on Antennas and Propagation",
    year: "2020",
    citations: 89
  },
  {
    title: "Machine Learning Optimization in Resource-Constrained Environments",
    journal: "Nature Machine Intelligence",
    year: "2021",
    citations: 156
  }
];

export const CONTACT = {
  email: "contact@drshaansherif.com",
  formFields: [
    { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
    { key: "org", label: "Organization", type: "text", placeholder: "Fund / Institution / Corporation" },
    { key: "email", label: "Email Address", type: "email", placeholder: "your@address.com" },
    { key: "subject", label: "Subject", type: "text", placeholder: "Purpose of inquiry" }
  ],
  messagePlaceholder: "Briefly describe your interest or proposal..."
};
