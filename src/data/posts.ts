import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    excerpt: 'Learn the basics of Next.js and how to build modern web applications with this powerful React framework.',
    content: `Next.js is a React framework that enables server-side rendering and static site generation for React applications. It provides a great developer experience with features like hot reloading, automatic code splitting, and optimized production builds.

In this post, we'll explore the core concepts of Next.js and how to get started with building your first application.`,
    date: '2024-05-01',
    author: 'John Doe',
    tags: ['Next.js', 'React', 'Web Development'],
    image: '/images/nextjs-blog.jpg'
  },
  {
    id: '2',
    title: 'The Power of TypeScript',
    slug: 'power-of-typescript',
    excerpt: 'Discover how TypeScript can improve your development workflow and catch errors before they reach production.',
    content: `TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to the language, which can help catch errors early in the development process.

In this article, we'll explore the key features of TypeScript and how it can benefit your projects.`,
    date: '2024-05-03',
    author: 'Jane Smith',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    image: '/images/typescript-blog.jpg'
  },
  {
    id: '3',
    title: 'Building Responsive UIs with Tailwind CSS',
    slug: 'responsive-uis-with-tailwind',
    excerpt: 'Learn how to create beautiful, responsive user interfaces using Tailwind CSS.',
    content: `Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides a set of low-level utility classes that let you build completely custom designs.

In this tutorial, we'll walk through creating a responsive layout using Tailwind CSS.`,
    date: '2024-05-05',
    author: 'Mike Johnson',
    tags: ['CSS', 'Tailwind', 'UI/UX'],
    image: '/images/tailwind-blog.jpg'
  }
]; 