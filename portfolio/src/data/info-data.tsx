import { Service } from "@/components/service-card";
import {
  FaCss3,
  FaEnvelope,
  FaGit,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaJs,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaNode,
  FaPhoneAlt,
  FaPython,
  FaReact,
  FaTwitter,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

// Home Page
export const linksData = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

export const heroData = {
  title: "Hello I'm",
  subtitle: "Kagiso Jiyane",
  description:
    "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.",
  role: "Software Engineer",
};

export const socialsData = [
  { icon: <FaGithub />, path: "https://github.com/QuintonCodes" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/insomiac.ww" },
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/in/kagiso-jiyane",
  },
  { icon: <FaTwitter />, path: "https://x.com/insom1ac1" },
];

// Resume Page
export const skillsData = {
  title: "My skills",
  description: "An overview of my best strengths",
  skillList: [
    { icon: <FaHtml5 />, name: "html 5" },
    { icon: <FaCss3 />, name: "css 3" },
    { icon: <FaJs />, name: "javascript" },
    { icon: <FaNode />, name: "node.js" },
    { icon: <FaPython />, name: "python" },
    { icon: <FaReact />, name: "react" },
    { icon: <FaGit />, name: "git" },
    { icon: <SiNextdotjs />, name: "next.js" },
    { icon: <SiTailwindcss />, name: "tailwind.css" },
    { icon: <SiTypescript />, name: "typescript" },
    { icon: <TbBrandCSharp />, name: "c#" },
  ],
};

export const experienceData = [
  {
    company: "San Carlo",
    position: "Private Tutor",
    duration: "01-2024 - 11-2024",
  },
];

export const educationData = [
  {
    institution: "Eduvos",
    degree: "Bachelor's Degree in IT (Software Engineering)",
    duration: "2023 - present",
  },
  {
    institution: "Hoerskool Pretoria Wes",
    degree: "Highschool",
    duration: "2018 - 2022",
  },
];

export const aboutData = {
  title: "About me",
  description: "A full description about myself",
  info: [
    { fieldName: "Name", fieldValue: "Kagiso Jiyane" },
    { fieldName: "Phone", fieldValue: "(+27) 69 787 4817" },
    { fieldName: "Experience", fieldValue: "1 Year" },
    { fieldName: "Nationality", fieldValue: "South African" },
    { fieldName: "Email", fieldValue: "kagisojiyane28@gmail.com" },
    { fieldName: "Freelance", fieldValue: "Available" },
    { fieldName: "Languages", fieldValue: "English, Afrikaans & Sepedi" },
  ],
};

// Services Page
export const servicesData: Service[] = [
  {
    num: "01",
    title: "Web Development",
    description: "Developing the frontend and backend for websites",
  },
  {
    num: "02",
    title: "Logo Design",
    description: "Creating logos for businesses for any use case",
  },
  {
    num: "03",
    title: "Software Development",
    description: "Writing and maintaining software code for applications",
  },
];

// Work Page
export const projectsData = [
  {
    num: "01",
    category: "fullstack",
    title: "kickFlip e-commerce website",
    description: "An E-Commerce website for a clothing store",
    stack: [
      {
        name: "React",
      },
      {
        name: "TypeScript",
      },
      {
        name: "Tailwind.css",
      },
      {
        name: "Node.js",
      },
    ],
    image: "/work/thumb1.png",
    live: "",
    github: "https://github.com/QuintonCodes/My-Projects/tree/main/kickflip",
  },
  {
    num: "02",
    category: "frontend",
    title: "spotify api website",
    description: "A website using spotify's APIs",
    stack: [
      {
        name: "Next.js",
      },
      {
        name: "Tailwind.css",
      },
      {
        name: "TypeScript",
      },
    ],
    image: "/work/thumb2.png",
    live: "",
    github: "https://github.com/QuintonCodes/My-Projects/tree/main/spotify-app",
  },
  {
    num: "03",
    category: "backend",
    title: "asp.net core api",
    description: "An API created using C# for the spotify API website",
    stack: [
      {
        name: "C#",
      },
      {
        name: "ASP.NET Core",
      },
      {
        name: "SQL",
      },
    ],
    image: "/work/thumb3.png",
    live: "",
    github:
      "https://github.com/QuintonCodes/My-Projects/tree/main/csharp-web-api",
  },
];

// Contact Page
export const infoData = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+27) 69 787 4817",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "kagisojiyane28@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "327 Frederick Street, Pretoria West",
  },
];
