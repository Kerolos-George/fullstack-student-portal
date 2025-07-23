export interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  role: 'student' | 'teacher' | 'admin'
}

export interface Announcement {
  id: string
  author: string
  authorRole: string
  content: string
  timestamp: string
  avatar?: string
}

export interface DueItem {
  id: string
  type: 'quiz' | 'assignment' | 'exam'
  title: string
  subject: string
  dueDate: string
  dueTime: string
  status: 'pending' | 'completed' | 'overdue'
}

export interface MenuItem {
  id: string
  text: string
  icon: React.ReactNode
  path: string
  active?: boolean
}

export interface ExamTip {
  id: string
  title: string
  description: string
  category: string
}
