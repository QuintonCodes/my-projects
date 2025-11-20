import {
  FaGithub,
  FaLinkedinIn,
  FaStackOverflow,
  FaTwitter,
} from "react-icons/fa";

export const details = {
  title: "Hello I'm",
  role: "Full Stack Developer",
  name: "Kagiso Jiyane",
  phone: "+27697874817",
  location: "Pretoria, Gauteng",
  hero_description:
    "I build accessible, user-friendly web applications with modern technologies. Focused on creating clean, efficient, and maintainable code",
  links: [
    {
      icon: FaGithub,
      path: "https://github.com/QuintonCodes",
    },
    {
      icon: FaStackOverflow,
      path: "https://stackoverflow.com/users/21905567/quinton",
    },
    {
      icon: FaLinkedinIn,
      path: "https://www.linkedin.com/in/kagiso-jiyane",
    },
    {
      icon: FaTwitter,
      path: "https://x.com/quinton_dev",
    },
  ],
  imageURL: "/me.webp",
  email: "kagisojiyane28@gmail.com",
};

export const initialStats = [
  { num: 0, text: "Projects completed" },
  { num: 0, text: "Technologies mastered" },
  { num: 0, text: "Code commits" },
];

export const sections = [
  "hero",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
];

export const skills = {
  frontend: [
    {
      title: "Next.js",
      level: 9,
    },
    {
      title: "TypeScript",
      level: 8,
    },
    {
      title: "HTML/CSS",
      level: 10,
    },
    {
      title: "Tailwind CSS",
      level: 9,
    },
    {
      title: "React Native (Expo)",
      level: 7,
    },
  ],
  backend: [
    {
      title: "Node.js",
      level: 9,
    },
    {
      title: "C#",
      level: 8,
    },
    {
      title: "Python",
      level: 7,
    },
    {
      title: "SQL",
      level: 8,
    },
    {
      title: "ASP.NET Core",
      level: 7,
    },
  ],
  tools: [
    "Git",
    "GitHub",
    "GitHub Actions",
    "Vite",
    "MetaMask",
    "Postman",
    "PostgreSQL (Neon)",
    "Jest",
    "Figma",
    "CI/CD",
    "Agile",
    "Blockchain APIs",
  ],
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  gitHub: string;
  live: string;
};

export const projects: Project[] = [
  {
    title: "EduLite - Mobile LMS",
    description:
      "Full-stack mobile LMS engineered for collaborative studying and resource sharing. Features a scalable Next.js backend, robust data management with Prisma, and Jest unit testing for reliability.",
    stack: [
      "React Native (Expo)",
      "Next.js",
      "Prisma",
      "PostgreSQL (Neon)",
      "Jest",
    ],
    gitHub: "https://github.com/QuintonCodes/edulite",
    live: "",
  },
  {
    title: "SwopMarket Website",
    description:
      "A full-featured online store with shopping cart, payment processing, and admin dashboard i built for my 3rd year project.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
    gitHub: "https://github.com/QuintonCodes/my-projects/tree/main/swop-market",
    live: "https://swop-market.vercel.app",
  },
  {
    title: "Chordify - Spotify Music Manager",
    description:
      "A modern UI overhaul of a music streaming platform, implementing a custom 'Daily Artist' algorithm to boost playlist diversity and improve album recommendation logic.",
    stack: ["Next.js", "PostgreSQL", "TailwindCSS"],
    gitHub: "https://github.com/QuintonCodes/My-Projects/tree/main/chordify",
    live: "",
  },
];

export type Experience = {
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  links: { name: string; href: string }[];
};

export const experience: Experience[] = [
  {
    title: "Part-Time Web Developer",
    company: "Caledon Code",
    duration: "October 2025",
    description:
      "Engaged in a short-term contract role, collaborating with a dedicated team to enhance the company’s services page. Delivered a responsive and highly-performant front-end component using React (Vite).",
    technologies: ["React (Vite)", "Tailwind CSS"],
    links: [
      {
        name: "Caledon Code",
        href: "https://caledon-code-services.vercel.app",
      },
    ],
  },
  {
    title: "Full Stack Web Developer",
    company: "Freelance",
    duration: "Feb 2025 - Sept 2025",
    description:
      "Developed and deployed Takalani Lubrication Suppliers website, integrating a chatbot to handle 30+ daily inquiries and reduce manual work by 80%. Built Karanka Multiverse which accepts fiat cash and KRKUNI cryptocurrency with MetaMask.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MetaMask",
      "Vercel",
    ],
    links: [
      {
        name: "Karanka Multiverse",
        href: "https://karanka-multiverse.vercel.app",
      },
      {
        name: "Takalani Lubrications",
        href: "https://takalanilubesupplier.co.za",
      },
    ],
  },
];

export type Education = {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  description: string;
  gpa: number;
  modules: string[];
};

export const education: Education = {
  institution: "Eduvos",
  location: "Pretoria, Gauteng",
  description:
    "Pursuing a Bachelor of Science in Information Technology with a specialization in Software Engineering at Eduvos, Pretoria. The program emphasizes practical skills in software development, covering areas such as programming in C#, data structures and algorithms, mobile app development, and software architecture design. Through a blend of theoretical knowledge and hands-on projects, I am building a strong foundation to contribute effectively to the tech industry.",
  degree: "BSc in Information Technology (Software Engineering)",
  duration: "Feb 2023 - May 2026 (Expected)",
  modules: [
    "Programming in C#",
    "Data Structures and Algorithms in C#",
    "Mobile App Development",
    "Database Systems",
    "Web Development & e-Commerce",
  ],
  gpa: 3.22,
};
