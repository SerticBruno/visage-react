"use client";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

export type Step = {
  id: string;
  label: string;
  icon: string;
};

interface ServiceStepsNavProps {
  steps: readonly Step[];
}

export default function ServiceStepsNav({ steps }: ServiceStepsNavProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, stepId: string) => {
    e.preventDefault();
    const element = document.getElementById(stepId);
    if (element) {
      const headerOffset = 120; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      for (const step of steps) {
        const el = document.getElementById(step.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActive(step.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [steps]);

  return (
    <nav className="w-full flex justify-center">
      <div className="flex overflow-x-auto gap-8 py-6 px-4 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-5xl w-full items-center">
        {steps.map(step => {
          const Icon = FaIcons[step.icon as keyof typeof FaIcons];
          const isActive = active === step.id;
          return (
            <a
              key={step.id}
              href={`#${step.id}`}
              onClick={(e) => handleClick(e, step.id)}
              className={`flex flex-col items-center px-2 transition group ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
              style={{ minWidth: 90 }}
            >
              <div className={`rounded-full p-3 mb-2 transition-all duration-200 ${isActive ? 'bg-indigo-50 shadow-md' : 'bg-gray-50 group-hover:bg-indigo-50'}`}>
                {Icon && <Icon size={44} />}
              </div>
              <span className={`mt-1 text-sm font-medium ${isActive ? 'border-b-2 border-indigo-600 pb-0.5' : ''}`}>{step.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
} 