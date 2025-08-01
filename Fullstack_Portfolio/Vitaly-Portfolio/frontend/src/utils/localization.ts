import type { Locale } from "@/types/api"

// Утилиты для работы с локализацией
export function getLocalizedField<T extends Record<string, any>>(
  item: T,
  fieldName: string,
  locale: Locale,
  fallback: Locale = "en",
): string {
  const localizedField = `${fieldName}_${locale}`
  const fallbackField = `${fieldName}_${fallback}`

  return item[localizedField] || item[fallbackField] || ""
}

export function formatDate(date: string, locale: Locale): string {
  const localeMap = {
    en: "en-US",
    ru: "ru-RU",
    he: "he-IL",
  }

  return new Intl.DateTimeFormat(localeMap[locale]).format(new Date(date))
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "he" ? "rtl" : "ltr"
}

export function getLanguageName(locale: Locale): string {
  const names = {
    en: "English",
    ru: "Русский",
    he: "עברית",
  }
  return names[locale]
}
