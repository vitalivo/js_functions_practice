"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  ArrowDown,
  ExternalLink,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Menu,
  Award,
  Download,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

type Locale = "en" | "ru" | "he"

const messages = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      portfolio: "Portfolio",
      certificates: "Certificates",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Full Stack Developer",
      subtitle: "I create modern web applications with Django and Next.js",
      cta: "View My Work",
      contact: "Get In Touch",
    },
    about: {
      title: "About Me",
      subtitle: "Passionate developer with expertise in modern web technologies",
      role: "Full Stack Developer",
      description1:
        "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications.",
      description2:
        "With experience in Django, Next.js, React, and TypeScript, I bring ideas to life through clean code and thoughtful design.",
    },
    portfolio: {
      title: "My Portfolio",
      subtitle: "Recent projects and work",
      viewProject: "View Project",
      viewCode: "View Code",
    },
    blog: {
      title: "Blog",
      subtitle: "Thoughts and insights on web development",
      readMore: "Read More",
      readTime: "min read",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's discuss your next project",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
    },
    skills: {
      title: "Skills & Technologies",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
    },
    certificates: {
      title: "Certificates & Achievements",
      subtitle: "Professional certifications and accomplishments",
      viewCertificate: "View Certificate",
      download: "Download",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      about: "Обо мне",
      skills: "Навыки",
      portfolio: "Портфолио",
      certificates: "Сертификаты",
      blog: "Блог",
      contact: "Контакты",
    },
    hero: {
      greeting: "Привет, я",
      title: "Full Stack Разработчик",
      subtitle: "Создаю современные веб-приложения с Django и Next.js",
      cta: "Посмотреть работы",
      contact: "Связаться",
    },
    about: {
      title: "Обо мне",
      subtitle: "Увлеченный разработчик с экспертизой в современных веб-технологиях",
      role: "Full Stack Разработчик",
      description1:
        "Я увлеченный full-stack разработчик с экспертизой в современных веб-технологиях. Люблю создавать эффективные, масштабируемые и удобные приложения.",
      description2:
        "С опытом работы с Django, Next.js, React и TypeScript, я воплощаю идеи в жизнь через чистый код и продуманный дизайн.",
    },
    portfolio: {
      title: "Мое портфолио",
      subtitle: "Последние проекты и работы",
      viewProject: "Посмотреть проект",
      viewCode: "Посмотреть код",
    },
    blog: {
      title: "Блог",
      subtitle: "Мысли и идеи о веб-разработке",
      readMore: "Читать далее",
      readTime: "мин чтения",
    },
    contact: {
      title: "Связаться со мной",
      subtitle: "Давайте обсудим ваш следующий проект",
      name: "Имя",
      email: "Email",
      subject: "Тема",
      message: "Сообщение",
      send: "Отправить",
      success: "Сообщение отправлено успешно!",
      error: "Не удалось отправить сообщение. Попробуйте еще раз.",
    },
    skills: {
      title: "Навыки и технологии",
      frontend: "Фронтенд",
      backend: "Бэкенд",
      database: "База данных",
      devops: "DevOps",
    },
    certificates: {
      title: "Сертификаты и достижения",
      subtitle: "Профессиональные сертификаты и достижения",
      viewCertificate: "Посмотреть сертификат",
      download: "Скачать",
    },
  },
  he: {
    nav: {
      home: "בית",
      about: "אודות",
      skills: "כישורים",
      portfolio: "תיק עבודות",
      certificates: "תעודות",
      blog: "בלוג",
      contact: "צור קשר",
    },
    hero: {
      greeting: "שלום, אני",
      title: "מפתח Full Stack",
      subtitle: "יוצר אפליקציות ווב מודרניות עם Django ו-Next.js",
      cta: "צפה בעבודות שלי",
      contact: "צור קשר",
    },
    about: {
      title: "אודותיי",
      subtitle: "מפתח נלהב עם מומחיות בטכנולוגיות ווב מודרניות",
      role: "מפתח Full Stack",
      description1:
        "אני מפתח full-stack נלהב עם מומחיות בטכנולוגיות ווב מודרניות. אני אוהב ליצור אפליקציות יעילות, ניתנות להרחבה וידידותיות למשתמש.",
      description2:
        "עם ניסיון ב-Django, Next.js, React ו-TypeScript, אני מביא רעיונות לחיים באמצעות קוד נקי ועיצוב מחושב.",
    },
    portfolio: {
      title: "תיק העבודות שלי",
      subtitle: "פרויקטים ועבודות אחרונות",
      viewProject: "צפה בפרויקט",
      viewCode: "צפה בקוד",
    },
    blog: { title: "בלוג", subtitle: "מחשבות ותובנות על פיתוח ווב", readMore: "קרא עוד", readTime: "דקות קריאה" },
    contact: {
      title: "צור קשר",
      subtitle: "בואו נדבר על הפרויקט הבא שלכם",
      name: "שם",
      email: "אימייל",
      subject: "נושא",
      message: "הודעה",
      send: "שלח הודעה",
      success: "ההודעה נשלחה בהצלחה!",
      error: "שליחת ההודעה נכשלה. אנא נסה שוב.",
    },
    skills: {
      title: "כישורים וטכנולוגיות",
      frontend: "פרונט-אנד",
      backend: "בק-אנד",
      database: "בסיס נתונים",
      devops: "DevOps",
    },
    certificates: {
      title: "תעודות והישגים",
      subtitle: "תעודות מקצועיות והישגים",
      viewCertificate: "צפה בתעודה",
      download: "הורד",
    },
  },
}

const languages = [
  { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  { code: "ru" as Locale, name: "Русский", flag: "🇷🇺" },
  { code: "he" as Locale, name: "עברית", flag: "🇮🇱" },
]

const projects = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with Django REST API and Next.js frontend",
    technologies: ["Django", "Next.js", "PostgreSQL", "Tailwind CSS"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Portfolio Website",
    description: "Multi-language portfolio website with CMS integration",
    technologies: ["Next.js", "TypeScript", "Django", "PostgreSQL"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
]

const skillCategories = [
  {
    category: "frontend",
    skills: [
      { name: "React/Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    category: "backend",
    skills: [
      { name: "Django", level: 90 },
      { name: "Python", level: 85 },
      { name: "Node.js", level: 75 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    category: "database",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 70 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    category: "devops",
    skills: [
      { name: "Docker", level: 80 },
      { name: "Git", level: 90 },
      { name: "Linux", level: 75 },
    ],
  },
]

// НОВАЯ СЕКЦИЯ: Сертификаты (пока mock данные)
const certificates = [
  {
    title: "Django Advanced Certification",
    issuer: "Django Software Foundation",
    date: "Dec 2024",
    credentialId: "DSF-2024-001",
    image: "/placeholder.svg?height=200&width=300&text=Django+Certificate",
    verifyUrl: "https://example.com/verify",
  },
  {
    title: "React Professional Developer",
    issuer: "Meta",
    date: "Nov 2024",
    credentialId: "META-RCT-2024",
    image: "/placeholder.svg?height=200&width=300&text=React+Certificate",
    verifyUrl: "https://example.com/verify",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Oct 2024",
    credentialId: "AWS-CP-2024-VIT",
    image: "/placeholder.svg?height=200&width=300&text=AWS+Certificate",
    verifyUrl: "https://example.com/verify",
  },
]

const blogPosts = [
  {
    title: "Building Modern Web Applications with Django and Next.js",
    excerpt: "Learn how to create full-stack applications using Django REST framework and Next.js",
    date: "Jan 15, 2024",
    readTime: 8,
    tags: ["Django", "Next.js", "Full Stack"],
  },
  {
    title: "TypeScript Best Practices for React Developers",
    excerpt: "Essential TypeScript patterns and practices for building robust React applications",
    date: "Jan 10, 2024",
    readTime: 6,
    tags: ["TypeScript", "React", "Best Practices"],
  },
  {
    title: "Optimizing Database Performance in Django",
    excerpt: "Tips and techniques for improving database performance in Django applications",
    date: "Jan 5, 2024",
    readTime: 10,
    tags: ["Django", "Database", "Performance"],
  },
]

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = messages[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success(t("contact.success"))
    setIsSubmitting(false)
  }

  // ИСПРАВЛЕНО: Добавлены Skills и Certificates в навигацию
  const navigation = [
    { name: "nav.home", href: "#hero" },
    { name: "nav.about", href: "#about" },
    { name: "nav.skills", href: "#skills" },
    { name: "nav.portfolio", href: "#portfolio" },
    { name: "nav.certificates", href: "#certificates" },
    { name: "nav.blog", href: "#blog" },
    { name: "nav.contact", href: "#contact" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === locale)

  return (
    <div className={locale === "he" ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold">Vitaly</div>

            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
                >
                  {t(item.name)}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentLanguage?.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((language) => (
                    <DropdownMenuItem key={language.code} onClick={() => setLocale(language.code)} className="gap-2">
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t(item.name)}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - ЯРКАЯ ВЕРСИЯ */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
      >
        {/* Декоративные элементы */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-bounce"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <p className="text-lg text-white/80 mb-4">{t("hero.greeting")}</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">Vitaly</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-yellow-300 mb-6 drop-shadow-lg">
              {t("hero.title")}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">{t("hero.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 font-semibold shadow-xl" asChild>
                <a href="#portfolio">{t("hero.cta")}</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold bg-transparent"
                asChild
              >
                <a href="#contact">{t("hero.contact")}</a>
              </Button>
            </div>

            <div className="flex justify-center space-x-6 mb-12">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-yellow-300"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-yellow-300"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-yellow-300"
                asChild
              >
                <a href="mailto:contact@vitaly.dev">
                  <Mail className="h-6 w-6" />
                </a>
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" asChild>
              <a href="#about">
                <ArrowDown className="h-6 w-6 animate-bounce" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About - С МЕСТОМ ДЛЯ ФОТОГРАФИИ */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("about.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("about.subtitle")}</p>
          </div>

          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">{t("about.role")}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{t("about.description1")}</p>
                  <p className="text-muted-foreground leading-relaxed">{t("about.description2")}</p>

                  {/* Добавляем яркие статистики */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                      <div className="text-2xl font-bold">3+</div>
                      <div className="text-sm opacity-90">Years</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm opacity-90">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm opacity-90">Quality</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    {/* МЕСТО ДЛЯ ТВОЕЙ ФОТОГРАФИИ */}
                    <div className="w-64 h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                      {/* Замени src на путь к твоей фотографии */}
                      <img
                        src="/images/foto1.jpg"
                        alt="Vitaly - Full Stack Developer"
                        className="w-full h-full object-cover rounded-full"
                      />
                      {/* Если фото нет, показываем эмодзи */}
                      {/* <span className="text-6xl">👨‍💻</span> */}
                    </div>
                    {/* Декоративные элементы */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills - ЯРКАЯ ВЕРСИЯ */}
      <section
        id="skills"
        className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950 dark:via-teal-950 dark:to-blue-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {t("skills.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => {
              const colors = [
                "from-blue-500 to-blue-600",
                "from-purple-500 to-purple-600",
                "from-green-500 to-green-600",
                "from-orange-500 to-orange-600",
              ]

              return (
                <Card
                  key={category.category}
                  className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className={`bg-gradient-to-br ${colors[index]} text-white rounded-t-lg`}>
                    <CardTitle className="text-lg text-center">{t(`skills.${category.category}`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white dark:bg-gray-900">
                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-blue-600 font-bold">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-3" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio - ЯРКАЯ ВЕРСИЯ */}
      <section
        id="portfolio"
        className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-purple-950 dark:via-pink-950 dark:to-red-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t("portfolio.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("portfolio.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const gradients = [
                "from-blue-500 to-purple-600",
                "from-green-500 to-teal-600",
                "from-orange-500 to-red-600",
              ]

              return (
                <Card
                  key={index}
                  className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div
                      className={`aspect-video bg-gradient-to-br ${gradients[index]} rounded-lg mb-4 flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-6xl">🚀</span>
                    </div>
                    <CardTitle className="text-xl text-purple-700 dark:text-purple-300">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => {
                        const badgeColors = [
                          "bg-blue-100 text-blue-800",
                          "bg-green-100 text-green-800",
                          "bg-purple-100 text-purple-800",
                          "bg-orange-100 text-orange-800",
                        ]
                        return (
                          <Badge key={tech} className={`${badgeColors[techIndex % badgeColors.length]} border-0`}>
                            {tech}
                          </Badge>
                        )
                      })}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                        asChild
                      >
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t("portfolio.viewProject")}
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white border-0"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          {t("portfolio.viewCode")}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* НОВАЯ СЕКЦИЯ: Certificates */}
      <section
        id="certificates"
        className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950 dark:via-blue-950 dark:to-cyan-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              {t("certificates.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("certificates.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => {
              const gradients = [
                "from-indigo-500 to-blue-600",
                "from-blue-500 to-cyan-600",
                "from-cyan-500 to-teal-600",
              ]

              return (
                <Card
                  key={index}
                  className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div
                      className={`aspect-video bg-gradient-to-br ${gradients[index]} rounded-lg mb-4 flex items-center justify-center shadow-lg`}
                    >
                      <Award className="h-16 w-16 text-white" />
                    </div>
                    <CardTitle className="text-xl text-indigo-700 dark:text-indigo-300">{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Issuer:</strong> {cert.issuer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Date:</strong> {cert.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>ID:</strong> {cert.credentialId}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0"
                        asChild
                      >
                        <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t("certificates.viewCertificate")}
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white border-0"
                        asChild
                      >
                        <a href="#" download>
                          <Download className="h-4 w-4 mr-2" />
                          {t("certificates.download")}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog - ЯРКАЯ ВЕРСИЯ */}
      <section
        id="blog"
        className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950 dark:via-orange-950 dark:to-red-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {t("blog.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("blog.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const gradients = [
                "from-yellow-400 to-orange-500",
                "from-pink-400 to-red-500",
                "from-purple-400 to-indigo-500",
              ]

              return (
                <Card
                  key={index}
                  className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div
                      className={`aspect-video bg-gradient-to-br ${gradients[index]} rounded-lg mb-4 flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-6xl text-white">📝</span>
                    </div>
                    <CardTitle className="text-xl text-orange-700 dark:text-orange-300 line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-700 dark:text-blue-300">{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 dark:text-green-300">
                          {post.readTime} {t("blog.readTime")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => {
                        const tagColors = [
                          "bg-red-100 text-red-800",
                          "bg-yellow-100 text-yellow-800",
                          "bg-indigo-100 text-indigo-800",
                        ]
                        return (
                          <Badge key={tag} className={`${tagColors[tagIndex % tagColors.length]} border-0`}>
                            {tag}
                          </Badge>
                        )
                      })}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg">
                      {t("blog.readMore")}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact - ЯРКАЯ ВЕРСИЯ */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">Email</h3>
                  <p className="text-muted-foreground">contact@vitaly.dev</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-green-700 dark:text-green-300">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">Location</h3>
                  <p className="text-muted-foreground">Remote / Available Worldwide</p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-xl text-center">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-teal-700 dark:text-teal-300 font-medium">
                      {t("contact.name")}
                    </Label>
                    <Input id="name" required className="border-2 border-teal-200 focus:border-teal-500 rounded-lg" />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-teal-700 dark:text-teal-300 font-medium">
                      {t("contact.email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="border-2 border-teal-200 focus:border-teal-500 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-teal-700 dark:text-teal-300 font-medium">
                      {t("contact.subject")}
                    </Label>
                    <Input
                      id="subject"
                      required
                      className="border-2 border-teal-200 focus:border-teal-500 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-teal-700 dark:text-teal-300 font-medium">
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      className="border-2 border-teal-200 focus:border-teal-500 rounded-lg"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white border-0 shadow-lg text-lg py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - ЯРКАЯ ВЕРСИЯ */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Vitaly
            </h3>
            <p className="text-gray-300 mb-6 text-lg">Full Stack Developer</p>

            <div className="flex justify-center space-x-6 mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-yellow-400 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-blue-400 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-pink-400 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                asChild
              >
                <a href="mailto:contact@vitaly.dev">
                  <Mail className="h-6 w-6" />
                </a>
              </Button>
            </div>

            <div className="border-t border-white/20 pt-8">
              <p className="text-sm text-gray-400">© 2025 Vitaly. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
