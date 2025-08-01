import { api, API_ENDPOINTS } from "@/lib/api"
import type { ContactMessage } from "@/types/api"

// Contacts API Service - интеграция с Django apps/contacts
export const contactsService = {
  // Отправить сообщение
  sendMessage: async (data: ContactMessage): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post(API_ENDPOINTS.CONTACT_MESSAGES, data)
      return {
        success: true,
        message: "Message sent successfully!",
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to send message. Please try again.",
      }
    }
  },
}
