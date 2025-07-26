import { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { blogPosts } from '@/data/posts'
import { BLOG_ENABLED } from '@/lib/config'

// Utility function to convert text to URL-friendly slug
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://visagestudio.hr' // Replace with your actual domain

  // Static routes
  const staticRoutes = [
    '',
    '/usluge',
    ...(BLOG_ENABLED ? ['/blog'] : []),
    '/cjenik',
    '/o-nama',
    '/kontakt',
    '/katalog',
    '/proizvodi',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Service routes
  const serviceRoutes = Object.keys(services).map(service => ({
    url: `${baseUrl}/usluge/${service}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog post routes (only when blog is enabled)
  const blogRoutes = BLOG_ENABLED ? blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })) : []

  // Blog category routes (only when blog is enabled)
  const categoryRoutes = BLOG_ENABLED ? (() => {
    const categories = Array.from(new Set(blogPosts.flatMap(post => post.tags)))
    return categories.map(category => ({
      url: `${baseUrl}/blog/kategorija/${toSlug(category)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  })() : []

  // Blog author routes (only when blog is enabled)
  const authorRoutes = BLOG_ENABLED ? (() => {
    const authors = Array.from(new Set(blogPosts.map(post => post.author)))
    return authors.map(author => ({
      url: `${baseUrl}/blog/autor/${toSlug(author)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  })() : []

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...authorRoutes,
  ]
} 