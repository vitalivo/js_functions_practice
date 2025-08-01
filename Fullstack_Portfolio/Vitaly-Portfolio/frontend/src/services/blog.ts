import { api, API_ENDPOINTS } from "@/lib/api"
import type { ApiResponse, BlogCategory, BlogTag, BlogPost } from "@/types/api"

// Blog API Service - интеграция с Django apps/blog
export const blogService = {
  // Получить все категории блога
  getCategories: async (): Promise<ApiResponse<BlogCategory>> => {
    const response = await api.get(API_ENDPOINTS.BLOG_CATEGORIES)
    return response.data
  },

  // Получить все теги
  getTags: async (): Promise<ApiResponse<BlogTag>> => {
    const response = await api.get(API_ENDPOINTS.BLOG_TAGS)
    return response.data
  },

  // Получить все посты
  getPosts: async (): Promise<ApiResponse<BlogPost>> => {
    const response = await api.get(API_ENDPOINTS.BLOG_POSTS)
    return response.data
  },

  // Получить рекомендуемые посты
  getFeaturedPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get(API_ENDPOINTS.BLOG_POSTS_FEATURED)
    return response.data
  },

  // Получить пост по slug
  getPost: async (slug: string): Promise<BlogPost> => {
    const response = await api.get(`${API_ENDPOINTS.BLOG_POSTS}${slug}/`)
    return response.data
  },
}
