import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Button,
  styled,
  CircularProgress,
  Container,
  Grid,
} from '@mui/material'
import { Person as PersonIcon, ArrowBack as ArrowBackIcon, Announcement as AnnouncementIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { apiService, Announcement } from '../services/api'

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  maxWidth: '1200px',
}))

const AnnouncementCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  },
}))

const AnnouncementItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))

const HeaderCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c5aa0 0%, #1e4080 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(44, 90, 160, 0.3)',
}))

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  border: '1px solid #dee2e6',
}))

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAnnouncements()
        setAnnouncements(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch announcements:', err)
        setError('Failed to load announcements')
        // Fallback to mock data if API fails
        const mockData = [
          {
            _id: '1',
            authorName: 'Mr. Ahmed Mostafa',
            authorRole: 'Teacher',
            course: 'Physics',
            message: 'Hi my friends! I just want you to be ready to get started and focus on preparing assignments to get the best marks and be ready for your exams! 😊',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '2',
            authorName: 'Mrs. Salma Ahmed',
            authorRole: 'Teacher',
            course: 'Math',
            message: 'Hello my students, I want to announce that the exam date got delayed 3 days ahead. So you have more time to study and prepare. Best of luck for you all! 📚',
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '3',
            authorName: 'Dr. Sarah Johnson',
            authorRole: 'Teacher',
            course: 'Chemistry',
            message: 'Reminder: Lab session tomorrow at 10 AM. Please bring your lab coats and safety goggles. We will be working with acids.',
            createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '4',
            authorName: 'Prof. Michael Brown',
            authorRole: 'Teacher',
            course: 'Biology',
            message: 'Great job on the recent presentations! I am impressed with your understanding of cellular biology. Keep up the excellent work!',
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '5',
            authorName: 'Ms. Emily Davis',
            authorRole: 'Teacher',
            course: 'English',
            message: 'Please submit your essays by Friday. Remember to follow the MLA format and include proper citations.',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]
        setAnnouncements(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMs = now.getTime() - date.getTime()
    
    // Convert to different time units
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderCard elevation={0}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AnnouncementIcon sx={{ fontSize: '2rem' }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                  Announcements
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
              Stay updated with the latest news and information from your teachers
            </Typography>
          </HeaderCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard elevation={1}>
            <AnnouncementIcon sx={{ fontSize: '3rem', color: '#2c5aa0', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c5aa0', mb: 1 }}>
              {announcements.length}
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Total Announcements
            </Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <StatsCard elevation={1}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Recent Activity
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              {announcements.length > 0 
                ? `Latest announcement from ${announcements[0]?.authorName} • ${formatTimeAgo(announcements[0]?.createdAt)}`
                : 'No recent announcements'
              }
            </Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={50} sx={{ color: '#2c5aa0' }} />
            </Box>
          ) : error ? (
            <AnnouncementCard>
              <Typography variant="body1" color="error" sx={{ textAlign: 'center', py: 4 }}>
                {error}
              </Typography>
            </AnnouncementCard>
          ) : announcements.length === 0 ? (
            <AnnouncementCard>
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <AnnouncementIcon sx={{ fontSize: '4rem', color: '#ccc', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                  No announcements available
                </Typography>
                <Typography variant="body2" sx={{ color: '#999' }}>
                  Check back later for updates from your teachers
                </Typography>
              </Box>
            </AnnouncementCard>
          ) : (
            announcements.map((announcement, index) => (
              <AnnouncementCard key={announcement._id} elevation={2}>
                <AnnouncementItem>
                  <Avatar
                    sx={{ 
                      width: 60, 
                      height: 60,
                      backgroundColor: index % 4 === 0 ? '#e3f2fd' : 
                                     index % 4 === 1 ? '#f3e5f5' : 
                                     index % 4 === 2 ? '#e8f5e8' : '#fff3e0',
                      border: '3px solid',
                      borderColor: index % 4 === 0 ? '#1976d2' : 
                                  index % 4 === 1 ? '#7b1fa2' : 
                                  index % 4 === 2 ? '#2e7d32' : '#f57c00',
                    }}
                  >
                    <PersonIcon sx={{ 
                      color: index % 4 === 0 ? '#1976d2' : 
                             index % 4 === 1 ? '#7b1fa2' : 
                             index % 4 === 2 ? '#2e7d32' : '#f57c00',
                      fontSize: '1.8rem'
                    }} />
                  </Avatar>
                  
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {announcement.authorName}
                      </Typography>
                      <Chip 
                        label={announcement.course || announcement.authorRole}
                        size="small"
                        sx={{ 
                          backgroundColor: '#2c5aa0',
                          color: 'white',
                          fontSize: '0.8rem',
                          height: 28,
                          fontWeight: 'medium',
                          '&:hover': {
                            backgroundColor: '#1e4080',
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#999', marginLeft: 'auto' }}>
                        {formatTimeAgo(announcement.createdAt)}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#555', 
                        lineHeight: 1.7,
                        fontSize: '1.1rem',
                        backgroundColor: '#f8f9fa',
                        padding: 2,
                        borderRadius: 1,
                        border: '1px solid #e9ecef',
                      }}
                    >
                      {announcement.message}
                    </Typography>
                  </Box>
                </AnnouncementItem>
              </AnnouncementCard>
            ))
          )}
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default AnnouncementsPage
