import {
  FaCss3,
  FaGit,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaJs,
  FaLinkedinIn,
  FaNode,
  FaPython,
  FaReact,
  FaTwitter,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

// Home Page
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
    { fieldName: "Experience", fieldValue: "2+ Years" },
    { fieldName: "Nationality", fieldValue: "South African" },
    { fieldName: "Email", fieldValue: "kagisojiyane28@gmail.com" },
    { fieldName: "Freelance", fieldValue: "Available" },
    { fieldName: "Languages", fieldValue: "English, Afrikaans & Sepedi" },
  ],
};
