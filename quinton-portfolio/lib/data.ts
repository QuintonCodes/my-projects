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
      level: 8,
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
      title: "Framer Motion",
      level: 6,
    },
  ],
  backend: [
    {
      title: "Node.js",
      level: 8,
    },
    {
      title: "C#",
      level: 7,
    },
    {
      title: "PostgreSQL",
      level: 6,
    },
    {
      title: "SQL",
      level: 8,
    },
    {
      title: "Express.js",
      level: 9,
    },
  ],
  tools: [
    "Git",
    "ASP.NET Core",
    "ShadCN/UI",
    "Prisma",
    "Postman",
    "GitHub Actions",
    "Jest",
    "Figma",
    "CI/CD",
    "Agile",
  ],
};

export const projects = [
  {
    title: "KickFlip e-Commerce Website",
    description:
      "A full-featured online store with shopping cart, payment processing, and admin dashboard.",
    stack: ["Next.js", "PostgreSQL", "Stripe", "TailwindCSS"],
    gihub: "https://github.com/QuintonCodes/My-Projects/tree/main/kickflip",
    live: "",
  },
  {
    title: "Spotify Clone",
    description:
      "A fully functional spotify clone with advanced music features",
    stack: ["Next.js", "PostgreSQL", "TailwindCSS"],
    gihub: "https://github.com/QuintonCodes/My-Projects/tree/main/spotify-2.0",
    live: "",
  },
];

export const experience = [
  {
    title: "Web Developer",
    company: "Freelance - Takalani Lubrication Supplier",
    duration: "Feb 2025 - Mar 2025",
    description:
      "Solely developed and deployed a full-stack business website using Next.js and Tailwind CSS. Built and integrated a chatbot assistant handling up to 30+ daily customer inquiries, cutting manual intervention by over 80%. Designed a UI consistent with the client’s branding, improving average session duration and engagement by 30%",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Web Developer",
    company: "Freelance - UniLink",
    duration: "Apr 2025 - Present",
    description:
      "Resolved UX pain points, reducing authentication-related support tickets by over 70%. Designed and implemented key UI components (home, login, register) achieving a 100% approval rating on first client review. Configured automated Vercel preview deployments to streamline iteration cycles across a team of 2+ collaborators, reducing staging delays by 50%",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export const education = {
  institution: "Eduvos",
  location: "Pretoria, Gauteng",
  description:
    "Pursuing a Bachelor of Science in Information Technology with a specialization in Software Engineering at Eduvos, Pretoria. The program emphasizes practical skills in software development, covering areas such as programming in C#, data structures and algorithms, mobile app development, and software architecture design. Through a blend of theoretical knowledge and hands-on projects, I am building a strong foundation to contribute effectively to the tech industry.",
  degree: "BSc in Information Technology (Software Engineering)",
  duration: "Feb 2023 - Present",
  modules: [
    "Programming in C#",
    "Data Structures and Algorithms in C#",
    "Mobile App Development",
    "Database Systems",
    "Software Architecture Design",
    "Web Development & e-Commerce",
    "IT Project Management",
    "Object-Oriented Systems Analysis and Design",
  ],
  gpa: 3.74,
};
