"use client";
import React from "react";
import {
  FaRegFileAlt,
  FaUsers,
  FaRegEdit,
  FaRegClock,
  FaRegHospital,
  FaRegFile,
  FaHandHoldingUsd
} from "react-icons/fa";

const iconMap = {
  FaRegFileAlt,
  FaUsers,
  FaRegEdit,
  FaRegClock,
  FaRegHospital,
  FaRegFile,
  FaHandHoldingUsd
};

export type Step = {
  id: string;
  label: string;
  icon: keyof typeof iconMap;
};

interface ServiceStepSectionsProps {
  steps: readonly Step[];
  stepContents: Record<string, string>;
}

export default function ServiceStepSections({ steps, stepContents }: ServiceStepSectionsProps) {
  return (
    <>
      {steps && stepContents && steps.map(step => {
        const Icon = iconMap[step.icon];
        return (
          <section
            key={step.id}
            id={step.id}
            className="relative max-w-3xl mx-auto my-16 bg-white rounded-2xl shadow-xl border-l-8 p-10 flex flex-col items-start"
            style={{ scrollMarginTop: 120, borderImage: 'linear-gradient(to bottom, #6366f1, #ec4899) 1' }}
          >
            <div className="absolute -left-16 top-8 bg-gradient-to-br from-indigo-500 to-pink-400 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white" style={{ width: 72, height: 72 }}>
              <Icon size={36} />
            </div>
            <h2 className="text-2xl font-extrabold mb-4 pl-20 flex items-center gap-2 tracking-tight">
              {step.label}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{stepContents[step.id]}</p>
          </section>
        );
      })}
    </>
  );
} 