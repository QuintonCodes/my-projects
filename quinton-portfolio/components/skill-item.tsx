"use client";

import { motion } from "motion/react";

interface SkillItemProps {
  name: string;
  level: number; // 1-10
}

export default function SkillItem({ name, level }: SkillItemProps) {
  const percentage = `${level * 10}%`;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{percentage}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: percentage }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
