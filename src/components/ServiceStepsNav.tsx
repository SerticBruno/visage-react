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
      <div className="flex overflow-x-auto gap-8 py-6 px-4 bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200 max-w-5xl w-full items-center">
        {steps.map(step => {
          const Icon = FaIcons[step.icon as keyof typeof FaIcons];
          const isActive = active === step.id;
          return (
            <a
              key={step.id}
              href={`#${step.id}`}
              onClick={(e) => handleClick(e, step.id)}
              className={`flex flex-col items-center px-2 transition-all duration-300 group ${isActive ? 'text-slate-700' : 'text-gray-700 hover:text-slate-700'}`}
              style={{ minWidth: 90 }}
            >
              <div className={`rounded-full p-3 mb-2 transition-all duration-300 ${isActive 
                ? 'bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 shadow-md transform scale-110' 
                : 'bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-slate-50 group-hover:via-slate-100 group-hover:to-slate-200 group-hover:shadow-sm group-hover:transform group-hover:scale-105'}`}>
                {Icon && <Icon size={44} />}
              </div>
              <span className={`mt-1 text-sm font-medium transition-all duration-300 ${isActive ? 'border-b-2 border-slate-700 pb-0.5' : 'group-hover:border-b group-hover:border-slate-300 group-hover:pb-0.5'}`}>{step.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
} 