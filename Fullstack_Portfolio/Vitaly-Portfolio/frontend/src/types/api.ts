// API Types для интеграции с Django Backend
export interface ApiResponse<T> {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}

// Core Types (из Django apps/core)
export interface SiteSettings {
  id: number
  site_name_en: string
  site_name_ru: string
  site_name_he: string
  tagline_en: string
  tagline_ru: string
  tagline_he: string
  description_en: string
  description_ru: string
  description_he: string
  logo: string | null
  email: string
  phone: string
  linkedin_url: string
  github_url: string
  telegram_url: string
  is_active: boolean
}

// Portfolio Types (из Django apps/portfolio)
export interface Category {
  id: number
  slug: string
  name_en: string
  name_ru: string
  name_he: string
  description_en: string
  description_ru: string
  description_he: string
  icon: string
  color: string
  position: number
  is_active: boolean
}

export interface Technology {
  id: number
  slug: string
  name: string
  description_en: string
  description_ru: string
  description_he: string
  icon: string
  logo: string | null
  color: string
  website: string
  version: string
  position: number
  is_active: boolean
}

export interface Project {
  id: number
  slug: string
  title_en: string
  title_ru: string
  title_he: string
  subtitle_en: string
  subtitle_ru: string
  subtitle_he: string
  description_en: string
  description_ru: string
  description_he: string
  content_en: string
  content_ru: string
  content_he: string
  thumbnail: string
  cover_image: string | null
  categories: Category[]
  technologies: Technology[]
  client_name: string
  client_website: string
  project_url: string
  github_url: string
  start_date: string | null
  end_date: string | null
  is_ongoing: boolean
  is_featured: boolean
  status: "draft" | "published" | "archived"
  published_at: string
  view_count: number
  order: number
}

export interface Skill {
  id: number
  slug: string
  name_en: string
  name_ru: string
  name_he: string
  description_en: string
  description_ru: string
  description_he: string
  icon: string
  level: number
  category: "frontend" | "backend" | "database" | "devops" | "design" | "soft" | "other"
  years_experience: number
  position: number
  is_active: boolean
}

// Blog Types (из Django apps/blog)
export interface BlogCategory {
  id: number
  slug: string
  name_en: string
  name_ru: string
  name_he: string
  description_en: string
  description_ru: string
  description_he: string
  icon: string
  color: string
  order: number
  is_active: boolean
}

export interface BlogTag {
  id: number
  slug: string
  name_en: string
  name_ru: string
  name_he: string
  description_en: string
  description_ru: string
  description_he: string
  color: string
  is_active: boolean
}

export interface BlogPost {
  id: number
  slug: string
  title_en: string
  title_ru: string
  title_he: string
  subtitle_en: string
  subtitle_ru: string
  subtitle_he: string
  excerpt_en: string
  excerpt_ru: string
  excerpt_he: string
  content_en: string
  content_ru: string
  content_he: string
  thumbnail: string
  cover_image: string | null
  categories: BlogCategory[]
  tags: BlogTag[]
  read_time: number
  is_featured: boolean
  status: "draft" | "published" | "archived"
  published_at: string
  view_count: number
  is_active: boolean
}

// Contact Types (из Django apps/contacts)
export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

// Common Types
export type Locale = "en" | "ru" | "he"

export interface LocalizedContent {
  en: string
  ru: string
  he: string
}
