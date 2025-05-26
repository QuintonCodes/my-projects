"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface CheckoutStep {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface CheckoutStepperProps {
  steps: CheckoutStep[];
  currentStep: string;
}

export default function CheckoutStepper({
  steps,
  currentStep,
}: CheckoutStepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden md:block">
        <div className="relative flex justify-between">
          {/* Progress Bar */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-muted">
            <motion.div
              className="absolute top-0 left-0 h-full bg-teal-700"
              initial={{ width: "0%" }}
              animate={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted
                      ? "bg-teal-700 border-teal-700 text-white"
                      : isCurrent
                      ? "bg-white border-teal-700 text-teal-700"
                      : "bg-white border-muted text-muted-foreground"
                  }`}
                  animate={{
                    backgroundColor: isCompleted
                      ? "rgb(15 118 110)"
                      : isCurrent
                      ? "rgb(255 255 255)"
                      : "rgb(255 255 255)",
                    borderColor:
                      isCompleted || isCurrent
                        ? "rgb(15 118 110)"
                        : "rgb(226 232 240)",
                    color: isCompleted
                      ? "rgb(255 255 255)"
                      : isCurrent
                      ? "rgb(15 118 110)"
                      : "rgb(148 163 184)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isCompleted || isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`text-xs font-medium px-2 py-1 rounded ${
                  isCurrent
                    ? "bg-teal-700 text-white"
                    : isCompleted
                    ? "text-teal-700"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
