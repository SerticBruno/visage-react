'use client';

import Link from 'next/link';

interface InteractiveLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function InteractiveLink({ href, className, children }: InteractiveLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Link>
  );
} 