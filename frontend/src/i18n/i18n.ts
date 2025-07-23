import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, 
    },

    resources: {
      en: {
        translation: {
          // Navigation
          dashboard: 'Dashboard',
          schedule: 'Schedule',
          courses: 'Courses',
          gradebook: 'Gradebook',
          performance: 'Performance',
          announcement: 'Announcement',
          
          // Header
          welcome: 'Welcome {{name}},',
          search: 'Search…',
          
          // Exam Tips
          examTime: 'EXAMS TIME',
          examDescription: 'Here we are. Are you ready to fight? Don\'t worry, we prepared some tips to be ready for your exams.',
          examQuote: '"Nothing happens until something moves" - Albert Einstein',
          viewExamsTips: 'View exams tips',
          
          // Announcements
          announcements: 'Announcements',
          all: 'All',
          
          // What's Due
          whatsDue: 'What\'s due',
          startQuiz: 'Start Quiz',
          solveAssignment: 'Solve Assignment',
          dueTo: 'Due to: {{date}}',
          
          // Home Page
          loginToDashboard: 'Login to Dashboard',
          noPasswordRequired: 'No password required - just click to enter!',
          welcomeMessage: 'Welcome to your learning dashboard',
        }
      },
      ar: {
        translation: {
          // Navigation
          dashboard: 'لوحة التحكم',
          schedule: 'الجدول الزمني',
          courses: 'الدورات',
          gradebook: 'كتاب الدرجات',
          performance: 'الأداء',
          announcement: 'الإعلانات',
          
          // Header
          welcome: 'مرحباً {{name}}،',
          search: 'بحث…',
          
          // Exam Tips
          examTime: 'وقت الامتحانات',
          examDescription: 'ها نحن هنا. هل أنت مستعد للقتال؟ لا تقلق، لقد أعددنا بعض النصائح لتكون مستعداً لامتحاناتك.',
          examQuote: '"لا يحدث شيء حتى يتحرك شيء" - ألبرت أينشتاين',
          viewExamsTips: 'عرض نصائح الامتحانات',
          
          // Announcements
          announcements: 'الإعلانات',
          all: 'الكل',
          
          // What's Due
          whatsDue: 'المطلوب',
          startQuiz: 'بدء الاختبار',
          solveAssignment: 'حل الواجب',
          dueTo: 'مطلوب في: {{date}}',
          
          // Home Page
          loginToDashboard: 'تسجيل الدخول إلى لوحة التحكم',
          noPasswordRequired: 'لا حاجة لكلمة مرور - فقط اضغط للدخول!',
          welcomeMessage: 'مرحباً بك في لوحة التعلم الخاصة بك',
        }
      }
    }
  })

export default i18n
