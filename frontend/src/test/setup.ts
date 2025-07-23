import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock i18n for testing environment
vi.mock('../i18n/i18n.ts', () => ({
  default: {
    t: (key: string) => key,
    changeLanguage: () => Promise.resolve(),
    language: 'en',
  },
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => Promise.resolve(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))
