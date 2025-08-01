import { api, API_ENDPOINTS } from "@/lib/api"
import type { SiteSettings } from "@/types/api"

// Core API Service - интеграция с Django apps/core
export const coreService = {
  // Получить настройки сайта
  getSiteSettings: async (): Promise<SiteSettings[]> => {
    const response = await api.get(API_ENDPOINTS.SITE_SETTINGS)
    return response.data
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get(API_ENDPOINTS.HEALTH_CHECK)
    return response.data
  },
}
