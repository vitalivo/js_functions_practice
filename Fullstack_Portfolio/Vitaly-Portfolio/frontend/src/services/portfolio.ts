import { api, API_ENDPOINTS } from "@/lib/api"
import type { ApiResponse, Category, Technology, Project, Skill } from "@/types/api"

// Portfolio API Service - интеграция с Django apps/portfolio
export const portfolioService = {
  // Получить все категории
  getCategories: async (): Promise<ApiResponse<Category>> => {
    const response = await api.get(API_ENDPOINTS.CATEGORIES)
    return response.data
  },

  // Получить все технологии
  getTechnologies: async (): Promise<ApiResponse<Technology>> => {
    const response = await api.get(API_ENDPOINTS.TECHNOLOGIES)
    return response.data
  },

  // Получить все проекты
  getProjects: async (): Promise<ApiResponse<Project>> => {
    const response = await api.get(API_ENDPOINTS.PROJECTS)
    return response.data
  },

  // Получить рекомендуемые проекты
  getFeaturedProjects: async (): Promise<Project[]> => {
    const response = await api.get(API_ENDPOINTS.PROJECTS_FEATURED)
    return response.data
  },

  // Получить проект по slug
  getProject: async (slug: string): Promise<Project> => {
    const response = await api.get(`${API_ENDPOINTS.PROJECTS}${slug}/`)
    return response.data
  },

  // Получить все навыки
  getSkills: async (): Promise<ApiResponse<Skill>> => {
    const response = await api.get(API_ENDPOINTS.SKILLS)
    return response.data
  },

  // Получить навыки по категории
  getSkillsByCategory: async (category: string): Promise<ApiResponse<Skill>> => {
    const response = await api.get(`${API_ENDPOINTS.SKILLS}?category=${category}`)
    return response.data
  },
}
