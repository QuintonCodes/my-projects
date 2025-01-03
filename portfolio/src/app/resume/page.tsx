"use client";

import {
  FaCss3,
  FaGit,
  FaHtml5,
  FaJs,
  FaNode,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const about = {
  title: "About me",
  description: "A full description about myself",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Kagiso Jiyane",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+27) 69 787 4817",
    },
    {
      fieldName: "Experience",
      fieldValue: "2+ Years",
    },
    {
      fieldName: "Nationality",
      fieldValue: "South African",
    },
    {
      fieldName: "Email",
      fieldValue: "kagisojiyane28@gmail.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Afrikaans & Sepedi",
    },
  ],
};

const experience = {
  icon: "",
  title: "My experience",
  description: "Overview of my experience",
  items: [
    {
      company: "San Carlo",
      position: "Private Tutor",
      duration: "01-2024",
    },
  ],
};

const education = {
  icon: "",
  title: "My education",
  description: "Overview of my education",
  items: [
    {
      institution: "Eduvos",
      position: "Bachelor's Degree in IT (Software Engineering)",
      duration: "2023 - present",
    },
    {
      institution: "Hoerskool Pretoria Wes",
      position: "Highschool",
      duration: "2018 - 2022",
    },
  ],
};

const ResumePage = () => {
  return <div>Resume page</div>;
};

export default ResumePage;
