import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: {
    name: string
    avatar?: string
  } | null
}

// Load initial state from localStorage
const loadAuthState = (): AuthState => {
  try {
    const savedAuth = localStorage.getItem('authState')
    if (savedAuth) {
      return JSON.parse(savedAuth)
    }
  } catch (error) {
    console.error('Error loading auth state from localStorage:', error)
  }
  return {
    isAuthenticated: false,
    user: null,
  }
}

// Save auth state to localStorage
const saveAuthState = (state: AuthState) => {
  try {
    localStorage.setItem('authState', JSON.stringify(state))
  } catch (error) {
    console.error('Error saving auth state to localStorage:', error)
  }
}

const initialState: AuthState = loadAuthState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true
      state.user = {
        name: 'Talia',
        avatar: '/avatar.jpg',
      }
      saveAuthState(state)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      // Clear localStorage on logout
      localStorage.removeItem('authState')
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
