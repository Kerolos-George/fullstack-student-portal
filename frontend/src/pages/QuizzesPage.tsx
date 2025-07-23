import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  styled,
  CircularProgress,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material'
import { 
  Quiz as QuizIcon, 
  ArrowBack as ArrowBackIcon, 
  Schedule as ScheduleIcon,
  Book as BookIcon,
  PlayArrow as PlayArrowIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { apiService, Quiz } from '../services/api'

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  maxWidth: '1200px',
}))

const HeaderCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4dd0e1 0%, #26c6da 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(77, 208, 225, 0.3)',
}))

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  border: '1px solid #dee2e6',
  height: '100%',
}))

const QuizCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  },
}))

const QuizHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4dd0e1 0%, #26c6da 100%)',
  color: 'white',
  padding: theme.spacing(2),
  borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}))

const QuizzesPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAllQuizzes()
        setQuizzes(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch all quizzes:', err)
        setError('Failed to load quizzes')
        // Fallback to mock data if API fails
        const mockData = [
          {
            _id: '1',
            title: 'Unit 2 Quiz - Motion in Physics',
            course: 'Physics',
            topic: 'Motion in a Straight Line',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '2',
            title: 'Algebra Fundamentals Quiz',
            course: 'Math 101',
            topic: 'Linear Equations and Inequalities',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '3',
            title: 'Organic Chemistry Quiz',
            course: 'Chemistry',
            topic: 'Hydrocarbons and Functional Groups',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '4',
            title: 'World War II History Quiz',
            course: 'History',
            topic: 'Major Events and Consequences',
            dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '5',
            title: 'Shakespeare Literature Quiz',
            course: 'English',
            topic: 'Romeo and Juliet Analysis',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '6',
            title: 'Cell Biology Quiz',
            course: 'Biology',
            topic: 'Cell Structure and Function',
            dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]
        setQuizzes(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchAllQuizzes()
  }, [])

  const formatDueDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `Due in ${diffInHours} hours`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `Due in ${diffInDays} day${diffInDays > 1 ? 's' : ''}`
  }

  const getUrgencyColor = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) return '#f44336' // Red for urgent
    if (diffInHours < 48) return '#ff9800' // Orange for soon
    return '#4caf50' // Green for later
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const handleStartQuiz = (quizId: string) => {
    // Here you would navigate to the quiz taking page
    console.log('Starting quiz:', quizId)
  }

  const upcomingQuizzes = quizzes.filter(quiz => new Date(quiz.dueDate) > new Date())
  const overdueQuizzes = quizzes.filter(quiz => new Date(quiz.dueDate) <= new Date())

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderCard elevation={0}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <QuizIcon sx={{ fontSize: '2rem' }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                  All Quizzes
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBackToDashboard}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                  },
                }}
              >
                Back to Dashboard
              </Button>
            </Box>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Complete your quizzes and track your progress
            </Typography>
          </HeaderCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard elevation={1}>
            <QuizIcon sx={{ fontSize: '3rem', color: '#4dd0e1', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4dd0e1', mb: 1 }}>
              {quizzes.length}
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Total Quizzes
            </Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard elevation={1}>
            <ScheduleIcon sx={{ fontSize: '3rem', color: '#4caf50', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
              {upcomingQuizzes.length}
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Upcoming Quizzes
            </Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard elevation={1}>
            <AccessTimeIcon sx={{ fontSize: '3rem', color: '#f44336', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336', mb: 1 }}>
              {overdueQuizzes.length}
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Overdue Quizzes
            </Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={50} sx={{ color: '#4dd0e1' }} />
            </Box>
          ) : error ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            </Paper>
          ) : quizzes.length === 0 ? (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <QuizIcon sx={{ fontSize: '4rem', color: '#ccc', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                No quizzes available
              </Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>
                Check back later for new quizzes from your teachers
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {quizzes.map((quiz, index) => (
                <Grid item xs={12} md={6} lg={4} key={quiz._id}>
                  <QuizCard elevation={2}>
                    <QuizHeader>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <QuizIcon sx={{ color: 'white' }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                          {quiz.title}
                        </Typography>
                      </Box>
                    </QuizHeader>
                    
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <BookIcon sx={{ fontSize: '1rem', color: '#666' }} />
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {quiz.course}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
                          Topic: {quiz.topic}
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 'auto' }}>
                        <Chip
                          label={formatDueDate(quiz.dueDate)}
                          size="small"
                          sx={{
                            backgroundColor: getUrgencyColor(quiz.dueDate),
                            color: 'white',
                            fontWeight: 'medium',
                            mb: 2,
                          }}
                        />
                        
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<PlayArrowIcon />}
                          onClick={() => handleStartQuiz(quiz._id)}
                          sx={{
                            backgroundColor: '#4dd0e1',
                            '&:hover': {
                              backgroundColor: '#26c6da',
                            },
                            borderRadius: 2,
                            py: 1.5,
                            fontWeight: 'bold',
                          }}
                        >
                          Start Quiz
                        </Button>
                      </Box>
                    </CardContent>
                  </QuizCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default QuizzesPage
