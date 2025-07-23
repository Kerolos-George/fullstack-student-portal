import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  styled,
  CircularProgress,
} from '@mui/material'
import { Quiz as QuizIcon, Assignment as AssignmentIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { apiService, Quiz } from '../../services/api'

const DueCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
}))

const DueItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(1.5),
  },
}))

const IconContainer = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const WhatsDueSection: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true)
        const data = await apiService.getUpcomingQuizzes()
        setQuizzes(data.slice(0, 3)) // Limit to 3 items
        setError(null)
      } catch (err) {
        console.error('Failed to fetch quizzes:', err)
        setError('Failed to load quizzes')
        // Fallback to mock data if API fails
        setQuizzes([
          {
            _id: '1',
            title: 'Unit 2 quiz',
            course: 'Physics',
            topic: 'Motion in a Straight Line',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '2',
            title: 'Math quiz',
            course: 'Math 101',
            topic: 'Algebra',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '3',
            title: 'Chemistry quiz',
            course: 'Chemistry',
            topic: 'Organic Chemistry',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ].slice(0, 3)) // Limit to 3 items
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
    return date.toLocaleDateString('en-US', options)
  }

  const getItemType = (title: string): 'quiz' | 'assignment' => {
    return 'quiz' // Always return quiz instead of checking title
  }

  const handleViewAllQuizzes = () => {
    navigate('/quizzes')
  }

  return (
    <DueCard elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
          What's due
        </Typography>
        <Button 
          variant="text" 
          size="small" 
          onClick={handleViewAllQuizzes}
          sx={{ 
            color: '#4caf50',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.04)',
            },
          }}
        >
          All
        </Button>
      </Box>

      <Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={40} />
          </Box>
        ) : error ? (
          <Typography variant="body2" color="error" sx={{ textAlign: 'center', py: 2 }}>
            {error}
          </Typography>
        ) : quizzes.length === 0 ? (
          <Typography variant="body2" sx={{ textAlign: 'center', py: 2, color: '#666' }}>
            No upcoming quizzes or assignments
          </Typography>
        ) : (
          quizzes.map((item) => {
            const itemType = getItemType(item.title)
            return (
              <DueItem key={item._id}>
                <IconContainer
                  sx={{
                    backgroundColor: '#4dd0e1', // Always use quiz color
                    flexShrink: 0,
                  }}
                >
                  <QuizIcon sx={{ color: 'white', fontSize: 24 }} />
                </IconContainer>
                
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                    {item.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#999', mb: 0.5, fontSize: '0.8rem' }}>
                    Course: {item.course}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#999', mb: 0.5, fontSize: '0.8rem' }}>
                    Topic: {item.topic}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#999', fontSize: '0.8rem' }}>
                    Due to: {formatDueDate(item.dueDate)}
                  </Typography>
                </Box>
                
                <Button
                  variant="outlined"
                  sx={{
                    color: '#4dd0e1',
                    borderColor: '#4dd0e1',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      borderColor: '#26c6da',
                      backgroundColor: 'rgba(77, 208, 225, 0.04)',
                    },
                    alignSelf: { xs: 'stretch', sm: 'center' },
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    mt: { xs: 1, sm: 0 },
                  }}
                >
                  Start Quiz
                </Button>
              </DueItem>
            )
          })
        )}
      </Box>
    </DueCard>
  )
}

export default WhatsDueSection
