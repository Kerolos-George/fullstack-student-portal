const API_BASE_URL = 'http://localhost:3001/api';

// Types based on backend schemas
export interface Announcement {
  _id: string;
  authorName: string;
  authorRole: string;
  course: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return this.fetchApi<Announcement[]>('/announcements');
  }

  async getUpcomingQuizzes(): Promise<Quiz[]> {
    return this.fetchApi<Quiz[]>('/quizzes/upcoming');
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return this.fetchApi<Quiz[]>('/quizzes');
  }
}

export const apiService = new ApiService();
